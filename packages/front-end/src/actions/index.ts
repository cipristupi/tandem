import { Action } from "redux";
import * as React from "react";
import {
  Directory,
  Point,
  Bounds,
  Struct,
  StructReference,
  TreeNode,
  File,
  TreeMoveOffset,
  FSItem,
  FSItemTagNames
} from "tandem-common";
import { publicActionCreator } from "tandem-common";
import {
  ComputedDisplayInfo,
  SyntheticNativeNodeMap,
  SyntheticVisibleNode,
  PCNodeClip,
  PCVariable,
  Frame,
  PCComponent,
  PCVariant,
  PCVariableType,
  PCOverride
} from "paperclip";
import { RegisteredComponent } from "..";
import {
  FrameMode,
  ToolType,
  EditorWindow,
  ProjectConfig,
  ProjectInfo,
  BaseQuickSearchResult,
  QuickSearchResult
} from "../state";
import { InspectorNode } from "paperclip";

export const PROJECT_LOADED = "PROJECT_LOADED";
export const ACTIVE_FILE_CHANGED = "ACTIVE_FILE_CHANGED";
export const SYNTHETIC_WINDOW_OPENED = "SYNTHETIC_WINDOW_OPENED";
export const PROJECT_DIRECTORY_LOADED = "PROJECT_DIRECTORY_LOADED";
export const DOCUMENT_RENDERED = "DOCUMENT_RENDERERED";

export const CANVAS_TOOL_OVERLAY_MOUSE_LEAVE =
  "CANVAS_TOOL_OVERLAY_MOUSE_LEAVE";
export const CANVAS_TOOL_OVERLAY_MOUSE_PAN_START =
  "CANVAS_TOOL_OVERLAY_MOUSE_PAN_START";
export const CANVAS_TOOL_OVERLAY_MOUSE_PANNING =
  "CANVAS_TOOL_OVERLAY_MOUSE_PANNING";
export const CANVAS_TOOL_OVERLAY_MOUSE_PAN_END =
  "CANVAS_TOOL_OVERLAY_MOUSE_PAN_END";
export const CANVAS_TOOL_OVERLAY_MOUSE_DOUBLE_CLICKED =
  "CANVAS_TOOL_OVERLAY_MOUSE_DOUBLE_CLICKED";
export const CANVAS_TOOL_WINDOW_BACKGROUND_CLICKED =
  "CANVAS_TOOL_WINDOW_BACKGROUND_CLICKED";
export const CANVAS_TOOL_WINDOW_KEY_DOWN = "CANVAS_TOOL_WINDOW_KEY_DOWN";
export const CANVAS_TOOL_ARTBOARD_TITLE_CLICKED =
  "CANVAS_TOOL_ARTBOARD_TITLE_CLICKED";
export const CANVAS_TOOL_PREVIEW_BUTTON_CLICKED =
  "CANVAS_TOOL_PREVIEW_BUTTON_CLICKED";
export const FILE_NAVIGATOR_ITEM_CLICKED = "FILE_NAVIGATOR_ITEM_CLICKED";
export const FILE_NAVIGATOR_ITEM_DOUBLE_CLICKED =
  "FILE_NAVIGATOR_ITEM_DOUBLE_CLICKED";
export const FILE_NAVIGATOR_ITEM_BLURRED = "FILE_NAVIGATOR_ITEM_BLURRED";
export const FILE_NAVIGATOR_NEW_FILE_CLICKED =
  "FILE_NAVIGATOR_NEW_FILE_CLICKED";
export const FILE_NAVIGATOR_NEW_DIRECTORY_CLICKED =
  "FILE_NAVIGATOR_NEW_DIRECTORY_CLICKED";
export const FILE_NAVIGATOR_TOGGLE_DIRECTORY_CLICKED =
  "FILE_NAVIGATOR_TOGGLE_DIRECTORY_CLICKED";
export const FILE_NAVIGATOR_BASENAME_CHANGED =
  "FILE_NAVIGATOR_BASENAME_CHANGED";
export const FILE_NAVIGATOR_NEW_FILE_ENTERED =
  "FILE_NAVIGATOR_NEW_FILE_ENTERED";
export const FILE_NAVIGATOR_DROPPED_ITEM = "FILE_NAVIGATOR_DROPPED_ITEM";
export const TOOLBAR_TOOL_CLICKED = "TOOLBAR_TOOL_CLICKED";
export const EDITOR_TAB_CLICKED = "EDITOR_TAB_CLICKED";
export const EDITOR_TAB_CLOSE_BUTTON_CLICKED =
  "EDITOR_TAB_CLOSE_BUTTON_CLICKED";
export const OPEN_FILE_ITEM_CLICKED = "OPEN_FILE_ITEM_CLICKED";
export const OPEN_FILE_ITEM_CLOSE_CLICKED = "OPEN_FILE_ITEM_CLOSE_CLICKED";
export const CANVAS_MOUNTED = "CANVAS_MOUNTED";
export const CANVAS_MOUSE_MOVED = "CANVAS_MOUSE_MOVED";
export const CANVAS_DRAGGED_OVER = "CANVAS_DRAGGED_OVER";
export const CANVAS_MOUSE_CLICKED = "CANVAS_MOUSE_CLICKED";
export const CANVAS_MOUSE_DOUBLE_CLICKED = "CANVAS_MOUSE_DOUBLE_CLICKED";
export const CANVAS_WHEEL = "CANVAS_WHEEL";
export const CANVAS_MOTION_RESTED = "CANVAS_MOTION_RESTED";
export const CANVAS_DROPPED_ITEM = "CANVAS_DROPPED_ITEM";
export const ADD_VARIANT_BUTTON_CLICKED = "ADD_VARIANT_BUTTON_CLICKED";
export const REMOVE_VARIANT_BUTTON_CLICKED = "REMOVE_VARIANT_BUTTON_CLICKED";
export const VARIANT_DEFAULT_SWITCH_CLICKED = "VARIANT_DEFAULT_SWITCH_CLICKED";
export const VARIANT_LABEL_CHANGED = "VARIANT_LABEL_CHANGED";
export const ADD_STYLE_BUTTON_CLICKED = "ADD_STYLE_BUTTON_CLICKED";
export const NEW_STYLE_VARIANT_CONFIRMED = "NEW_STYLE_VARIANT_CONFIRMED";
export const NEW_STYLE_VARIANT_BUTTON_CLICKED =
  "NEW_STYLE_VARIANT_BUTTON_CLICKED";
