import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface EmptySpaceSignature {
  Element: HTMLButtonElement;
  Args: {
    canMoveHere: boolean;
    moveHere: () => void;
  };
  Blocks: {};
}

export default class EmptySpaceComponent extends Component<EmptySpaceSignature> {
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    EmptySpace: typeof EmptySpaceComponent;
  }
}
