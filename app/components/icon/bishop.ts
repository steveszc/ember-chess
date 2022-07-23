import templateOnlyComponent from '@ember/component/template-only';
import { Color } from 'ember-chess/lib/types';

export interface IconBishopSignature {
  Element: SVGSVGElement;
  Args: {
    color: Color;
  };
  Blocks: {};
}

const IconBishopComponent = templateOnlyComponent<IconBishopSignature>();

export default IconBishopComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Icon::Bishop': typeof IconBishopComponent;
    'icon/bishop': typeof IconBishopComponent;
  }
}
