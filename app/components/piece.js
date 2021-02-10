import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class PieceComponent extends Component {
  get isMyTurn() {
    if (this.args.piece.color === "black" && !(this.args.turn % 2)) return true;
    if (this.args.piece.color === "white" && this.args.turn % 2) return true;
  }
  get isNotMyTurn() {
    return !this.isMyTurn;
  }

  get canBeTaken() {
    if (this.args.selectedPiece && this.isNotMyTurn) {
      return this.args.selectedPiece.availablePositions.includes(
        this.args.piece.position
      );
    }
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
    this.args.select(this.args.piece);
  }
  @action dragEnd(dragEvent) {
    document.querySelector(".drag-image").remove();
  }
  @action dragOver(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.dataTransfer.dropEffect = "move";
  }
  @action drop(dragEvent) {
    dragEvent.preventDefault();
    if (this.canBeTaken) this.args.move();
    document.querySelector(".drag-image").remove();
  }
}