export const PROMPT_OK_BUTTON_CLICKED = "PROMPT_OK_BUTTON_CLICKED";
export const PROMPT_CANCEL_BUTTON_CLICKED = "PROMPT_CANCEL_BUTTON_CLICKED";
export const REMOVE_STYLE_BUTTON_CLICKED = "ADD_STYLE_BUTTON_CLICKED";
export const EDIT_VARIANT_NAME_BUTTON_CLICKED =
  "EDIT_VARIANT_NAME_BUTTON_CLICKED";
export const EDIT_VARIANT_NAME_CONFIRMED = "EDIT_VARIANT_NAME_CONFIRMED";
export const STYLE_VARIANT_DROPDOWN_CHANGED = "STYLE_VARIANT_DROPDOWN_CHANGED";
export const ADD_VARIABLE_BUTTON_CLICKED = "ADD_VARIABLE_BUTTON_CLICKED";
export const QUICK_SEARCH_FILTER_CHANGED = "QUICK_SEARCH_FILTER_CHANGED";
export const QUICK_SEARCH_RESULT_LOADED = "QUICK_SEARCH_RESULT_LOADED";
export const VARIABLE_LABEL_CHANGE_COMPLETED =
  "VARIABLE_LABEL_CHANGE_COMPLETED";
export const VARIABLE_VALUE_CHANGED = "VARIABLE_VALUE_CHANGED";
export const VARIABLE_VALUE_CHANGE_COMPLETED =
  "VARIABLE_VALUE_CHANGE_COMPLETED";
export const COMPONENT_INSTANCE_VARIANT_TOGGLED =
  "COMPONENT_INSTANCE_VARIANT_TOGGLED";
export const INSTANCE_VARIANT_RESET_CLICKED = "INSTANCE_VARIANT_RESET_CLICKED";
export const FRAME_MODE_CHANGE_COMPLETE = "FRAME_MODE_CHANGE_COMPLETE";
export const RESIZER_PATH_MOUSE_MOVED = "RESIZER_PATH_MOUSE_MOVED";
export const RESIZER_PATH_MOUSE_STOPPED_MOVING =
  "RESIZER_PATH_MOUSE_STOPPED_MOVING";
export const RESIZER_MOVED = "RESIZER_MOVED";
export const RESIZER_STOPPED_MOVING = "RESIZER_STOPPED_MOVING";
export const COMPONENT_PICKER_BACKGROUND_CLICK =
  "COMPONENT_PICKER_BACKGROUND_CLICK";
export const UNHANDLED_ERROR = "UNHANDLED_ERROR";
export const COMPONENT_PICKER_ITEM_CLICK = "COMPONENT_PICKER_ITEM_CLICK";
export const RESIZER_MOUSE_DOWN = "RESIZER_MOUSE_DOWN";
export const RESIZER_START_DRGG = "RESIZER_START_DRGG";
export const TD_PROJECT_LOADED = "TD_PROJECT_LOADED";
export const CONFIRM_CLOSE_WINDOW = "CONFIRM_CLOSE_WINDOW";
export const PROJECT_INFO_LOADED = "PROJECT_INFO_LOADED";
export const SHORTCUT_ZOOM_IN_KEY_DOWN = "SHORTCUT_ZOOM_IN_KEY_DOWN";
export const SHORTCUT_ZOOM_OUT_KEY_DOWN = "SHORTCUT_ZOOM_OUT_KEY_DOWN";
export const SHORTCUT_ESCAPE_KEY_DOWN = "SHORTCUT_ESCAPE_KEY_DOWN";
export const SHORTCUT_SAVE_KEY_DOWN = "SHORTCUT_SAVE_KEY_DOWN";
export const SHORTCUT_QUICK_SEARCH_KEY_DOWN = "SHORTCUT_QUICK_SEARCH_KEY_DOWN";
export const SHORTCUT_DELETE_KEY_DOWN = "SHORTCUT_DELETE_KEY_DOWN";
export const SHORTCUT_UNDO_KEY_DOWN = "SHORTCUT_UNDO_KEY_DOWN";
export const SHORTCUT_REDO_KEY_DOWN = "SHORTCUT_REDO_KEY_DOWN";
export const SHORTCUT_R_KEY_DOWN = "SHORTCUT_R_KEY_DOWN";
export const SHORTCUT_C_KEY_DOWN = "SHORTCUT_C_KEY_DOWN";
export const SHORTCUT_T_KEY_DOWN = "SHORTCUT_T_KEY_DOWN";
export const SHORTCUT_SELECT_NEXT_TAB = "SHORTCUT_SELECT_NEXT_TAB";
export const SHORTCUT_SELECT_PREVIOUS_TAB = "SHORTCUT_SELECT_PREVIOUS_TAB";
export const SHORTCUT_CLOSE_CURRENT_TAB = "SHORTCUT_CLOSE_CURRENT_TAB";
export const SHORTCUT_CONVERT_TO_COMPONENT_KEY_DOWN =
  "SHORTCUT_CONVERT_TO_COMPONENT_KEY_DOWN";
export const SHORTCUT_WRAP_IN_SLOT_KEY_DOWN = "SHORTCUT_WRAP_IN_SLOT_KEY_DOWN";
export const SHORTCUT_TOGGLE_SIDEBAR = "SHORTCUT_TOGGLE_SIDEBAR";
export const INHERIT_PANE_ADD_BUTTON_CLICK = "INHERIT_PANE_ADD_BUTTON_CLICK";
export const FILE_ITEM_CONTEXT_MENU_DELETE_CLICKED =
  "FILE_ITEM_CONTEXT_MENU_DELETE_CLICKED";
export const FILE_ITEM_CONTEXT_MENU_OPEN_CLICKED =
  "FILE_ITEM_CONTEXT_MENU_OPEN_CLICKED";
export const FILE_ITEM_CONTEXT_MENU_OPEN_IN_FINDER_CLICKED =
  "FILE_ITEM_CONTEXT_MENU_OPEN_IN_FINDER_CLICKED";
export const FILE_ITEM_CONTEXT_MENU_COPY_PATH_CLICKED =
  "FILE_ITEM_CONTEXT_MENU_COPY_PATH_CLICKED";
export const FILE_ITEM_CONTEXT_MENU_RENAME_CLICKED =
  "FILE_ITEM_CONTEXT_MENU_RENAME_CLICKED";
export const SYNTHETIC_NODE_CONTEXT_MENU_CONVERT_TO_COMPONENT_CLICKED =
  "SYNTHETIC_NODE_CONTEXT_MENU_CONVERT_TO_COMPONENT_CLICKED";
export const SYNTHETIC_NODE_CONTEXT_MENU_REMOVE_CLICKED =
  "SYNTHETIC_NODE_CONTEXT_MENU_REMOVE_CLICKED";
