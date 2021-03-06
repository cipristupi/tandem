import "./scss/all.scss";
import { applyMiddleware, createStore, Reducer, Action } from "redux";
import { default as createSagaMiddleware } from "redux-saga";
import { fork, call } from "redux-saga/effects";
import { rootReducer } from "./reducers";
import { createRootSaga, FrontEndSagaOptions } from "./sagas";
const PaperclipWorker = require("./paperclip.worker");

import {
  createPaperclipSaga,
  PAPERCLIP_MIME_TYPE,
  PAPERCLIP_DEFAULT_EXTENSIONS,
  PCVariant,
  getPCNodeModule,
  PCComponent
} from "paperclip";
import { RootState } from "./state";
import { appLoaded } from "./actions";
import {
  FSSandboxOptions,
  createFSSandboxSaga,
  setReaderMimetype
} from "fsbox";
import { createRemotePCRuntime } from "paperclip";
import { pmark, EMPTY_OBJECT, getParentTreeNode, memoize } from "tandem-common";

export type FrontEndOptions = FrontEndSagaOptions & FSSandboxOptions;
export type SideEffectCreator = () => IterableIterator<FrontEndOptions>;

const SLOW_ACTION_INTERVAL = 10;

// Dirty, but okay for now. Want to eventually display a prettyier message that reports diagnostics, but
// that needs to happen _outside_ of the application's scope.

let alerted = false;

const onError = error => {
  // prevent blasted errors
  if (!alerted) {
    alerted = true;
    alert(
      `An unknown error occured, please save changes and restart Tandem. Details:\n${error}`
    );
  }
  console.error(error);
};
window.onerror = onError;

export const setup = <TState extends RootState>(
  createSideEffects: SideEffectCreator,
  reducer?: Reducer<TState>,
  saga?: () => IterableIterator<any>
) => {
  return (initialState: TState) => {
    const sagaMiddleware = createSagaMiddleware({ onError });
    const store = createStore(
      (state: TState, event: Action) => {
        const now = Date.now();
        const marker = pmark(`action ${event.type}`);
        state = rootReducer(state, event) as TState;
        if (reducer) {
          state = reducer(state, event);
        }
        marker.end();

        const actionDuration = Date.now() - now;

        if (actionDuration > SLOW_ACTION_INTERVAL) {
          console.warn(
            `Action "${event.type}" took ${actionDuration}ms to execute.`
          );
        }
        return state;
      },
      initialState as any,
      applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(function*() {
      let {
        readFile,
        writeFile,
        openPreview,
        loadProjectInfo,
        readDirectory,
        openContextMenu,
        deleteFile
      } = yield call(createSideEffects);

      readFile = setReaderMimetype(
        PAPERCLIP_MIME_TYPE,
        PAPERCLIP_DEFAULT_EXTENSIONS
      )(readFile);

      yield fork(
        createRootSaga({
          openPreview,
          loadProjectInfo,
          readDirectory,
          openContextMenu,
          deleteFile
        })
      );
      if (saga) {
        yield fork(saga);
        yield fork(createFSSandboxSaga({ readFile, writeFile }));
        yield fork(
          createPaperclipSaga({
            createRuntime: () => {
              return createRemotePCRuntime(new PaperclipWorker());
            },
            getRuntimeVariants: (state: RootState) => {
              if (!state.selectedVariant) {
                return EMPTY_OBJECT;
              }
              const module = getPCNodeModule(
                state.selectedVariant.id,
                state.graph
              );
              // variant does not exist
              if (!module) {
                return EMPTY_OBJECT;
              }
              const component = getParentTreeNode(
                state.selectedVariant.id,
                module
              ) as PCComponent;
              return getVariants(component.id, state.selectedVariant.id);
            }
          })
        );
      }
    });

    store.dispatch(appLoaded());
  };
};

const getVariants = memoize((componentId: string, variantId: string) => ({
  [componentId]: {
    [variantId]: true
  }
}));
export const init = (initialState: RootState) => {};

export * from "./state";
export * from "./actions";
export * from "paperclip";
