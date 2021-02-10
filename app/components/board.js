import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { TrackedArray } from "tracked-built-ins";
import { action } from "@ember/object";
import {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
} from "ember-chess/lib/pieces";

const letterToIndex = (string) => string.charCodeAt(0) - 97;
const indexToLetter = (number) => String.fromCharCode(97 + number);

const numberToIndex = (string) => parseInt(string, 10) - 1;
const indexToNumber = (number) => `${number + 1}`;

const positionToCoord = (position) => ({
  row: numberToIndex(position[1]),
  col: letterToIndex(position[0]),
});

export default class BoardComponent extends Component {
  grid = new TrackedArray([...Array(8)]).map(
    () => new TrackedArray([...Array(8)])
  );

  constructor() {
    super(...arguments);
    this.startGame();
  }

  startGame() {
    let color = "white";
    this.createPiece(Rook, { position: "a1", color });
    this.createPiece(Knight, { position: "b1", color });
    this.createPiece(Bishop, { position: "c1", color });
    this.createPiece(Queen, { position: "d1", color });
    this.createPiece(King, { position: "e1", color });
    this.createPiece(Bishop, { position: "f1", color });
    this.createPiece(Knight, { position: "g1", color });
    this.createPiece(Rook, { position: "h1", color });
    this.createPiece(Pawn, { position: "a2", color });
    this.createPiece(Pawn, { position: "b2", color });
    this.createPiece(Pawn, { position: "c2", color });
    this.createPiece(Pawn, { position: "d2", color });
    this.createPiece(Pawn, { position: "e2", color });
    this.createPiece(Pawn, { position: "f2", color });
    this.createPiece(Pawn, { position: "g2", color });
    this.createPiece(Pawn, { position: "h2", color });

    color = "black";
    this.createPiece(Rook, { position: "a8", color });
    this.createPiece(Knight, { position: "b8", color });
    this.createPiece(Bishop, { position: "c8", color });
    this.createPiece(Queen, { position: "d8", color });
    this.createPiece(King, { position: "e8", color });
    this.createPiece(Bishop, { position: "f8", color });
    this.createPiece(Knight, { position: "g8", color });
    this.createPiece(Rook, { position: "h8", color });
    this.createPiece(Pawn, { position: "a7", color });
    this.createPiece(Pawn, { position: "b7", color });
    this.createPiece(Pawn, { position: "c7", color });
    this.createPiece(Pawn, { position: "d7", color });
    this.createPiece(Pawn, { position: "e7", color });
    this.createPiece(Pawn, { position: "f7", color });
    this.createPiece(Pawn, { position: "g7", color });
    this.createPiece(Pawn, { position: "h7", color });
  }

  createPiece(Piece, { position, color }) {
    let { row, col } = positionToCoord(position);
    let board = this.grid;

    this.grid[row][col] = new Piece({ position, color, board });
  }

  @tracked selectedPiece = null;

  @action selectPiece(piece) {
    if (piece.color === "black" && this.args.turn % 2) return;
    if (piece.color === "white" && !(this.args.turn % 2)) return;
    this.selectedPiece = piece;
  }

  @action movePiece(toPosition) {
    let from = positionToCoord(this.selectedPiece.position);
    let to = positionToCoord(toPosition);
    this.selectedPiece.position = toPosition;
    this.grid[from.row][from.col] = null;
    this.grid[to.row][to.col] = this.selectedPiece;
    this.selectedPiece = null;
    this.args.incrementTurn();
  }
}