export const SYNTHETIC_NODE_CONTEXT_MENU_WRAP_IN_SLOT_CLICKED =
  "SYNTHETIC_NODE_CONTEXT_MENU_WRAP_IN_SLOT_CLICKED";
export const SYNTHETIC_NODE_CONTEXT_MENU_SELECT_PARENT_CLICKED =
  "SYNTHETIC_NODE_CONTEXT_MENU_SELECT_PARENT_CLICKED";
export const SYNTHETIC_NODE_CONTEXT_MENU_SELECT_SOURCE_NODE_CLICKED =
  "SYNTHETIC_NODE_CONTEXT_MENU_SELECT_SOURCE_NODE_CLICKED";
export const INHERIT_PANE_REMOVE_BUTTON_CLICK =
  "INHERIT_PANE_REMOVE_BUTTON_CLICK";
export const EXPORT_NAME_CHANGED = "EXPORT_NAME_CHANGED";
export const ACTIVE_EDITOR_URI_DIRS_LOADED = "ACTIVE_EDITOR_URI_DIRS_LOADED";
export const INHERIT_ITEM_COMPONENT_TYPE_CHANGE_COMPLETE =
  "INHERIT_ITEM_COMPONENT_TYPE_CHANGE_COMPLETE";
export const INHERIT_ITEM_CLICK = "INHERIT_ITEM_CLICK";
export const INSERT_TOOL_FINISHED = "INSERT_TOOL_FINISHED";
export const SYNTHETIC_NODES_PASTED = "SYNTHETIC_NODES_PASTED";
export const APP_LOADED = "APP_LOADED";
export const SAVED_FILE = "SAVED_FILE";
export const SAVED_ALL_FILES = "SAVED_ALL_FILES";
export const FRAME_BOUNDS_CHANGED = "FRAME_BOUNDS_CHANGED";
export const FRAME_BOUNDS_CHANGE_COMPLETED = "FRAME_BOUNDS_CHANGE_COMPLETED";
export const NEW_FILE_ENTERED = "NEW_FILE_ENTERED";
export const PROJECT_DIRECTORY_DIR_LOADED = "PROJECT_DIRECTORY_DIR_LOADED";
export const NEW_DIRECTORY_ENTERED = "NEW_DIRECTORY_ENTERED";
export const RAW_CSS_TEXT_CHANGED = "RAW_CSS_TEXT_CHANGED";
export const CSS_PROPERTY_CHANGED = "CSS_PROPERTY_CHANGED";
export const CSS_PROPERTY_CHANGE_COMPLETED = "CSS_PROPERTY_CHANGE_COMPLETED";
export const ATTRIBUTE_CHANGED = "ATTRIBUTE_CHANGED";
export const SLOT_TOGGLE_CLICK = "SLOT_TOGGLE_CLICK";
export const TEXT_VALUE_CHANGED = "TEXT_VALUE_CHANGED";
export const ELEMENT_TYPE_CHANGED = "ELEMENT_TYPE_CHANGED";
export const FILE_ITEM_RIGHT_CLICKED = "FILE_ITEM_RIGHT_CLICKED";
export const CANVAS_RIGHT_CLICKED = "CANVAS_RIGHT_CLICKED";
export const PC_LAYER_RIGHT_CLICKED = "PC_LAYER_RIGHT_CLICKED";
export const SOURCE_INSPECTOR_LAYER_CLICKED = "SOURCE_INSPECTOR_LAYER_CLICKED";
export const SOURCE_INSPECTOR_LAYER_ARROW_CLICKED =
  "SOURCE_INSPECTOR_LAYER_ARROW_CLICKED";
export const SOURCE_INSPECTOR_LAYER_LABEL_CHANGED =
  "SOURCE_INSPECTOR_LAYER_LABEL_CHANGED";
export const SOURCE_INSPECTOR_LAYER_DROPPED = "SOURCE_INSPECTOR_LAYER_DROPPED";
export const NEW_FILE_ADDED = "NEW_FILE_ADDED";
export const QUICK_SEARCH_ITEM_CLICKED = "QUICK_SEARCH_ITEM_CLICKED";
export const QUICK_SEARCH_BACKGROUND_CLICK = "QUICK_SEARCH_BACKGROUND_CLICK";
export const NEW_VARIANT_NAME_ENTERED = "NEW_VARIANT_NAME_ENTERED";
export const COMPONENT_VARIANT_REMOVED = "COMPONENT_VARIANT_REMOVED";
export const COMPONENT_VARIANT_NAME_CHANGED = "COMPONENT_VARIANT_NAME_CHANGED";
export const COMPONENT_VARIANT_NAME_CLICKED = "COMPONENT_VARIANT_NAME_CLICKED";
export const OPEN_PROJECT_BUTTON_CLICKED = "OPEN_PROJECT_BUTTON_CLICKED";
export const CREATE_PROJECT_BUTTON_CLICKED = "CREATE_PROJECT_BUTTON_CLICKED";
export const OPEN_CONTROLLER_BUTTON_CLCIKED = "OPEN_CONTROLLER_BUTTON_CLCIKED";
export const ADD_COMPONENT_CONTROLLER_BUTTON_CLICKED =
  "ADD_COMPONENT_CONTROLLER_BUTTON_CLICKED";
export const REMOVE_COMPONENT_CONTROLLER_BUTTON_CLICKED =
  "REMOVE_COMPONENT_CONTROLLER_BUTTON_CLICKED";
export const COMPONENT_CONTROLLER_PICKED = "COMPONENT_CONTROLLER_PICKED";
export const COMPONENT_VARIANT_NAME_DEFAULT_TOGGLE_CLICK =
  "COMPONENT_VARIANT_NAME_DEFAULT_TOGGLE_CLICK";
export const ELEMENT_VARIANT_TOGGLED = "ELEMENT_VARIANT_TOGGLED";
export const FILE_CHANGED = "FILE_CHANGED";

export const CONFIRM_SAVE_CHANGES = "CONFIRM_SAVE_CHANGES";
export const CHROME_HEADER_MOUSE_DOWN = "CHROME_HEADER_MOUSE_DOWN";
export const CHROME_CLOSE_BUTTON_CLICKED = "CHROME_CLOSE_BUTTON_CLICKED";
export const CHROME_MINIMIZE_BUTTON_CLICKED = "CHROME_MINIMIZE_BUTTON_CLICKED";
export const CHROME_MAXIMIZE_BUTTON_CLICKED = "CHROME_MAXIMIZE_BUTTON_CLICKED";
export const CSS_RESET_PROPERTY_OPTION_CLICKED =
  "CSS_RESET_PROPERTY_OPTION_CLICKED";

