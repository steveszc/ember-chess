import templateOnlyComponent from '@ember/component/template-only';
import { Color } from 'ember-chess/lib/types';

export interface IconRookSignature {
  Element: SVGSVGElement;
  Args: {
    color: Color;
  };
  Blocks: {};
}

const IconRookComponent = templateOnlyComponent<IconRookSignature>();

export default IconRookComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Icon::Rook': typeof IconRookComponent;
    'icon/rook': typeof IconRookComponent;
  }
}
