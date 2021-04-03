import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Board from 'ember-chess/lib/board';
import Fen from 'ember-chess/lib/fen';

export default class GameComponent extends Component {
  @tracked board = new Board();

  @tracked turn = 1;
  @tracked turnColor = 'white';
  @tracked isShowingGuide = false;
  @tracked isShowingKey = false;
  @tracked isShowingLog = false;
  @tracked gameMode = 'tabletop'; // tabletop | pass-and-play
  @tracked previousTurnInfo = null;
  @tracked fen = null;

  @action resetGame() {
    let fen = new Fen(this.fen);
    this.board = new Board(fen);
    this.turn = fen.isValid ? fen.fullTurnCount : 1;
    this.turnColor = fen.isValid ? fen.turnColor : 'white';
    this.fen = null;
  }

  @action incrementTurn(turn) {
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
  @action setGameMode(mode) {
    this.gameMode = mode;
  }
  @action updateFen(event) {
    this.fen = event.target.value;
  }
}
