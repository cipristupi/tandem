import "./index.scss";
import * as React from "react";

import CenterComponent from "./center/index";
import { RootReactComponentDependency } from "sf-front-end/dependencies";

export default class RootEditorComponent extends React.Component<any, any> {
  render() {
    return (<div className="m-editor">
      <CenterComponent {...this.props} entity={this.props.app.rootEntity} zoom={1} />
    </div>);
  }
}

export const fragment = new RootReactComponentDependency(RootEditorComponent);
