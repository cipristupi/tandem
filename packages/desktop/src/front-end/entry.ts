import * as fs from "fs";
import * as fsa from "fs-extra";
const fontManager = require("font-manager");
import { rootSaga } from "./sagas";
import { select, take, call } from "redux-saga/effects";
import { rootReducer } from "./reducers";
import { ipcRenderer } from "electron";
import {
  setup,
  RootState,
  FontFamily,
  createRootInspectorNode,
  ContextMenuItem
} from "tandem-front-end";
import {
  stripProtocol,
  createDirectory,
  addProtocol,
  FILE_PROTOCOL,
  createFile,
  Point
} from "tandem-common";
import { DesktopRootState } from "./state";
import * as path from "path";
import * as Url from "url";
import { exec } from "child_process";
import {
  Frame,
  getSyntheticSourceNode,
  getSyntheticNodeById,
  getPCNodeDependency
} from "paperclip";
import { eventChannel } from "redux-saga";

const query = Url.parse(String(location), true).query;

setup<DesktopRootState>(
  function*() {
    return {
      readFile,
      writeFile,
      openPreview,
      loadProjectInfo,
      readDirectory,
      openContextMenu,
      deleteFile
    };
  },
  rootReducer,
  rootSaga
)({
  mount: document.getElementById("application"),
  hoveringSyntheticNodeIds: [],
  selectedSyntheticNodeIds: [],
  hoveringInspectorNodeIds: [],
  customChrome: Boolean(query.customChrome),
  selectedFileNodeIds: [],
  sourceNodeInspector: createRootInspectorNode(),
  selectedInspectorNodeIds: [],
  editorWindows: [],
  frames: [],
  documents: [],
  fontFamilies: getFontFamiles(),
  graph: {},
  history: {
    index: 0,
    items: []
  },
  openFiles: [],
  fileCache: {},
  selectedComponentId: null
});

function* openPreview(frame: Frame) {
  if (!query.previewHost) {
    return false;
  }

  const state: RootState = yield select();

  const sourceNode = getSyntheticSourceNode(
    getSyntheticNodeById(frame.syntheticContentNodeId, state.documents),
    state.graph
  );
  const dep = getPCNodeDependency(sourceNode.id, state.graph);

  exec(
    `open http://${query.previewHost}/preview.html?contentNodeId=${
      sourceNode.id
    }\\&entryPath=${encodeURIComponent(stripProtocol(dep.uri))}`
  );

  return true;
}

function* loadProjectInfo() {
  const chan = eventChannel(emit => {
    ipcRenderer.once("projectInfo", (event, arg) => emit({ ret: arg }));
    return () => {};
  });
  ipcRenderer.send("getProjectInfo");
  return (yield take(chan)).ret;
}

function* readDirectory(dirUri: string): any {
  const dir = stripProtocol(dirUri);
  const dirBasenames: string[] = (yield call(
    () =>
      new Promise(resolve => {
        fs.readdir(dir, (err, basenames) => resolve(basenames));
      })
  )).filter(basename => basename !== ".DS_Store");

  return dirBasenames.map(basename => {
    const fullPath = path.join(dir, basename);
    const uri = addProtocol(FILE_PROTOCOL, fullPath);
    if (fs.lstatSync(fullPath).isDirectory()) {
      return createDirectory(uri);
    } else {
      return createFile(uri);
    }
  });
}

function* openContextMenu(point: Point, options: ContextMenuItem[]) {
  ipcRenderer.send("openContextMenu", {
    point,
    options
  });
}

function* deleteFile(uri: string) {
  const path = stripProtocol(uri);
  fsa.removeSync(path);
}

function getFontFamiles(): FontFamily[] {
  let used = {};
  return fontManager
    .getAvailableFontsSync()
    .map(info => {
      return {
        name: info.family
      };
    })
    .filter(family => {
      if (used[family.name]) return false;
      return (used[family.name] = true);
    });
}

function readFile(uri) {
  return Promise.resolve({
    content: fs.readFileSync(stripProtocol(uri)),
    mimeType: {
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".json": "application/json"
    }[path.extname(uri)]
  });
}

async function writeFile(uri: string, content: Buffer) {
  fs.writeFileSync(uri, content);
  return true;
}
