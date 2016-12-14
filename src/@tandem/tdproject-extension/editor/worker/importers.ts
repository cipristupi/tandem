import assert = require("assert");
import path =  require("path");
import { SyntheticDOMElement, SyntheticWindow } from "@tandem/synthetic-browser";
import { URIProtocolProvider, ApplyFileEditRequest } from "@tandem/sandbox";
import { IFileImporter, ImportFileRequest, PreviewLoaderProvider, OpenFileRequest } from "@tandem/editor/worker";
import { Injector, InjectorProvider, PrivateBusProvider, IBrokerBus, inject, BoundingRect } from "@tandem/common";

export interface IPreviewConfig {
  renderFunction: string;
  title: string;
  dependencyGraph: {
    strategy: string;
  }
}

// TODO - open new workspace if dnd file is .tdm mime type
export class TDRootFileImporter implements IFileImporter {

  @inject(InjectorProvider.ID)
  private _injector: Injector;

  @inject(PrivateBusProvider.ID)
  private _bus: IBrokerBus;

  async importFile({ uri, targetObject, bounds }: ImportFileRequest) {

    // TODO: temporary fix for DNDd files
    uri = uri.replace(/^file:\/\//g, "");

    let { type, content } = await URIProtocolProvider.lookup(uri, this._injector).read(uri);

    content = String(content);

    const element = <SyntheticDOMElement>targetObject;

    if (content.indexOf("createBodyElement") !== -1) {
      return this.importPreview(uri, element, bounds);
    }

    const previewLoader = PreviewLoaderProvider.find(uri, this._injector);

    if (!previewLoader) {
      throw new Error(`Cannot create preview file`);
    }

    const preview = await previewLoader.loadFilePreview(arguments[0]);

    const previewURIProtocol = URIProtocolProvider.lookup(preview.uri, this._injector);

    if (!(await previewURIProtocol.fileExists(preview.uri))) {
      await previewURIProtocol.write(preview.uri, preview.content);
      await this._bus.dispatch(new OpenFileRequest(preview.uri));
    }

    return this.importPreview(preview.uri, element, bounds);
  }

  private async importPreview(uri: string, element: SyntheticDOMElement, bounds: BoundingRect) {

    if (!bounds) bounds = new BoundingRect(0, 0, 1024, 768);

    const { document } = new SyntheticWindow();
    const artboard = document.createElement("artboard");
    artboard.setAttribute("title", path.relative(process.cwd(), uri));
    artboard.setAttribute("src", uri);
    artboard.setAttribute("style", `left:${bounds.left}px;top:${bounds.top}px;width:${bounds.width || 1024}px;height:${bounds.height || 768}px;`);

    const edit = element.createEdit();
    edit.appendChild(artboard);

    this._bus.dispatch(new ApplyFileEditRequest(edit.mutations, true));
  }

}