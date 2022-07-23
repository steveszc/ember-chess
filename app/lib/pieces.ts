import Pawn from 'ember-chess/lib/pieces/pawn';
import Rook from 'ember-chess/lib/pieces/rook';
import Knight from 'ember-chess/lib/pieces/knight';
import Bishop from 'ember-chess/lib/pieces/bishop';
import Queen from 'ember-chess/lib/pieces/queen';
import King from 'ember-chess/lib/pieces/king';

export const pieceClasses = {
  pawn: Pawn,
  rook: Rook,
  knight: Knight,
  bishop: Bishop,
  queen: Queen,
  king: King,
} as const;

export const pieces = {
  p: 'pawn',
  r: 'rook',
  n: 'knight',
  b: 'bishop',
  q: 'queen',
  k: 'king',
} as const;

export type PieceInstance = Pawn | Rook | Knight | Bishop | Queen | King;
export type PieceKey = keyof typeof pieces;
export type PieceType = typeof pieces[PieceKey];
