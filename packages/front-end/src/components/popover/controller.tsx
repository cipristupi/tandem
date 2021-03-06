import * as React from "react";
import * as ReactDOM from "react-dom";
import { Bounds, shiftBounds, shiftPoint } from "tandem-common";
import { BasePopoverProps } from "./view.pc";

export type Props = {
  open: boolean;
  anchorRect?: Bounds;
  onShouldClose: any;
} & BasePopoverProps;

type PopoverState = {
  anchorRect: Bounds;
};

export default (Base: React.ComponentClass<BasePopoverProps>) => {
  return class Popover extends React.PureComponent<Props, PopoverState> {
    constructor(props) {
      super(props);
      this.state = {
        anchorRect: null
      };
    }
    componentWillUpdate({ open }: Props) {
      if (!this.props.open && open) {
        const anchor: HTMLDivElement = ReactDOM.findDOMNode(
          this as any
        ) as HTMLDivElement;
        const rect = getRealElementBounds(anchor);
        this.setState({ anchorRect: rect });
      } else if (!open) {
        this.setState({ anchorRect: null });
      }
    }
    render() {
      const { open, onShouldClose, ...rest } = this.props;
      const { anchorRect } = this.state;

      let overrideProps: BasePopoverProps = {};

      if (anchorRect) {
        overrideProps = {
          contentProps: {
            onShouldClose,
            anchorRect,
            style: {
              display: "block",
              position: "fixed"
            }
          }
        };
      }

      return <Base {...rest} {...overrideProps} />;
    }
  };
};

const getRealElementBounds = (element: HTMLElement) => {
  const parentIframes = [];

  let current = element;
  while (1) {
    const ownerDocument = current.ownerDocument;
    if (ownerDocument === document) {
      break;
    }
    const iframe = Array.prototype.find.call(
      ownerDocument.defaultView.parent.document.querySelectorAll("iframe"),
      (iframe: HTMLIFrameElement) => {
        return iframe.contentDocument === ownerDocument;
      }
    );

    current = iframe;
    parentIframes.push(iframe);
  }

  const offset = parentIframes.reduce(
    (point, iframe) => shiftPoint(point, iframe.getBoundingClientRect()),
    { left: 0, top: 0 }
  );

  return shiftBounds(element.getBoundingClientRect(), offset);
};
