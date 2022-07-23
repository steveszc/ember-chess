import type { Color, Col, Row, Position, Move, PieceType } from 'ember-chess/lib/types';
import type Board from 'ember-chess/lib/board';

export default abstract class Piece {
  constructor({ color, board }: { color: Color; board: Board; }) {
    this.color = color;
    this.board = board;
  }

  abstract type: PieceType;

  color: Color;
  protected board: Board;

  protected hasRecursiveMoves = false;
  protected moves: Move[] = [];
  #positions: Array<Position | undefined> = [];
  #position?: Position;

  get position() {
    return this.#position;
  }

  set position(val) {
    this.#position = val;
    this.#positions.push(val);
  }

  protected get isFirstMove() {
    return this.#positions.length === 1;
  }

  protected forward(position: Position): Position {
    let col = position[0] as Col;
    let row = position[1] as Row;

    let rowInt = parseInt(row, 10);
    let rowChange = this.color === 'white' ? 1 : -1;
    let newRow = `${rowInt + rowChange}` as Row;

    return `${col}${newRow}`;
  }

  protected back(position: Position): Position {
    let col = position[0] as Col;
    let row = position[1] as Row;

    let rowInt = parseInt(row, 10);
    let rowChange = this.color === 'white' ? -1 : 1;
    let newRow = `${rowInt + rowChange}` as Row;

    return `${col}${newRow}`;
  }

  protected right(position: Position): Position {
    let col = position[0] as Col;
    let row = position[1] as Row;

    let colInt = col.charCodeAt(0);
    let colChange = this.color === 'white' ? -1 : 1;
    let newCol = String.fromCharCode(colInt + colChange) as Col;

    return `${newCol}${row}`;
  }

  protected left(position: Position): Position {
    let col = position[0] as Col;
    let row = position[1] as Row;

    let colInt = col.charCodeAt(0);
    let colChange = this.color === 'white' ? 1 : -1;
    let newCol = String.fromCharCode(colInt + colChange) as Col;

    return `${newCol}${row}`;
  }

  private getPositions(move: Move): Position[] {
    if (!this.position) return [];

    let positions: Position[] = [];
    let position = this.position;

    do {
      let newPosition = move(position);
      let isOnBoard = this.board.isPositionOnBoard(newPosition);
      let pieceAtPosition = this.board.getPosition(newPosition);
      let canMoveToNewPosition = !pieceAtPosition || pieceAtPosition.color !== this.color

      if (isOnBoard && canMoveToNewPosition) {
        positions.push(newPosition);
        position = newPosition;
      }

      if (!isOnBoard || pieceAtPosition) break;
    } while (this.hasRecursiveMoves);

    return positions;
  }

  get availablePositions() {
    return this.moves.map((move) => this.getPositions(move)).flat();
  }
}
