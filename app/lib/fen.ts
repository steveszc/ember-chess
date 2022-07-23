// https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
import type { Color, Col, Row, Position, PieceKey } from 'ember-chess/lib/types';

import { pieces } from 'ember-chess/lib/pieces';

type FenPieceString = PieceKey | Uppercase<PieceKey>;

class FenPiece {
  #string;
  #rank;
  #file;
  constructor(string: FenPieceString , rank: number, file: number) {
    this.#string = string;
    this.#rank = rank;
    this.#file = file;
  }

  get color(): Color {
    return this.#string === this.#string.toUpperCase() ? 'white' : 'black';
  }

  get type() {
    let key = this.#string.toLowerCase() as PieceKey;
    return pieces[key];
  }

  get position(): Position {
    let col = String.fromCharCode(97 + this.#file) as Col;
    let row = `${8 - this.#rank}` as Row;
    return `${col}${row}`;
  }
}

export default class Fen {
  fen;
  constructor(fenString: string = STARTING_FEN) {
    this.fen = fenString;
  }

  get isValid() {
    let segments = this.fen.split(' ');
    let [board, turnColor, castling, enPassant, halfCount, fullCount] =
      segments;

    if (!board || !turnColor || !castling || !enPassant || !halfCount || !fullCount ) return false;

    let ranks = board.split('/');

    let hasFenWith6SpaceDelimitedSegments = segments.length === 6;
    let hasBoardWith8SlashDelimitedRanks = ranks.length === 8;
    let hasRanksWith8Positions = ranks.every((rank) => {
      let count = rank
        .split('')
        .map((value) => {
          let int = parseInt(value, 10);
          return isNaN(int) ? 1 : int;
        })
        .reduce((a, b) => a + b, 0);
      return count === 8;
    });

    let hasValidTurnColor = turnColor && ['w', 'b'].includes(turnColor);
    let hasValidCastling =
      castling === '-' ||
      (castling.length <= 5 &&
        castling.length > 1 &&
        [...castling].every((char) => ['K', 'k', 'Q', 'q'].includes(char)));

    let hasValidEnPassant = enPassant === '-' || enPassant.length === 2;
    let halfCountNum = parseInt(halfCount, 10);
    let fullCountNum = parseInt(fullCount, 10);
    let hasValidHalfCount = !isNaN(halfCountNum) && halfCountNum >= 0;
    let hasValidFullCount = !isNaN(fullCountNum) && fullCountNum > 0;

    return (
      hasFenWith6SpaceDelimitedSegments &&
      hasBoardWith8SlashDelimitedRanks &&
      hasRanksWith8Positions &&
      hasValidTurnColor &&
      hasValidCastling &&
      hasValidEnPassant &&
      hasValidHalfCount &&
      hasValidFullCount
    );
  }

  get pieces() {
    let ranks = this.fen.split(' ')[0] ?? '';
    return ranks.split('/').map(this.rankToPieces).flat();
  }

  get turnColor(): Color {
    let color = this.fen.split(' ')[1];
    return color === 'w' ? 'white' : 'black';
  }

  get halfTurnCount() {
    let str = this.fen.split(' ')[4] ?? '';
    return parseInt(str, 10);
  }

  get fullTurnCount() {
    let str = this.fen.split(' ')[5] ?? '';
    return parseInt(str, 10);
  }

  rankToPieces(rankString: string, rankIndex: number) {
    let values = rankString.split('');

    let fullRank = values
      .map((value) => {
        let maybeNumber = parseInt(value, 10);
        return isNaN(maybeNumber) ? value : [...Array(maybeNumber)];
      })
      .flat();

    let positions = fullRank.map((value, fileIndex) => {
      if (value) {
        return new FenPiece(value, rankIndex, fileIndex);
      }
    });

    let pieces = positions.filter((position): position is FenPiece => typeof position !== 'undefined');

    return pieces;
  }
}
