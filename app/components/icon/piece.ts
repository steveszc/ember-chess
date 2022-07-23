import templateOnlyComponent from '@ember/component/template-only';
import { Color, PieceType } from 'ember-chess/lib/types';

export interface IconPieceSignature {
  Element: SVGSVGElement;
  Args: {
    color: Color;
    type: PieceType;
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
