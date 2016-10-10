import { ISynthetic } from "@tandem/sandbox";
import { BoundingRect, IPoint } from "@tandem/common";
import { IVisibleDOMElement, MarkupNodeType, ISyntheticDOMCapabilities } from "@tandem/synthetic-browser";

// class EntitySelectionDisplay implements IEntityDisplay {

//   readonly visible: boolean = true;

//   constructor(readonly selection: VisibleSyntheticElementCollection<IVisibleEntity>) { }

//   get position(): IPoint {
//     const bounds = this.bounds;
//     return { left: bounds.left, top: bounds.top };
//   }

//   set position(position: IPoint) {
//     const epos = this.position;
//     for (const item of this.selection) {
//       const itemDisplay = item.display;
//       const itemBounds  = itemDisplay.bounds;
//       itemDisplay.position = {
//         left: position.left + (itemBounds.left - epos.left),
//         top : position.top  + (itemBounds.top  - epos.top)
//       };
//     }
//   }



//   set bounds(nbounds: BoundingRect) {

//     const cbounds = this.bounds;
//     for (const item of this.selection) {
//       const itemDisplay = item.display;
//       const ibounds     = itemDisplay.bounds;

//       const percLeft   = (ibounds.left - cbounds.left) / cbounds.width;
//       const percTop    = (ibounds.top  - cbounds.top)  / cbounds.height;
//       const percWidth  = ibounds.width / cbounds.width;
//       const percHeight = ibounds.height / cbounds.height;

//       const left   = nbounds.left + nbounds.width * percLeft;
//       const top    = nbounds.top  + nbounds.height * percTop;
//       const right  = left + nbounds.width * percWidth;
//       const bottom = top + nbounds.height * percHeight;

//       itemDisplay.bounds = new BoundingRect(
//         left,
//         top,
//         right,
//         bottom
//       );
//     }
//   }

//   get capabilities() {
//     return DisplayCapabilities.merge(...this.selection.map((entity) => entity.display.capabilities));
//   }
// }

export class VisibleSyntheticElementCollection<T extends IVisibleDOMElement> extends Array<T> {

  constructor(...elements: Array<ISynthetic>) {
    super(...(<Array<T>><any>elements).filter((element: IVisibleDOMElement) => element.nodeType === MarkupNodeType.ELEMENT));
  }

  getBounds() {
    return BoundingRect.merge(...this.map((entity) => entity.getBoundingClientRect()));
  }

  setBounds(nbounds: BoundingRect) {

    const cbounds = this.getBounds();
    for (const item of this) {
      const ibounds     = item.getBoundingClientRect();

      const percLeft   = (ibounds.left - cbounds.left) / cbounds.width;
      const percTop    = (ibounds.top  - cbounds.top)  / cbounds.height;
      const percWidth  = ibounds.width / cbounds.width;
      const percHeight = ibounds.height / cbounds.height;

      const left   = nbounds.left + nbounds.width * percLeft;
      const top    = nbounds.top  + nbounds.height * percTop;
      const right  = left + nbounds.width * percWidth;
      const bottom = top + nbounds.height * percHeight;

      console.log(left, top, right, bottom);
      // itemDisplay.bounds = new BoundingRect(
      //   left,
      //   top,
      //   right,
      //   bottom
      // );
    }
  }

  getCapabilities(): ISyntheticDOMCapabilities {
    const capabilities = { movable: true, resizable: true };
    for (const item of this) {
      const cap = item.getCapabilities();
      for (const key in cap) {
        capabilities[key] = capabilities[key] && cap[key];
      }
    }
    return capabilities;
  }

}