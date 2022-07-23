import templateOnlyComponent from '@ember/component/template-only';

export interface IconGearSignature {
  Element: SVGSVGElement;
  Args: {};
  Blocks: {};
}

const IconGearComponent = templateOnlyComponent<IconGearSignature>();

export default IconGearComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Icon::Gear': typeof IconGearComponent;
    'icon/gear': typeof IconGearComponent;
  }
}
