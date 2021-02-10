import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import Board from "ember-chess/lib/board";

export default class GameComponent extends Component {
  board = new Board();

  @tracked turn = 1;

  @action incrementTurn() {
    this.turn++;
  }
}