export type WrappedEvent<T> = {
  sourceEvent: T;
} & Action;

export type ProjectLoaded = {
  uri: string;
} & Action;

export type DocumentRendered = {
  nativeMap: SyntheticNativeNodeMap;
  documentId: string;
  info: ComputedDisplayInfo;
} & Action;

export enum FileChangedEventType {
  UNLINK = "unlink",
  ADD = "add",
  UNLINK_DIR = "unlinkDir",
  ADD_DIR = "addDir",
  CHANGE = "change"
}

export type FileChanged = {
  eventType: FileChangedEventType;
  uri: string;
} & Action;

export type FileNavigatorItemClicked = {
  node: FSItem;
} & Action;

export type FileNavigatorBasenameChanged = {
  item: FSItem;
  basename: string;
} & Action;

export type OpenFilesItemClick = {
  uri: string;
} & WrappedEvent<React.MouseEvent<any>>;

export type ToolbarToolClicked = {
  toolType: ToolType;
} & Action;

export type RawCSSTextChanged = {
  value: string;
} & Action;

export type AddVariableButtonClicked = {
  variableType: PCVariableType;
} & Action;

export type VariablePropertyChanged = {
  variable: PCVariable;
  value: string;
} & Action;

export type CSSPropertyChanged = {
  name: string;
  value: string;
} & Action;

export type AttributeChanged = {
  name: string;
  value: string;
} & Action;

export type ProjectDirectoryLoaded = {
  directory: Directory;
} & Action;

export type ProjectInfoLoaded = {
  info: ProjectInfo;
} & Action;

export type CanvasToolOverlayMousePanStart = {
  documentId: string;
} & Action;

export type CanvasToolOverlayMousePanning = {
  documentId: string;
  deltaY: number;
  velocityY: number;
  center: Point;
} & Action;

export type ResetPropertyOptionClicked = {
  property: string;
} & Action;

export type CanvasMouseMoved = {
  editorWindow: EditorWindow;
} & WrappedEvent<any>;

export type NewFileAdded = {
  uri: string;
  fileType: FSItemTagNames;
} & Action;

export type CanvasToolOverlayMousePanEnd = {
  documentId: string;
} & Action;

export type CanvasToolOverlayClicked = {
  documentId: string;
} & WrappedEvent<React.MouseEvent<any>>;

export type CanvasToolOverlayMouseMoved = {} & WrappedEvent<
  React.MouseEvent<any>
>;

export type ElementVariantToggled = {
  node: SyntheticVisibleNode;
  newVariants: string[];
} & Action;

export type CanvasWheel = {
  canvasWidth: number;
  canvasHeight: number;
  type: string;
  metaKey: boolean;
  ctrlKey: boolean;
  deltaX: number;
  deltaY: number;
} & Action;

export type TreeLayerMouseOver = {
  node: TreeNode<any>;
} & Action;

export type ProjectDirectoryDirLoaded = {
  items: FSItem[];
} & Action;

export type StyleVariantDropdownChanged = {
  variant: PCVariant;
  component: PCComponent;
} & Action;

export type TreeLayerLabelChanged = {
  label: string;
  node: TreeNode<any>;
} & Action;

export type TreeLayerDroppedNode = {
  node: TreeNode<any>;
  targetNode: TreeNode<any>;
  offset?: TreeMoveOffset;
} & Action;

export type SourceInspectorLayerDropped = {
  source: InspectorNode;
  target: InspectorNode;
  offset: TreeMoveOffset;
} & Action;

export type QuickSearchFilterChanged = {
  value: string;
} & Action;

export type QuickSearchResultLoaded = {
  matches: QuickSearchResult[];
} & Action;

export type TreeLayerClick = TreeLayerMouseOver &
  WrappedEvent<React.MouseEvent<any>>;
export type TreeLayerExpandToggleClick = TreeLayerMouseOver;
export type TreeLayerMouseOut = TreeLayerMouseOver;

export type InspectorLayerEvent = {
  node: InspectorNode;
} & WrappedEvent<React.MouseEvent<any>>;

export type InspectorLayerLabelChanged = {
  node: InspectorNode;
  label: string;
} & WrappedEvent<React.KeyboardEvent<any>>;

export type CanvasMounted = {
  element: HTMLDivElement;
  fileUri: string;
} & Action;

export type NewFileEntered = {
  basename: string;
} & Action;

export type CanvasToolWindowKeyDown = {
  documentId: string;
} & WrappedEvent<React.KeyboardEvent<any>>;

export type CanvasToolArtboardTitleClicked = {
  frame: Frame;
} & WrappedEvent<React.MouseEvent<any>>;

export type SlotToggleClick = {} & Action;

export type NewVariantNameEntered = {
  value: string;
} & Action;

export type FileItemContextMenuAction = {
  item: FSItem;
} & Action;

export type SyntheticNodeContextMenuAction = {
  item: SyntheticVisibleNode;
} & Action;

export type ComponentVariantNameChanged = {
  oldName: string;
  newName: string;
} & Action;

export type ComponentVariantNameClicked = {
  name: string;
} & Action;

export type ComponentControllerPicked = {
  filePath: string;
} & Action;

export type ComponentControllerItemClicked = {
  relativePath: string;
} & Action;

export type AddComponentControllerButtonClicked = {
  defaultPath: string;
} & Action;

export type InstanceVariantToggled = {
  variant: PCVariant;
} & Action;

export type ComponentVariantNameDefaultToggleClick = {
  name: string;
  value: boolean;
} & Action;

export type PromptConfirmed = {
  inputValue: string;
} & Action;

export type PromptCancelButtonClicked = {} & Action;

export type TextValueChanged = {
  value: string;
} & Action;

export type ConfirmCloseWindow = {
  type: string;
  closeWithoutSaving: boolean;
  cancel: boolean;
  save: boolean;
} & Action;

export type ElementTypeChanged = {
  value: string;
} & Action;

export type UnhandledError = {
  error: Error;
} & Action;

export type ResizerPathMoved = {
  originalBounds: Bounds;
  newBounds: Bounds;
  anchor: Point;
} & WrappedEvent<MouseEvent>;

export type ResizerMoved = {
  point: Point;
} & Action;

export type ResizerMouseDown = {} & WrappedEvent<React.MouseEvent<any>>;

export type ResizerPathStoppedMoving = {} & ResizerPathMoved;

export type FrameModeChangeComplete = {
  frame: Frame;
  mode: FrameMode;
} & Action;

export type SelectorDoubleClicked = {
  nodeId: string;
} & WrappedEvent<React.MouseEvent<any>>;

export type ShortcutKeyDown = {};

