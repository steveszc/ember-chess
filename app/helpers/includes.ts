import { helper } from '@ember/component/helper';

const includes = helper(function includes(
  [array, item]: [Array<unknown> | undefined, unknown] /*, hash*/
) {
  return array?.includes?.(item) ?? false;
});

export default includes;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    includes: typeof includes;
  }
}
