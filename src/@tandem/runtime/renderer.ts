import { Action } from "@tandem/common";
import { Browser } from "./browser";
import { WrapBus } from "mesh";
import { SyntheticAction } from "./actions";
import { BoundingRect, watchProperty } from "@tandem/common";
import { SyntheticElement, BaseSyntheticNodeComponent } from "./synthetic";

export interface ISyntheticDocumentRenderer {
  readonly element: HTMLElement;
}

export abstract class BaseRenderer implements ISyntheticDocumentRenderer {

  readonly element: HTMLElement;

  constructor(readonly browser: Browser) {
    watchProperty(browser, "documentComponent", this.onDocumentComponentChange.bind(this));
    this.element = document.createElement("div");
  }

  protected onDocumentComponentChange(newDocumentComponent: BaseSyntheticNodeComponent<any>) {
    this.update();
  }


  // TODO
  get rectangles(): Array<any> {
    return [];
  }

  protected abstract update();
}

export class DOMRenderer extends BaseRenderer {

  private _rectangles: BoundingRect[];

  get rectangles(): BoundingRect[] {
    return this._rectangles;
  }

  update() {
    // simple for now -- just reset the entire outer HTML
    this.element.innerHTML = this.browser.documentComponent.outerHTML;

    const rectangles: BoundingRect[] = [];
    for (const node of this.element.querySelectorAll("*")) {
      const rect = node.getBoundingClientRect();
      rectangles.push(new BoundingRect(rect.left, rect.top, rect.right, rect.bottom));
    }

    this._rectangles = rectangles;
  }
}