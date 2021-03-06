import * as React from "react";
import * as ReactDOM from "react-dom";
import * as path from "path";
import scrollIntoView from "scroll-into-view-if-needed";
import { FocusComponent } from "../../../../focus";
import * as cx from "classnames";
import { compose } from "recompose";
import { DragSource } from "react-dnd";
import { withNodeDropTarget } from "./dnd-controller";
import { BeforeDropZone, AfterDropZone } from "./drop-zones.pc";
import {
  PCSourceTagNames,
  getPCNode,
  PCVisibleNode,
  getPCNodeDependency,
  getPCNodeContentNode,
  PCModule,
  getPCNodeModule
} from "paperclip";
import { InspectorNode, InspectorTreeNodeName } from "paperclip";
import { Dispatch } from "redux";
import {
  sourceInspectorLayerClicked,
  sourceInspectorLayerArrowClicked,
  sourceInspectorLayerLabelChanged,
  pcLayerRightClicked
} from "../../../../../actions";
import {
  containsNestedTreeNodeById,
  TreeMoveOffset
} from "../../../../../../node_modules/tandem-common";
import { BaseNodeLayerProps } from "./layer.pc";
import { withLayersPaneContext, LayersPaneContextProps } from "./contexts";
import { getInspectorContentNodeContainingChild } from "paperclip";

export type Props = {
  depth?: number;
  inShadow?: boolean;
  inspectorNode: InspectorNode;
};

type ContextProps = {
  isSelected: boolean;
  isHovering: boolean;
  dispatch: Dispatch<any>;
  label: string;
};

type InnerProps = {
  editingLabel: boolean;
  isOver: boolean;
  canDrop: boolean;
  onLabelClick: () => any;
  connectDragSource?: any;
  connectDropTarget?: any;
  onLabelRightClick: () => any;
  onLabelDoubleClick: () => any;
  onArrowButtonClick: () => any;
  onLabelInputKeyDown: () => any;
  onLabelInputBlur: () => any;
  assocSourceNodeName: string;
} & ContextProps &
  Props;

const DRAG_TYPE = "INSPECTOR_NODE";

const LAYER_PADDING = 16;

const CONTAINER_STYLE = {
  display: "inline-block",
  minWidth: "100%"
};

