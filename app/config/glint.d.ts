import '@glint/environment-ember-loose';

import DidInsertModifier from '@gavant/glint-template-types/types/ember-render-modifiers/did-insert';
import AndHelper from '@gavant/glint-template-types/types/ember-truth-helpers/and';
import EqHelper from '@gavant/glint-template-types/types/ember-truth-helpers/eq';
import NotHelper from '@gavant/glint-template-types/types/ember-truth-helpers/not';
import PerformHelper from '@gavant/glint-template-types/types/ember-concurrency/perform';

import Helper from '@ember/component/helper';

interface MathHelperSignature {
    Args: { Positional: [number, number] };
    Return: number;
}

interface SetHelperSignature {
  Args: { Positional: [object, string]};
  Return: () => void;
}

interface PageTitleHelperSignature {
  Args: { Positional: [string]};
  Return: void;
}

declare class MathHelper extends Helper<MathHelperSignature> {}
declare class PageTitleHelper extends Helper<PageTitleHelperSignature>{}
declare class SetHelper extends Helper<SetHelperSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    and: typeof AndHelper;
    eq: typeof EqHelper;
    not: typeof NotHelper;
    'page-title': typeof PageTitleHelper;
    perform: typeof PerformHelper;
    set: typeof SetHelper;
    sub: typeof MathHelper;
    'did-insert': typeof DidInsertModifier;
  }
}
