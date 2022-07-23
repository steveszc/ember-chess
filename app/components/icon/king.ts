import templateOnlyComponent from '@ember/component/template-only';
import { Color } from 'ember-chess/lib/types';

export interface IconKingSignature {
  Element: SVGSVGElement;
  Args: {
    color: Color;
  };
  Blocks: {};
}

const IconKingComponent = templateOnlyComponent<IconKingSignature>();

export default IconKingComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Icon::King': typeof IconKingComponent;
    'icon/king': typeof IconKingComponent;
  }
}