export default (Base: React.ComponentClass<BaseNodeLayerProps>) => {
  let EnhancedLayer: React.ComponentClass<Props>;

  const enhance = compose<BaseNodeLayerProps, Props>(
    withLayersPaneContext<ContextProps, Props>(
      (
        { inspectorNode }: Props,
        {
          graph,
          selectedInspectorNodeIds,
          hoveringInspectorNodeIds,
          dispatch,
          rootInspectorNode
        }: LayersPaneContextProps
      ) => {
        const assocSourceNode = getPCNode(
          inspectorNode.assocSourceNodeId,
          graph
        );

        let label = (assocSourceNode as PCVisibleNode).label;

        // note that "Layer" is used as a default label here
        // to show layers that have an undefined label (which shouldn't exist)
        if (!label) {
          if (assocSourceNode.name === PCSourceTagNames.MODULE) {
            const dependency = getPCNodeDependency(
              inspectorNode.assocSourceNodeId,
              graph
            );
            label = path.basename(dependency.uri);
          } else if (assocSourceNode.name === PCSourceTagNames.ELEMENT) {
            label = assocSourceNode.is || "Layer";
          } else if (
            assocSourceNode.name === PCSourceTagNames.COMPONENT_INSTANCE
          ) {
            label = "Layer";
          } else if (assocSourceNode.name === PCSourceTagNames.TEXT) {
            label = "Layer";
          } else if (assocSourceNode.name === PCSourceTagNames.COMPONENT) {
            label = "Layer";
          } else if (assocSourceNode.name === PCSourceTagNames.SLOT) {
            label = assocSourceNode.label;
          }
        }

        return {
          dispatch,
          isSelected: selectedInspectorNodeIds.indexOf(inspectorNode.id) !== -1,
          isHovering: hoveringInspectorNodeIds.indexOf(inspectorNode.id) !== -1,
          label,
          graph,
          inspectorNode,
          contentNode: getInspectorContentNodeContainingChild(
            inspectorNode,
            rootInspectorNode
          ),
          assocSourceNodeName: assocSourceNode.name
        };
      }
    ),

    withNodeDropTarget(TreeMoveOffset.PREPEND),
    DragSource(
      DRAG_TYPE,
      {
        beginDrag({ inspectorNode }: InnerProps) {
          return inspectorNode;
        },
        canDrag({ inspectorNode, graph }: any) {
          const sourceNode = getPCNode(inspectorNode.assocSourceNodeId, graph);
          const module = getPCNodeModule(
            inspectorNode.assocSourceNodeId,
            graph
          ) as PCModule;
          const contentSourceNode = getPCNodeContentNode(
            inspectorNode.assocSourceNodeId,
            module
          );
          const canDrag =
            contentSourceNode &&
            containsNestedTreeNodeById(sourceNode.id, contentSourceNode);
          return canDrag;
        }
      },
      (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
      })
    ),
    Base => {
      return class LayerController extends React.Component<InnerProps, any> {
        constructor(props) {
          super(props);
          this.state = { editingLabel: false };
        }
        onLabelClick = event => {
          this.props.dispatch(
            sourceInspectorLayerClicked(this.props.inspectorNode, event)
          );
        };
        onArrowButtonClick = event => {
          event.stopPropagation();
          this.props.dispatch(
            sourceInspectorLayerArrowClicked(this.props.inspectorNode, event)
          );
        };
        onLabelDoubleClick = () => {
          if (
            this.props.inspectorNode.name === InspectorTreeNodeName.SOURCE_REP
          ) {
            this.setState({ ...this.state, editingLabel: true });
          }
        };
        onLabelRightClick = (event: React.MouseEvent<any>) => {
          this.props.dispatch(
            pcLayerRightClicked(this.props.inspectorNode, event)
          );
        };
        onLabelInputKeyDown = event => {
          if (event.key === "Enter") {
            this.persistLabelChange(event);
          }
        };
        onLabelInputBlur = event => {
          this.persistLabelChange(event);
        };
        private persistLabelChange = event => {
          const label = String((event.target as any).value || "").trim();

          // labels SHOULD NOT be undefined
          if (!label) {
            return;
          }
          this.setState({ ...this.state, editingLabel: false });
          this.props.dispatch(
            sourceInspectorLayerLabelChanged(
              this.props.inspectorNode,
              label,
              event
            )
          );
        };
        componentDidMount() {
          this.makeVisible(this.props.isSelected);
        }
        componentDidUpdate(prevProps: InnerProps) {
          this.makeVisible(this.props.isSelected && !prevProps.isSelected);
        }
        private makeVisible(selected: boolean) {
          if (selected) {
            const self = ReactDOM.findDOMNode(this) as HTMLSpanElement;

            setTimeout(() => {
              const label = self.children[1].children[0].children[1];
              // icky, but we're picking the label here
              scrollIntoView(label, {
                scrollMode: "if-needed"
              });
            }, 10);
          }
        }
        shouldComponentUpdate(nextProps, nextState) {
          return (
            this.props.depth !== nextProps.depth ||
            this.props.isSelected !== nextProps.isSelected ||
            this.props.isHovering !== nextProps.isHovering ||
            this.props.isOver !== nextProps.isOver ||
            this.props.canDrop !== nextProps.canDrop ||
            this.props.inspectorNode !== nextProps.inspectorNode ||
            this.props.connectDragSource !== nextProps.connectDragSource ||
            this.props.label !== nextProps.label ||
            this.props.connectDropTarget !== nextProps.connectDropTarget ||
            this.props.inShadow !== nextProps.inShadow ||
            this.props.assocSourceNodeName !== nextProps.assocSourceNodeName ||
            this.state.editingLabel !== nextState.editingLabel
          );
        }
        render() {
          const {
            depth,
            isSelected,
            isHovering,
            isOver,
            canDrop,
            inspectorNode,
            connectDragSource,
            label,
            connectDropTarget,
            inShadow,
            assocSourceNodeName
          } = this.props;
          const { editingLabel } = this.state;
          const {
            onLabelClick,
            onArrowButtonClick,
            onLabelDoubleClick,
            onLabelRightClick,
            onLabelInputKeyDown,
            onLabelInputBlur
          } = this;
          return (
            <Base
              onLabelClick={onLabelClick}
              onArrowButtonClick={onArrowButtonClick}
              onLabelDoubleClick={onLabelDoubleClick}
              onLabelRightClick={onLabelRightClick}
              onLabelInputKeyDown={onLabelInputKeyDown}
              onLabelInputBlur={onLabelInputBlur}
              editingLabel={editingLabel}
              depth={depth}
              isSelected={isSelected}
              isHovering={isHovering}
              connectDragSource={connectDragSource}
              isOver={isOver}
              canDrop={canDrop}
              inspectorNode={inspectorNode}
              label={label}
              connectDropTarget={connectDropTarget}
              inShadow={inShadow}
              assocSourceNodeName={assocSourceNodeName}
            />
          );
        }
      };
    },
    (Base: React.ComponentClass<BaseNodeLayerProps>) => ({
      depth = 1,
      onLabelClick,
      editingLabel,
      isSelected,
      isHovering,
      isOver,
      canDrop,
      inspectorNode,
      onArrowButtonClick,
      onLabelDoubleClick,
      onLabelRightClick,
      onLabelInputKeyDown,
      onLabelInputBlur,
      connectDragSource,
      label,
      connectDropTarget,
      inShadow,
      assocSourceNodeName
    }: InnerProps) => {
      const expanded = inspectorNode.expanded;
      const isSourceRep =
        inspectorNode.name === InspectorTreeNodeName.SOURCE_REP;
      inShadow =
        inShadow || inspectorNode.name === InspectorTreeNodeName.SHADOW;
      let children;

      isHovering = isHovering || (canDrop && isOver);

      if (expanded) {
        const childDepth = depth + 1;
        children = inspectorNode.children.map((child, i) => {
          return (
            <EnhancedLayer
              inShadow={inShadow}
              key={child.id + i}
              depth={childDepth}
              inspectorNode={child}
            />
          );
        });
      }

      const dropZoneStyle = {
        width: `calc(100% - ${depth * LAYER_PADDING}px)`
      };

      const isFile =
        isSourceRep && assocSourceNodeName === PCSourceTagNames.MODULE;

      return (
        <span style={CONTAINER_STYLE}>
          <BeforeDropZone style={dropZoneStyle} inspectorNode={inspectorNode} />
          <FocusComponent focus={editingLabel}>
            {connectDropTarget(
              connectDragSource(
                <div>
                  <Base
                    onClick={onLabelClick}
                    onDoubleClick={onLabelDoubleClick}
                    onContextMenu={onLabelRightClick}
                    labelInputProps={{
                      onKeyDown: onLabelInputKeyDown,
                      onBlur: onLabelInputBlur
                    }}
                    variant={cx({
                      editingLabel: editingLabel,
                      header: isFile,
                      file: isFile,
                      component:
                        isSourceRep &&
                        assocSourceNodeName === PCSourceTagNames.COMPONENT,
                      instance:
                        isSourceRep &&
                        assocSourceNodeName ===
                          PCSourceTagNames.COMPONENT_INSTANCE,
                      element:
                        isSourceRep &&
                        assocSourceNodeName === PCSourceTagNames.ELEMENT,
                      text:
                        isSourceRep &&
                        assocSourceNodeName === PCSourceTagNames.TEXT,
                      expanded,
                      selected: isSelected,
                      slot:
                        inspectorNode.name ===
                          InspectorTreeNodeName.SOURCE_REP &&
                        assocSourceNodeName === PCSourceTagNames.SLOT,
                      plug:
                        inspectorNode.name === InspectorTreeNodeName.CONTENT,
                      alt: inspectorNode.alt && !isSelected,
                      content:
                        inspectorNode.name === InspectorTreeNodeName.CONTENT,
                      shadow:
                        inspectorNode.name === InspectorTreeNodeName.SHADOW,
                      hover: isHovering,
                      inShadow: !isSelected && inShadow
                    })}
                    arrowProps={{
                      onClick: onArrowButtonClick
                    }}
                    labelProps={{
                      text: label
                    }}
                    style={{ paddingLeft: depth * LAYER_PADDING }}
                  />
                </div>
              )
            )}
          </FocusComponent>
          <AfterDropZone style={dropZoneStyle} inspectorNode={inspectorNode} />
          {children}
        </span>
      );
    }
  );

  return (EnhancedLayer = enhance(Base));
};