export type QuickSearchItemClicked = {
  item: QuickSearchResult;
} & Action;

export type ComponentPickerItemClick = {
  component: PCComponent;
} & Action;

export type RemoveComponentControllerButtonClicked = {
  relativePath: string;
} & Action;

export type SavedFile = {
  uri: string;
} & Action;

export type SavedAllFiles = {} & Action;

export type InsertToolFinished = {
  fileUri: string;
  point: Point;
} & Action;

export type SyntheticVisibleNodesPasted = {
  clips: PCNodeClip[];
} & Action;

export type FileNavigatorLabelClicked = {
  fileId: string;
} & Action;

export type FrameBoundsChanged = {
  newBounds: Bounds;
} & Action;

export type FileItemRightClicked = {
  event: React.MouseEvent<any>;
  type: string;
  item: FSItem;
} & Action;

export type CanvasRightClicked = {
  event: React.MouseEvent<any>;
} & Action;

export type PCLayerRightClicked = {
  item: InspectorNode;
  event: React.MouseEvent<any>;
} & Action;

export type FileNavigatorNewFileEntered = {
  directoryId: string;
  basename: string;
  insertType: FSItemTagNames;
} & Action;

export type FileNavigatorDroppedItem = {
  node: FSItem;
  targetNode: FSItem;
  offset: TreeMoveOffset;
} & Action;

export type ExportNameChanged = {
  value: string;
} & Action;

export type EditorTabClicked = {
  uri: string;
} & Action;

export type CanvasDroppedItem = {
  editorUri: string;
  item: RegisteredComponent | TreeNode<any>;
  point: Point;
} & Action;

export type VariantClicked = {
  variant: PCVariant;
} & Action;

export type VariantDefaultSwitchClicked = {
  variant: PCVariant;
} & Action;

export type VariantLabelChanged = {
  variant: PCVariant;
  newLabel?: string;
} & Action;

export type CanvasDraggingOver = {
  item: any;
  offset: Point;
} & Action;

export type InheritPaneItemClick = {
  componentId: string;
} & Action;

export type InheritPaneRemoveButtonClick = {
  componentId: string;
} & Action;

export type InheritItemComponentTypeChangeComplete = {
  oldComponentId: string;
  newComponentId: string;
} & Action;

export type InheritItemClick = {
  componentId: string;
} & Action;

export const fileNavigatorDroppedItem = (
  node: FSItem,
  targetNode: Directory,
  offset: TreeMoveOffset
): FileNavigatorDroppedItem => ({
  node,
  targetNode,
  offset,
  type: FILE_NAVIGATOR_DROPPED_ITEM
});

export const editorTabClicked = (uri: string): EditorTabClicked => ({
  uri,
  type: EDITOR_TAB_CLICKED
});

export const fileItemContextMenuDeleteClicked = publicActionCreator(
  (item: FSItem): FileItemContextMenuAction => ({
    item,
    type: FILE_ITEM_CONTEXT_MENU_DELETE_CLICKED
  })
);

export const fileItemContextMenuCopyPathClicked = publicActionCreator(
  (item: FSItem): FileItemContextMenuAction => ({
    item,
    type: FILE_ITEM_CONTEXT_MENU_COPY_PATH_CLICKED
  })
);

export const fileItemContextMenuRenameClicked = publicActionCreator(
  (item: FSItem): FileItemContextMenuAction => ({
    item,
    type: FILE_ITEM_CONTEXT_MENU_RENAME_CLICKED
  })
);

export const fileItemContextMenuOpenClicked = publicActionCreator(
  (item: FSItem): FileItemContextMenuAction => ({
    item,
    type: FILE_ITEM_CONTEXT_MENU_OPEN_CLICKED
  })
);

export const fileItemContextMenuOpenInFinderClicked = publicActionCreator(
  (item: FSItem): FileItemContextMenuAction => ({
    item,
    type: FILE_ITEM_CONTEXT_MENU_OPEN_IN_FINDER_CLICKED
  })
);

export const syntheticNodeContextMenuConvertToComponentClicked = publicActionCreator(
  (item: SyntheticVisibleNode): SyntheticNodeContextMenuAction => ({
    type: SYNTHETIC_NODE_CONTEXT_MENU_CONVERT_TO_COMPONENT_CLICKED,
    item
  })
);

export const syntheticNodeContextMenuRemoveClicked = publicActionCreator(
  (item: SyntheticVisibleNode): SyntheticNodeContextMenuAction => ({
    type: SYNTHETIC_NODE_CONTEXT_MENU_REMOVE_CLICKED,
    item
  })
);

export const syntheticNodeContextMenuWrapInSlotClicked = publicActionCreator(
  (item: SyntheticVisibleNode): SyntheticNodeContextMenuAction => ({
    type: SYNTHETIC_NODE_CONTEXT_MENU_WRAP_IN_SLOT_CLICKED,
    item
  })
);

export const syntheticNodeContextMenuSelectParentClicked = publicActionCreator(
  (item: SyntheticVisibleNode): SyntheticNodeContextMenuAction => ({
    type: SYNTHETIC_NODE_CONTEXT_MENU_SELECT_PARENT_CLICKED,
    item
  })
);

export const syntheticNodeContextMenuSelectSourceNodeClicked = publicActionCreator(
  (item: SyntheticVisibleNode): SyntheticNodeContextMenuAction => ({
    type: SYNTHETIC_NODE_CONTEXT_MENU_SELECT_SOURCE_NODE_CLICKED,
    item
  })
);

export const cssResetPropertyOptionClicked = (
  property: string
): ResetPropertyOptionClicked => ({
  type: CSS_RESET_PROPERTY_OPTION_CLICKED,
  property
});

export const editorTabCloseButtonClicked = (uri: string): EditorTabClicked => ({
  uri,
  type: EDITOR_TAB_CLOSE_BUTTON_CLICKED
});

export const fileChanged = (
  eventType: FileChangedEventType,
  uri: string
): FileChanged => ({
  type: FILE_CHANGED,
  eventType,
  uri
});

export const fileNavigatorItemClicked = (
  node: FSItem
): FileNavigatorItemClicked => ({
  node,
  type: FILE_NAVIGATOR_ITEM_CLICKED
});

export const fileNavigatorToggleDirectoryClicked = (
  node: FSItem
): FileNavigatorItemClicked => ({
  node,
  type: FILE_NAVIGATOR_TOGGLE_DIRECTORY_CLICKED
});

export const fileNavigatorBasenameChanged = (
  basename: string,
  item: FSItem
): FileNavigatorBasenameChanged => ({
  item,
  basename,
  type: FILE_NAVIGATOR_BASENAME_CHANGED
});

