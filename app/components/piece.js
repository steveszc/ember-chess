import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class PieceComponent extends Component {
  get canBeTaken() {
    return !this.args.isMyTurn && this.args.canMoveHere;
  }

  @action dragStart(dragEvent) {
    let svg = dragEvent.srcElement.querySelector("svg");
    let { top, right, bottom, left } = svg.getBoundingClientRect();
    let color = window.getComputedStyle(svg).getPropertyValue("color");
    svg.style.color = color;
    let img = new Image(right - left, bottom - top);
    img.src = `data:image/svg+xml;utf8,${svg.outerHTML}`;
    img.style.position = "absolute";
    img.style.bottom = "-1000px";
    img.classList.add("drag-image");
    document.body.appendChild(img);

    dragEvent.dataTransfer.setDragImage(img, 25, 25);

    this.isDragging = true;
    this.args.select();
  }
  @action dragEnd(dragEvent) {
    dragEvent.preventDefault();
    document.querySelector(".drag-image")?.remove();
  }
  @action dragOver(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.dataTransfer.dropEffect = "move";
  }
  @action drop(dragEvent) {
    dragEvent.preventDefault();
    if (this.canBeTaken) this.args.moveHere();
    document.querySelector(".drag-image")?.remove();
  }
}
