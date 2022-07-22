import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface Args {
  fen: string;
  gameMode: 'pass-and-play' | 'tabletop';
  isShowingKey: boolean;
  isShowingGuide: boolean;
  isShowingLog: boolean;
  setGameMode: () => void;
  resetGame: () => void;
  toggleGuide: () => void;
  toggleLog: () => void;
  toggleKey: () => void;
  updateFen: () => void;
}

export default class SettingsComponent extends Component<Args> {
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
