import Component from "@glimmer/component";

export default class PieceComponent extends Component {
  get isNotMyTurn() {
    if (this.args.piece.color === "black" && this.args.turn % 2) return true;
    if (this.args.piece.color === "white" && !(this.args.turn % 2)) return true;

    return false;
  }

  get canBeTaken() {
    if (this.args.selectedPiece && this.isNotMyTurn) {
      return this.args.selectedPiece.availablePositions.includes(
        this.args.piece.position
      );
    }
  }
}
