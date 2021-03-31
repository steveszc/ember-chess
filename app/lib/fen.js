// https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

class FenPiece {
  #string;
  #rank;
  #file;
  constructor(string, rank, file) {
    this.#string = string;
    this.#rank = rank;
    this.#file = file;
  }
  get color() {
    return this.#string === this.#string.toUpperCase() ? 'white' : 'black';
  }
  get type() {
    let types = {
      p: 'pawn',
      r: 'rook',
      n: 'knight',
      b: 'bishop',
      q: 'queen',
      k: 'king',
    };
    return types[this.#string.toLowerCase()];
  }
  get position() {
    return `${String.fromCharCode(97 + this.#file)}${this.#rank + 1}`;
  }
}

export default class Fen {
  constructor(fenString) {
    this.fen = fenString || STARTING_FEN;
  }

  get isValid() {
    let segments = this.fen.split(' ');
    let [
      board,
      turnColor,
      castling,
      enPassant,
      halfCount,
      fullCount,
    ] = segments;
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

    let hasValidTurnColor = ['w', 'b'].includes(turnColor);
    let hasValidCastling =
      castling === '-' ||
      (castling.length <= 5 &&
        castling.length > 1 &&
        [...castling].every((char) => ['K', 'k', 'Q', 'q'].includes(char)));

    let hasValidEnPassant = enPassant === '-' || enPassant.length === 2;
    let hasValidHalfCount = !isNaN(parseInt(halfCount, 10)) && halfCount >= 0;
    let hasValidFullCount = !isNaN(parseInt(fullCount, 10)) && fullCount > 0;

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
    let ranks = this.fen.split(' ')[0];
    return ranks.split('/').reverse().map(this.rankToPieces).flat();
  }

  get turnColor() {
    let color = this.fen.split(' ')[1];
    return color === 'w' ? 'white' : 'black';
  }

  get halfTurnCount() {
    return parseInt(this.fen.split(' ')[4], 10);
  }

  get fullTurnCount() {
    return parseInt(this.fen.split(' ')[5], 10);
  }

  rankToPieces(rankString, rankIndex) {
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

    let pieces = positions.filter(Boolean);

    return pieces;
  }
}