export const promptConfirmed = (
  inputValue: string,
  actionType: string
): PromptConfirmed => ({
  inputValue,
  type: actionType
});

export const exportNameChanged = (value: string): ExportNameChanged => ({
  type: EXPORT_NAME_CHANGED,
  value
});

export const promptCancelButtonClicked = (): PromptCancelButtonClicked => ({
  type: PROMPT_CANCEL_BUTTON_CLICKED
});

export const newFileAdded = (
  uri: string,
  fileType: FSItemTagNames
): NewFileAdded => ({
  uri,
  fileType,
  type: NEW_FILE_ADDED
});

export const elementVariantToggled = (
  newVariants: string[],
  node: SyntheticVisibleNode
): ElementVariantToggled => ({
  newVariants,
  node,
  type: ELEMENT_VARIANT_TOGGLED
});

export const fileNavigatorNewFileClicked = (): Action => ({
  type: FILE_NAVIGATOR_NEW_FILE_CLICKED
});

export const styleVariantDropdownChanged = (
  variant: PCVariant,
  component: PCComponent
): StyleVariantDropdownChanged => ({
  type: STYLE_VARIANT_DROPDOWN_CHANGED,
  component,
  variant
});

export const addVariableButtonClicked = (
  variableType: PCVariableType
): AddVariableButtonClicked => ({
  variableType,
  type: ADD_VARIABLE_BUTTON_CLICKED
});

export const variableLabelChangeCompleted = (
  variable: PCVariable,
  value: string
): VariablePropertyChanged => ({
  variable,
  type: VARIABLE_LABEL_CHANGE_COMPLETED,
  value
});

export const variableValueChanged = (
  variable: PCVariable,
  value: string
): VariablePropertyChanged => ({
  variable,
  type: VARIABLE_VALUE_CHANGED,
  value
});

export const variableValueChangeCompleted = (
  variable: PCVariable,
  value: string
): VariablePropertyChanged => ({
  variable,
  type: VARIABLE_VALUE_CHANGE_COMPLETED,
  value
});

export const newStyleVariantButtonClicked = (): Action => ({
  type: NEW_STYLE_VARIANT_BUTTON_CLICKED
});

export const projectDirectoryDirLoaded = (
  items: FSItem[]
): ProjectDirectoryDirLoaded => ({
  type: PROJECT_DIRECTORY_DIR_LOADED,
  items
});

export const removeStyleButtonClicked = (): Action => ({
  type: REMOVE_STYLE_BUTTON_CLICKED
});

export const editVariantNameButtonClicked = (): Action => ({
  type: EDIT_VARIANT_NAME_BUTTON_CLICKED
});

export const addStyleButtonClicked = (): Action => ({
  type: ADD_STYLE_BUTTON_CLICKED
});

export const fileNavigatorNewDirectoryClicked = (): Action => ({
  type: FILE_NAVIGATOR_NEW_DIRECTORY_CLICKED
});

export const openProjectButtonClicked = publicActionCreator(() => ({
  type: OPEN_PROJECT_BUTTON_CLICKED
}));

export const createProjectButtonClicked = publicActionCreator(() => ({
  type: CREATE_PROJECT_BUTTON_CLICKED
}));

export const inheritPaneAddButtonClick = (): Action => ({
  type: INHERIT_PANE_ADD_BUTTON_CLICK
});

export const inheritPaneRemoveButtonClick = (
  componentId: string
): InheritPaneRemoveButtonClick => ({
  componentId,
  type: INHERIT_PANE_REMOVE_BUTTON_CLICK
});
export const projectInfoLoaded = (info: ProjectInfo): ProjectInfoLoaded => ({
  type: PROJECT_INFO_LOADED,
  info
});

export const inheritItemComponentTypeChangeComplete = (
  oldComponentId: string,
  newComponentId: string
): InheritItemComponentTypeChangeComplete => ({
  oldComponentId,
  newComponentId,
  type: INHERIT_ITEM_COMPONENT_TYPE_CHANGE_COMPLETE
});
export const componentPickerBackgroundClick = (): Action => ({
  type: COMPONENT_PICKER_BACKGROUND_CLICK
});

export const addVariantButtonClicked = (): Action => ({
  type: ADD_VARIANT_BUTTON_CLICKED
});

export const fileItemRightClicked = (
  item: FSItem,
  event: React.MouseEvent<any>
): FileItemRightClicked => ({
  type: FILE_ITEM_RIGHT_CLICKED,
  event,
  item
});

export const canvasRightClicked = (
  event: React.MouseEvent<any>
): CanvasRightClicked => ({
  type: CANVAS_RIGHT_CLICKED,
  event
});

export const pcLayerRightClicked = (
  item: InspectorNode,
  event: React.MouseEvent<any>
): PCLayerRightClicked => ({
  item,
  type: PC_LAYER_RIGHT_CLICKED,
  event
});

export const unhandledError = (error: Error): UnhandledError => ({
  error,
  type: UNHANDLED_ERROR
});

export const removeVariantButtonClicked = (): Action => ({
  type: REMOVE_VARIANT_BUTTON_CLICKED
});

export const quickSearchFilterChanged = (
  value: string
): QuickSearchFilterChanged => ({
  type: QUICK_SEARCH_FILTER_CHANGED,
  value
});

export const quickSearchFilterResultLoaded = (
  matches: QuickSearchResult[]
): QuickSearchResultLoaded => ({
  matches,
  type: QUICK_SEARCH_RESULT_LOADED
});

export const variantDefaultSwitchClicked = (
  variant: PCVariant
): VariantDefaultSwitchClicked => ({
  variant,
  type: VARIANT_DEFAULT_SWITCH_CLICKED
});

export const instanceVariantToggled = (
  variant: PCVariant
): InstanceVariantToggled => ({
  variant,
  type: COMPONENT_INSTANCE_VARIANT_TOGGLED
});

export const instanceVariantResetClicked = (
  variant: PCVariant
): InstanceVariantToggled => ({
  variant,
  type: INSTANCE_VARIANT_RESET_CLICKED
});

export const variantLabelChanged = (
  variant: PCVariant,
  newLabel: string
): VariantLabelChanged => ({
  variant,
  newLabel,
  type: VARIANT_LABEL_CHANGED
});

export const componentPickerItemClick = (
  component: PCComponent
): ComponentPickerItemClick => ({
  component,
  type: COMPONENT_PICKER_ITEM_CLICK
});

export const quickSearchItemClicked = (
  item: QuickSearchResult
): QuickSearchItemClicked => ({
  item,
  type: QUICK_SEARCH_ITEM_CLICKED
});

