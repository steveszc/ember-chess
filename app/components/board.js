import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class BoardComponent extends Component {
  @tracked selectedPiece = null;

  get turnColor() {
    return this.args.turn % 2 ? "white" : "black";
  }

  @action selectPiece(piece) {
    if (piece.color === this.args.turnColor) {
      this.selectedPiece = piece;
    }
  }

  @action movePiece(toPosition) {
    let turn = {
      color: this.selectedPiece.color,
      type: this.selectedPiece.type,
      from: this.selectedPiece.position,
      to: toPosition
    }
    this.args.board.move(this.selectedPiece.position, toPosition);
    this.selectedPiece = null;
    this.args.incrementTurn(turn);
  }
}
