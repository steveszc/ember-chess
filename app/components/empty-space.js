import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class EmptySpaceComponent extends Component {
  get canMoveToSpace() {
    if (!this.args.selectedPiece) return false;

    return this.args.selectedPiece.availablePositions.includes(
      this.args.position
    );
  }
  @action dragOver(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.dataTransfer.dropEffect = "move";
  }
  @action drop(dragEvent) {
    dragEvent.preventDefault();
    document.querySelector(".drag-image").remove();
    this.args.move();
  }
}