export const openControllerButtonClicked = (
  relativePath: string
): ComponentControllerItemClicked => ({
  relativePath,
  type: OPEN_CONTROLLER_BUTTON_CLCIKED
});

export const addComponentControllerButtonClicked = publicActionCreator(
  (defaultPath: string): AddComponentControllerButtonClicked => ({
    defaultPath,
    type: ADD_COMPONENT_CONTROLLER_BUTTON_CLICKED
  })
);

export const removeComponentControllerButtonClicked = (
  relativePath: string
): RemoveComponentControllerButtonClicked => ({
  relativePath,
  type: REMOVE_COMPONENT_CONTROLLER_BUTTON_CLICKED
});

export const componentControllerPicked = (
  filePath: string
): ComponentControllerPicked => ({
  filePath,
  type: COMPONENT_CONTROLLER_PICKED
});

export const quickSearchBackgroundClick = (): Action => ({
  type: QUICK_SEARCH_BACKGROUND_CLICK
});

export const fileNavigatorNewFileEntered = (
  basename: string,
  insertType: FSItemTagNames,
  directoryId: string
): FileNavigatorNewFileEntered => ({
  basename,
  directoryId,
  insertType,
  type: FILE_NAVIGATOR_NEW_FILE_ENTERED
});

export const openFilesItemClick = (
  uri: string,
  sourceEvent: React.MouseEvent<any>
): OpenFilesItemClick => ({
  uri,
  sourceEvent,
  type: OPEN_FILE_ITEM_CLICKED
});

export const openFilesItemCloseClick = (uri: string): OpenFilesItemClick => ({
  uri,
  sourceEvent: null,
  type: OPEN_FILE_ITEM_CLOSE_CLICKED
});

export const activeEditorUriDirsLoaded = (): Action => ({
  type: ACTIVE_EDITOR_URI_DIRS_LOADED
});

export const frameModeChangeComplete = (
  frame: Frame,
  mode: FrameMode
): FrameModeChangeComplete => ({
  type: FRAME_MODE_CHANGE_COMPLETE,
  frame,
  mode
});

export const toolbarToolClicked = (toolType: ToolType): ToolbarToolClicked => ({
  type: TOOLBAR_TOOL_CLICKED,
  toolType
});

export const fileNavigatorItemDoubleClicked = (
  node: FSItem
): FileNavigatorItemClicked => ({
  node,
  type: FILE_NAVIGATOR_ITEM_DOUBLE_CLICKED
});

export const fileNavigatorItemBlurred = (
  node: FSItem
): FileNavigatorItemClicked => ({
  node,
  type: FILE_NAVIGATOR_ITEM_BLURRED
});

export const sourceInspectorLayerClicked = (
  node: InspectorNode,
  sourceEvent: React.MouseEvent<any>
): InspectorLayerEvent => ({
  type: SOURCE_INSPECTOR_LAYER_CLICKED,
  node,
  sourceEvent
});

export const sourceInspectorLayerArrowClicked = (
  node: InspectorNode,
  sourceEvent: React.MouseEvent<any>
): InspectorLayerEvent => ({
  type: SOURCE_INSPECTOR_LAYER_ARROW_CLICKED,
  node,
  sourceEvent
});

export const sourceInspectorLayerLabelChanged = (
  node: InspectorNode,
  label: string,
  sourceEvent: React.KeyboardEvent<any>
): InspectorLayerLabelChanged => ({
  type: SOURCE_INSPECTOR_LAYER_LABEL_CHANGED,
  node,
  label,
  sourceEvent
});

export const newVariantNameEntered = (
  value: string
): NewVariantNameEntered => ({
  value,
  type: NEW_VARIANT_NAME_ENTERED
});

export const componentComponentVariantNameChanged = (
  oldName: string,
  newName: string
): ComponentVariantNameChanged => ({
  oldName,
  newName,
  type: COMPONENT_VARIANT_NAME_CHANGED
});

export const componentComponentVariantNameClicked = (
  name: string
): ComponentVariantNameClicked => ({
  name,
  type: COMPONENT_VARIANT_NAME_CLICKED
});

export const componentVariantNameDefaultToggleClick = (
  name: string,
  value: boolean
): ComponentVariantNameDefaultToggleClick => ({
  name,
  value,
  type: COMPONENT_VARIANT_NAME_DEFAULT_TOGGLE_CLICK
});

export const sourceInspectorLayerDropped = (
  source: InspectorNode,
  target: InspectorNode,
  offset: TreeMoveOffset
): SourceInspectorLayerDropped => ({
  source,
  target,
  offset,
  type: SOURCE_INSPECTOR_LAYER_DROPPED
});

export const rawCssTextChanged = (value: string): RawCSSTextChanged => ({
  value,
  type: RAW_CSS_TEXT_CHANGED
});

export const cssPropertyChanged = (
  name: string,
  value: string
): CSSPropertyChanged => ({
  name,
  value,
  type: CSS_PROPERTY_CHANGED
});

export const cssPropertyChangeCompleted = (
  name: string,
  value: string
): CSSPropertyChanged => ({
  name,
  value,
  type: CSS_PROPERTY_CHANGE_COMPLETED
});

export const attributeChanged = (
  name: string,
  value: string
): AttributeChanged => ({
  name,
  value,
  type: ATTRIBUTE_CHANGED
});

export const slotToggleClick = (): SlotToggleClick => ({
  type: SLOT_TOGGLE_CLICK
});

export const textValueChanged = (value: string): TextValueChanged => ({
  value,
  type: TEXT_VALUE_CHANGED
});

export const elementTypeChanged = (value: string): ElementTypeChanged => ({
  value,
  type: ELEMENT_TYPE_CHANGED
});

export const appLoaded = publicActionCreator(() => ({ type: APP_LOADED }));

export const newFileEntered = (basename: string): NewFileEntered => ({
  basename,
  type: NEW_FILE_ENTERED
});

export const newDirectoryEntered = (basename: string): NewFileEntered => ({
  basename,
  type: NEW_DIRECTORY_ENTERED
});

export const projectLoaded = (uri: string): ProjectLoaded => ({
  uri,
  type: PROJECT_LOADED
});

export const projectDirectoryLoaded = publicActionCreator(
  (directory: Directory): ProjectDirectoryLoaded => ({
    directory,
    type: PROJECT_DIRECTORY_LOADED
  })
);

export const shortcutKeyDown = publicActionCreator(
  (type: string): ShortcutKeyDown => ({
    type
  })
);

export const syntheticNodesPasted = (
  clips: PCNodeClip[]
): SyntheticVisibleNodesPasted => ({
  clips,
  type: SYNTHETIC_NODES_PASTED
});

