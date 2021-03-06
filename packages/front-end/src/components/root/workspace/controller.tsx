import * as React from "react";
import { RootState } from "../../../state";
import { Dispatch } from "redux";
const {
  Modal: ComponentPickerModal
} = require("../../component-picker/modal.pc");
const { Modal: QuickSearchModal } = require("../../quick-search/view.pc");
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { BaseWorkspaceProps, WorkspacePrompt } from "./view.pc";
import { mapStateToProps as mapStatetoPromptControllerProps } from "./prompt-controller";
import { ContextMenu } from "../../context-menu/view.pc";

export type Props = {
  root: RootState;
  dispatch: Dispatch<any>;
};

const WORKSPACE_STYLE = {
  width: "100%",
  height: "100%"
};

export default (Base: React.ComponentClass<BaseWorkspaceProps>) =>
  DragDropContext(HTML5Backend)(
    class WorkspaceController extends React.PureComponent<Props> {
      render() {
        const { root, dispatch } = this.props;
        const {
          graph,
          activeEditorFilePath: activeEditorUri,
          selectedInspectorNodeIds,
          hoveringInspectorNodeIds,
          selectedFileNodeIds,
          sourceNodeInspector,
          documents,
          projectDirectory
        } = root;
        const workspaceProps = mapStatetoPromptControllerProps(root);
        return (
          <div style={WORKSPACE_STYLE}>
            <Base
              leftGutterProps={{
                activeEditorUri,
                editingFileNameUri: root.editingBasenameUri,
                show: root.showSidebar,
                selectedFileNodeIds,
                graph,
                selectedInspectorNodeIds,
                hoveringInspectorNodeIds,
                sourceNodeInspector,
                documents,
                dispatch,
                rootDirectory: projectDirectory
              }}
              editorWindowsProps={{
                root,
                dispatch
              }}
              rightGutterProps={{
                root,
                dispatch
              }}
            />

            <QuickSearchModal root={root} dispatch={dispatch} />
            <ComponentPickerModal root={root} dispatch={dispatch} />
            {workspaceProps && (
              <WorkspacePrompt {...workspaceProps} dispatch={dispatch} />
            )}
          </div>
        );
      }
    }
  );
