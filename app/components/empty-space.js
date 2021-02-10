import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class EmptySpaceComponent extends Component {
  @action dragOver(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.dataTransfer.dropEffect = "move";
  }
  @action drop(dragEvent) {
    dragEvent.preventDefault();
    document.querySelector(".drag-image").remove();
    this.args.moveHere();
  }
}
