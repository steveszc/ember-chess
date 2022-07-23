import templateOnlyComponent from '@ember/component/template-only';
import { Color, Turn } from 'ember-chess/lib/types';

export interface AnnouncerSignature {
  Element: HTMLDivElement;
  Args: {
    previousTurnInfo?: Turn;
    turnColor: Color;
  };
  Blocks: {};
}

const AnnouncerComponent = templateOnlyComponent<AnnouncerSignature>();

export default AnnouncerComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Announcer: typeof AnnouncerComponent;
  }
}
