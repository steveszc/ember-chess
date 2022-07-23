import type { PieceType } from 'ember-chess/lib/pieces';

export type Color = 'white' | 'black';
export type Col = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'h' | 'g';
export type Row = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type Position = `${Col}${Row}`;
export type Move = (position: Position) => Position;
export type Coord = {
  row: number;
  col: number;
}
export type GameMode = 'pass-and-play' | 'tabletop';

export type Turn = {
  color: Color;
  type: PieceType;
  from: Position;
  to: Position;
};

export type { PieceType, PieceKey, PieceInstance } from 'ember-chess/lib/pieces';
