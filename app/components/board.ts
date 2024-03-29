import Board from 'ember-chess/lib/board';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type { Color, GameMode, Position, Turn, PieceInstance } from 'ember-chess/lib/types';

export interface BoardSignature {
  Element: HTMLElement;
  Args: {
    board: Board;
    turnColor: Color;
    incrementTurn: (turn: Turn) => void;
    gameMode: GameMode;
  };
  Blocks: {};
}

export default class BoardComponent extends Component<BoardSignature> {
  @tracked selectedPiece?: PieceInstance;

  @action selectPiece(piece: PieceInstance) {
    if (piece.color === this.args.turnColor) {
      this.selectedPiece = piece;
    }
  }

  @action movePiece(toPosition: Position) {
    if (!this.selectedPiece?.position) return;

    let turn: Turn = {
      color: this.selectedPiece.color,
      type: this.selectedPiece.type,
      from: this.selectedPiece.position,
      to: toPosition,
    };
    this.args.board.move(this.selectedPiece.position, toPosition);
    this.selectedPiece = undefined;
    this.args.incrementTurn(turn);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Board: typeof BoardComponent;
  }
}
