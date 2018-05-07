import {Menu, MenuItem, MenuItemConstructorOptions, app} from "electron";
import {fork, put, take} from "redux-saga/effects";
import {eventChannel} from "redux-saga";
import { APP_READY, MAIN_WINDOW_OPENED } from "../actions";
import { APP_LOADED, shortcutKeyDown, SHORTCUT_R_KEY_DOWN, SHORTCUT_A_KEY_DOWN, SHORTCUT_DELETE_KEY_DOWN, SHORTCUT_T_KEY_DOWN, SHORTCUT_ESCAPE_KEY_DOWN } from "tandem-front-end";

export function* shortcutsSaga() {
  yield take(MAIN_WINDOW_OPENED);

  const menu = new Menu();

  const chan = eventChannel((emit) => {

    const tpl: MenuItemConstructorOptions[] = [
      {
        label: app.getName(),
        submenu: [
          {role: "about"},
          {type: "separator"},
          {role: "services", submenu: []},
          {type: "separator"},
          {role: "hide"},
          {role: "hideothers"},
          {role: "unhide"},
          {type: "separator"},
          {role: "quit"},
          {type: "separator" },
          {type: "separator" }
        ]
      },
      {
        label: "Edit",
        submenu: [
          {role: "undo"},
          {role: "redo"},
          {type: "separator"},
          {role: "cut"},
          {role: "copy"},
          {role: "paste"},
          {role: "pasteandmatchstyle"},
          {
            label: "Delete",
            accelerator: "Backspace",
            click: () => {
              emit(shortcutKeyDown(SHORTCUT_DELETE_KEY_DOWN));
            }
          },
          {
            label: "Escape",
            accelerator: "Escape",
            click: () => {
              emit(shortcutKeyDown(SHORTCUT_ESCAPE_KEY_DOWN));
            }
          },
          {role: "selectall"}
        ]
      },
      {
        label: "Insert",
        submenu: [
          {
            label: "Artboard",
            accelerator: "a",
            click: () => {
              emit(shortcutKeyDown(SHORTCUT_A_KEY_DOWN));
            }
          },
          {
            label: "Rectangle",
            accelerator: "r",
            click: () => {
              emit(shortcutKeyDown(SHORTCUT_R_KEY_DOWN));
            }
          },
          {
            label: "Text",
            accelerator: "t",
            click: () => {
              emit(shortcutKeyDown(SHORTCUT_T_KEY_DOWN));
            }
          }
        ]
      }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(tpl));

    return () => {

    };
  })

  while(1) {
    const action = yield take(chan);
    yield put(action);
  }
}

