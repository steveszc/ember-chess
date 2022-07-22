import Component from '@glimmer/component';
import { action } from '@ember/object';

interface Args {
  canMoveHere: boolean;
  moveHere: () => void;
}

export default class EmptySpaceComponent extends Component<Args> {
  @action dragOver(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    if (dragEvent.dataTransfer) {
      dragEvent.dataTransfer.dropEffect = 'move';
    }
  }
  @action dragEnter(dragEvent: DragEvent) {
    dragEvent.preventDefault();
  }
  @action drop(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    this.args.moveHere();
  }
}
