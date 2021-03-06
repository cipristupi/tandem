import * as React from "react";
import * as cx from "classnames";
import * as path from "path";
import { BaseChromeProps } from "./chrome.pc";
import { Dispatch } from "redux";
import { ProjectInfo } from "../../state";
import {
  CHROME_HEADER_MOUSE_DOWN,
  CHROME_CLOSE_BUTTON_CLICKED,
  CHROME_MINIMIZE_BUTTON_CLICKED,
  CHROME_MAXIMIZE_BUTTON_CLICKED
} from "../../actions";

export type Props = {
  dispatch: Dispatch<any>;
  projectInfo: ProjectInfo;
  unsaved: boolean;
} & BaseChromeProps;

export default (Base: React.ComponentClass<BaseChromeProps>) =>
  class ChromeController extends React.PureComponent<Props> {
    onHeaderClick = (event: React.MouseEvent<any>) => {
      this.props.dispatch({ type: CHROME_HEADER_MOUSE_DOWN });
    };
    onCloseClick = (event: React.MouseEvent<any>) => {
      const { unsaved } = this.props;
      this.props.dispatch({
        type: CHROME_CLOSE_BUTTON_CLICKED,
        unsaved,
        "@@public": true
      });
      event.stopPropagation();
    };
    onMinimizeClick = (event: React.MouseEvent<any>) => {
      this.props.dispatch({
        type: CHROME_MINIMIZE_BUTTON_CLICKED,
        "@@public": true
      });
      event.stopPropagation();
    };
    onMaximizeClick = (event: React.MouseEvent<any>) => {
      this.props.dispatch({
        type: CHROME_MAXIMIZE_BUTTON_CLICKED,
        "@@public": true
      });
      event.stopPropagation();
    };
    render() {
      const { projectInfo, unsaved, ...rest } = this.props;
      const {
        onHeaderClick,
        onCloseClick,
        onMinimizeClick,
        onMaximizeClick
      } = this;

      let title: string = "";

      if (projectInfo) {
        title = path.basename(projectInfo.path);
      } else {
        title = "Welcome";
      }

      return (
        <Base
          {...rest}
          title={title}
          variant={cx({ unsaved })}
          headerProps={{
            onClick: onHeaderClick
          }}
          closeButtonProps={{
            onClick: onCloseClick
          }}
          minimizeButtonProps={{
            onClick: onMinimizeClick
          }}
          maximizeButtonProps={{
            onClick: onMaximizeClick
          }}
        />
      );
    }
  };
