import templateOnlyComponent from '@ember/component/template-only';
import { Color, PieceInstance } from 'ember-chess/lib/types';

export interface SideSignature {
  Element: HTMLDivElement;
  Args: {
    color: Color;
    capturedPieces: PieceInstance[];
  };
  Blocks: {};
}

const SideComponent = templateOnlyComponent<SideSignature>();

export default SideComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Side: typeof SideComponent;
  }
}
