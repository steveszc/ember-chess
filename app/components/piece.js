import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class PieceComponent extends Component {
  @tracked isDragging = false;

  get canBeTaken() {
    return !this.args.isMyTurn && this.args.canMoveHere;
  }

  createDragImage(dragEvent) {
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
  }

  removeDragImage() {
    document.querySelector(".drag-image")?.remove();
  }

  @action dragStart(dragEvent) {
    this.createDragImage(dragEvent)
    this.isDragging = true;
    this.args.select();
  }

  @action dragEnd(dragEvent) {
    dragEvent.preventDefault();
    this.removeDragImage();
    this.isDragging = false;
  }

  @action dragOver(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.dataTransfer.dropEffect = "move";
  }

  @action drop(dragEvent) {
    dragEvent.preventDefault();
    if (this.canBeTaken) this.args.moveHere();
    this.removeDragImage();
  }
}
