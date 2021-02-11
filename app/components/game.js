import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import Board from "ember-chess/lib/board";

export default class GameComponent extends Component {
  @tracked board = new Board();

  @tracked turn = 1;
  @tracked isShowingGuide = false;
  @tracked isShowingKey = false;
  @tracked isShowingLog = false;
  @tracked isRotate = false;

  get turnColor() {
    return this.turn % 2 ? "white" : "black";
  }

  @action resetGame() {
    this.board = new Board();
  }

  @action incrementTurn() {
    this.turn++;
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
  @action toggleRotate() {
    this.isRotate = !this.isRotate;
  }
}
