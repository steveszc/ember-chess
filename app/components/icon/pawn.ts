import templateOnlyComponent from '@ember/component/template-only';
import { Color } from 'ember-chess/lib/types';

export interface IconPawnSignature {
  Element: SVGSVGElement;
  Args: {
    color: Color;
  };
  Blocks: {};
}

const IconPawnComponent = templateOnlyComponent<IconPawnSignature>();

export default IconPawnComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Icon::Pawn': typeof IconPawnComponent;
    'icon/pawn': typeof IconPawnComponent;
  }
}
