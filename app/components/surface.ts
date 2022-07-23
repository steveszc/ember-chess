import templateOnlyComponent from '@ember/component/template-only';
import { Color, GameMode } from 'ember-chess/lib/types';

export interface SurfaceSignature {
  Element: HTMLDivElement;
  Args: {
    gameMode: GameMode;
    isShowingKey: boolean;
    isShowingGuide: boolean;
    turn: number;
    turnColor: Color;
  };
  Blocks: {
    default: [];
  };
}

const SurfaceComponent = templateOnlyComponent<SurfaceSignature>();

export default SurfaceComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Surface: typeof SurfaceComponent;
  }
}
