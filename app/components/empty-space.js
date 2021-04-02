import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class EmptySpaceComponent extends Component {
  @action dragOver(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.dataTransfer.dropEffect = 'move';
  }
  @action dragEnter(dragEvent) {
    dragEvent.preventDefault();
  }
  @action drop(dragEvent) {
    dragEvent.preventDefault();
    this.args.moveHere();
  }
}
