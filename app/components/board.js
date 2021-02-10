import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

import Board from "ember-chess/lib/board";

export default class BoardComponent extends Component {
  constructor() {
    super(...arguments);
    this.board = new Board();
  }

  @tracked selectedPiece = null;

  @action selectPiece(piece) {
    if (piece.color === "black" && this.args.turn % 2) return;
    if (piece.color === "white" && !(this.args.turn % 2)) return;
    this.selectedPiece = piece;
  }

  @action movePiece(toPosition) {
    this.board.move(this.selectedPiece.position, toPosition);
    this.selectedPiece = null;
    this.args.incrementTurn();
  }
}
