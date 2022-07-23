import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { GameMode } from 'ember-chess/lib/types';

export interface SettingsSignature {
  Element: HTMLDivElement;
  Args: {
    fen: string;
    gameMode: GameMode;
    isShowingKey: boolean;
    isShowingGuide: boolean;
    isShowingLog: boolean;
    setGameMode: (mode: GameMode) => void;
    resetGame: () => void;
    toggleGuide: () => void;
    toggleLog: () => void;
    toggleKey: () => void;
    updateFen: (event: Event) => void;
  };
  Blocks: {};
}

export default class SettingsComponent extends Component<SettingsSignature> {
  @tracked isShowing = false;

  @action toggle(e?: Event) {
    e?.preventDefault();
    this.isShowing = !this.isShowing;
  }

  @action startNewGame() {
    this.args.resetGame();
    this.toggle();
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Settings: typeof SettingsComponent;
  }
}
