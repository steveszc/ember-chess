import templateOnlyComponent from '@ember/component/template-only';
import { Color } from 'ember-chess/lib/types';

export interface IconKnightSignature {
  Element: SVGSVGElement;
  Args: {
    color: Color;
  };
  Blocks: {};
}

const IconKnightComponent = templateOnlyComponent<IconKnightSignature>();

export default IconKnightComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Icon::Knight': typeof IconKnightComponent;
    'icon/knight': typeof IconKnightComponent;
  }
}
