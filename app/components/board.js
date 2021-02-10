import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { TrackedArray } from "tracked-built-ins";
import { action } from "@ember/object";

const letterToIndex = (string) => string.charCodeAt(0) - 97;
const indexToLetter = (number) => String.fromCharCode(97 + number);

const numberToIndex = (string) => parseInt(string, 10) - 1;
const indexToNumber = (number) => `${number + 1}`;

const positionToCoord = (position) => ({
  row: numberToIndex(position[1]),
  col: letterToIndex(position[0]),
});
class Piece {
  constructor({ position, color, type }) {
    this.position = position;
    this.color = color;
    this.type = type;
  }
}

export default class BoardComponent extends Component {
  grid = new TrackedArray([...Array(8)]).map(
    () => new TrackedArray([...Array(8)])
  );

  constructor() {
    super(...arguments);
    this.startGame();
  }

  startGame() {
    this.createPiece({ position: "a1", color: "white", type: "rook" });
    this.createPiece({ position: "b1", color: "white", type: "knight" });
    this.createPiece({ position: "c1", color: "white", type: "bishop" });
    this.createPiece({ position: "d1", color: "white", type: "queen" });
    this.createPiece({ position: "e1", color: "white", type: "king" });
    this.createPiece({ position: "f1", color: "white", type: "bishop" });
    this.createPiece({ position: "g1", color: "white", type: "knight" });
    this.createPiece({ position: "h1", color: "white", type: "rook" });
    this.createPiece({ position: "a2", color: "white", type: "pawn" });
    this.createPiece({ position: "b2", color: "white", type: "pawn" });
    this.createPiece({ position: "c2", color: "white", type: "pawn" });
    this.createPiece({ position: "d2", color: "white", type: "pawn" });
    this.createPiece({ position: "e2", color: "white", type: "pawn" });
    this.createPiece({ position: "f2", color: "white", type: "pawn" });
    this.createPiece({ position: "g2", color: "white", type: "pawn" });
    this.createPiece({ position: "h2", color: "white", type: "pawn" });

    this.createPiece({ position: "a8", color: "black", type: "rook" });
    this.createPiece({ position: "b8", color: "black", type: "knight" });
    this.createPiece({ position: "c8", color: "black", type: "bishop" });
    this.createPiece({ position: "d8", color: "black", type: "queen" });
    this.createPiece({ position: "e8", color: "black", type: "king" });
    this.createPiece({ position: "f8", color: "black", type: "bishop" });
    this.createPiece({ position: "g8", color: "black", type: "knight" });
    this.createPiece({ position: "h8", color: "black", type: "rook" });
    this.createPiece({ position: "a7", color: "black", type: "pawn" });
    this.createPiece({ position: "b7", color: "black", type: "pawn" });
    this.createPiece({ position: "c7", color: "black", type: "pawn" });
    this.createPiece({ position: "d7", color: "black", type: "pawn" });
    this.createPiece({ position: "e7", color: "black", type: "pawn" });
    this.createPiece({ position: "f7", color: "black", type: "pawn" });
    this.createPiece({ position: "g7", color: "black", type: "pawn" });
    this.createPiece({ position: "h7", color: "black", type: "pawn" });
  }

  createPiece({ position, color, type }) {
    let { row, col } = positionToCoord(position);

    this.grid[row][col] = new Piece({ position, color, type });
  }

  @tracked selectedPiece = null;

  @action selectPiece(piece) {
    this.selectedPiece = piece;
  }

  @action movePiece(toPosition) {
    let from = positionToCoord(this.selectedPiece.position);
    let to = positionToCoord(toPosition);
    this.selectedPiece.position = toPosition;
    this.grid[from.row][from.col] = null;
    this.grid[to.row][to.col] = this.selectedPiece;

    this.selectedPiece = null;
  }
}
