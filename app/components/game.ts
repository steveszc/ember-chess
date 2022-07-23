import Component from '@glimmer/component';
import Board from 'ember-chess/lib/board';
import Fen from 'ember-chess/lib/fen';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

import { Color, GameMode, Turn } from 'ember-chess/lib/types';

interface Args {}

export default class GameComponent extends Component<Args> {
  @tracked board = new Board(new Fen());

  @tracked turn = 1;
  @tracked turnColor: Color = 'white';
  @tracked isShowingGuide = false;
  @tracked isShowingKey = false;
  @tracked isShowingLog = false;
  @tracked gameMode: GameMode = 'tabletop';
  @tracked previousTurnInfo?: Turn;
  @tracked fen?: string;

  @action resetGame() {
    let fen = new Fen(this.fen);
    this.board = new Board(fen);
    this.turn = fen.isValid ? fen.fullTurnCount : 1;
    this.turnColor = fen.isValid ? fen.turnColor : 'white';
    this.fen = undefined;
  }

  @task
  *incrementTurn(turn: Turn) {
    yield timeout(500);

    if (this.turnColor === 'black') {
      this.turn++;
      this.turnColor = 'white';
    } else {
      this.turnColor = 'black';
    }
    this.previousTurnInfo = turn;
  }

  @action toggleGuide() {
    this.isShowingGuide = !this.isShowingGuide;
  }

  @action toggleKey() {
    this.isShowingKey = !this.isShowingKey;
  }

  @action toggleLog() {
    this.isShowingLog = !this.isShowingLog;
  }

  @action setGameMode(mode: GameMode) {
    this.gameMode = mode;
  }

  @action updateFen(event: Event) {
    const target = event.target as HTMLInputElement;
    const { value } = target;

    this.fen = value;
  }
}
