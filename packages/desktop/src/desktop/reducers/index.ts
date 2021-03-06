import { Action } from "redux";
import { DesktopState, TDProject } from "../state";
import {
  TD_PROJECT_LOADED,
  TDProjectLoaded,
  PREVIEW_SERVER_STARTED,
  PreviewServerStarted,
  TD_PROJECT_FILE_PICKED,
  TDProjectFilePicked
} from "../actions";

export const rootReducer = (
  state: DesktopState,
  action: Action
): DesktopState => {
  switch (action.type) {
    case TD_PROJECT_FILE_PICKED: {
      const { filePath } = action as TDProjectFilePicked;
      return { ...state, tdProjectPath: filePath };
    }
    case TD_PROJECT_LOADED: {
      const { project: tdProject } = action as TDProjectLoaded;
      return { ...state, tdProject };
    }
    case PREVIEW_SERVER_STARTED: {
      const { port } = action as PreviewServerStarted;
      return {
        ...state,
        info: {
          ...state.info,
          previewServer: {
            port
          }
        }
      };
    }
  }
  return state;
};
