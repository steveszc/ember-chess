import templateOnlyComponent from '@ember/component/template-only';
import { Color } from 'ember-chess/lib/types';

export interface IconPieceSignature {
  Element: SVGSVGElement;
  Args: {
    color: Color;
  };
  Blocks: {};
}

const IconPieceComponent = templateOnlyComponent<IconPieceSignature>();

export default IconPieceComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Icon::Piece': typeof IconPieceComponent;
    'icon/Piece': typeof IconPieceComponent;
  }
}