export const documentRendered = (
  documentId: string,
  info: ComputedDisplayInfo,
  nativeMap: SyntheticNativeNodeMap
): DocumentRendered => ({
  nativeMap,
  documentId,
  info,
  type: DOCUMENT_RENDERED
});

export const savedFile = (uri: string): SavedFile => ({
  uri,
  type: SAVED_FILE
});

export const savedAllFiles = (uri: string): SavedAllFiles => ({
  type: SAVED_ALL_FILES
});

export const canvasToolOverlayMousePanStart = (
  documentId: string
): CanvasToolOverlayMousePanStart => ({
  documentId,
  type: CANVAS_TOOL_OVERLAY_MOUSE_PAN_START
});

export const canvasToolOverlayMousePanning = (
  documentId: string,
  center: Point,
  deltaY: number,
  velocityY: number
): CanvasToolOverlayMousePanning => ({
  documentId,
  center,
  deltaY,
  velocityY,
  type: CANVAS_TOOL_OVERLAY_MOUSE_PANNING
});

export const canvasToolOverlayMouseLeave = (
  sourceEvent: React.MouseEvent<any>
): CanvasToolOverlayMouseMoved => ({
  type: CANVAS_TOOL_OVERLAY_MOUSE_LEAVE,
  sourceEvent
});

export const canvasToolOverlayMousePanEnd = (
  documentId: string
): CanvasToolOverlayMousePanEnd => ({
  documentId,
  type: CANVAS_TOOL_OVERLAY_MOUSE_PAN_END
});

export const canvasToolOverlayMouseDoubleClicked = (
  documentId: string,
  sourceEvent: React.MouseEvent<any>
): CanvasToolOverlayClicked => ({
  documentId,
  type: CANVAS_TOOL_OVERLAY_MOUSE_DOUBLE_CLICKED,
  sourceEvent
});

export const canvasContainerMounted = (
  element: HTMLDivElement,
  fileUri: string
): CanvasMounted => ({
  element,
  fileUri,
  type: CANVAS_MOUNTED
});

export const canvasMouseMoved = (
  editorWindow: EditorWindow,
  sourceEvent: React.MouseEvent<any>
): CanvasMouseMoved => ({
  editorWindow,
  sourceEvent,
  type: CANVAS_MOUSE_MOVED
});

export const canvasDraggedOver = (
  item: any,
  offset: Point
): CanvasDraggingOver => ({
  item,
  offset,
  type: CANVAS_DRAGGED_OVER
});

export const canvasMouseClicked = (
  sourceEvent: React.MouseEvent<any>
): WrappedEvent<React.MouseEvent<any>> => ({
  sourceEvent,
  type: CANVAS_MOUSE_CLICKED
});

export const canvasMouseDoubleClicked = (
  sourceEvent: React.MouseEvent<any>
): WrappedEvent<React.MouseEvent<any>> => ({
  sourceEvent,
  type: CANVAS_MOUSE_DOUBLE_CLICKED
});

export const canvasWheel = (
  canvasWidth: number,
  canvasHeight: number,
  { metaKey, ctrlKey, deltaX, deltaY, clientX, clientY }: React.WheelEvent<any>
): CanvasWheel => ({
  metaKey,
  canvasWidth,
  canvasHeight,
  ctrlKey,
  deltaX,
  deltaY,
  type: CANVAS_WHEEL
});

export const canvasDroppedItem = (
  item: RegisteredComponent,
  point: Point,
  editorUri: string
): CanvasDroppedItem => ({
  editorUri,
  item,
  point,
  type: CANVAS_DROPPED_ITEM
});

export const canvasMotionRested = () => ({
  type: CANVAS_MOTION_RESTED
});

export const insertToolFinished = (
  point: Point,
  fileUri: string
): InsertToolFinished => ({
  point,
  fileUri,
  type: INSERT_TOOL_FINISHED
});

export const canvasToolWindowBackgroundClicked = (
  sourceEvent: React.KeyboardEvent<any>
): WrappedEvent<React.KeyboardEvent<any>> => ({
  type: CANVAS_TOOL_WINDOW_BACKGROUND_CLICKED,
  sourceEvent
});
export const canvasToolWindowKeyDown = (
  documentId: string,
  sourceEvent: React.KeyboardEvent<any>
): CanvasToolWindowKeyDown => ({
  type: CANVAS_TOOL_WINDOW_KEY_DOWN,
  documentId,
  sourceEvent
});
export const canvasToolDocumentTitleClicked = (
  frame: Frame,
  sourceEvent: React.MouseEvent<any>
): CanvasToolArtboardTitleClicked => ({
  type: CANVAS_TOOL_ARTBOARD_TITLE_CLICKED,
  frame,
  sourceEvent
});

export const canvasToolPreviewButtonClicked = (
  frame: Frame,
  sourceEvent: React.MouseEvent<any>
): CanvasToolArtboardTitleClicked => ({
  type: CANVAS_TOOL_PREVIEW_BUTTON_CLICKED,
  frame,
  sourceEvent
});

export const resizerPathMoved = (
  anchor: Point,
  originalBounds: Bounds,
  newBounds: Bounds,
  sourceEvent: MouseEvent
): ResizerPathMoved => ({
  type: RESIZER_PATH_MOUSE_MOVED,
  anchor,
  originalBounds,
  newBounds,
  sourceEvent
});

export const frameBoundsChanged = (newBounds: Bounds) => ({
  type: FRAME_BOUNDS_CHANGED,
  newBounds
});

export const frameBoundsChangeCompleted = (newBounds: Bounds) => ({
  type: FRAME_BOUNDS_CHANGE_COMPLETED,
  newBounds
});

export const resizerPathStoppedMoving = (
  anchor: Point,
  originalBounds: Bounds,
  newBounds: Bounds,
  sourceEvent: MouseEvent
): ResizerPathMoved => ({
  type: RESIZER_PATH_MOUSE_STOPPED_MOVING,
  anchor,
  originalBounds,
  newBounds,
  sourceEvent: { ...sourceEvent }
});

export const resizerMoved = (point: Point): ResizerMoved => ({
  point,
  type: RESIZER_MOVED
});

export const resizerStoppedMoving = (point: Point): ResizerMoved => ({
  point,
  type: RESIZER_STOPPED_MOVING
});

export const resizerMouseDown = (
  sourceEvent: React.MouseEvent<any>
): ResizerMouseDown => ({
  sourceEvent,
  type: RESIZER_MOUSE_DOWN
});

export const resizerStartDrag = (
  sourceEvent: React.MouseEvent<any>
): ResizerMouseDown => ({
  sourceEvent,
  type: RESIZER_START_DRGG
});
