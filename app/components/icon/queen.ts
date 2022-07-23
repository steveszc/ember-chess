import templateOnlyComponent from '@ember/component/template-only';
import { Color } from 'ember-chess/lib/types';

export interface IconQueenSignature {
  Element: SVGSVGElement;
  Args: {
    color: Color;
  };
  Blocks: {};
}

const IconQueenComponent = templateOnlyComponent<IconQueenSignature>();

export default IconQueenComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Icon::Queen': typeof IconQueenComponent;
    'icon/queen': typeof IconQueenComponent;
  }
}
