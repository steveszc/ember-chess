import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type { PieceInstance } from 'ember-chess/lib/types';

export interface PieceSignature {
  Element: HTMLDivElement;
  Args: {
    canMoveHere: boolean;
    isFlipped: boolean;
    isMyTurn: boolean;
    piece: PieceInstance;
    moveHere: () => void;
    select: () => void;
  };
  Blocks: {};
}

export default class PieceComponent extends Component<PieceSignature> {
  @tracked isDragging = false;
  @tracked isTouch = false;
  @tracked dragImage?: HTMLElement; // set from template did-insert
  @tracked img?: HTMLImageElement;
  @tracked imgFlipped?: HTMLImageElement;

  get canBeTaken() {
    return !this.args.isMyTurn && this.args.canMoveHere;
  }

  @action createDragImages(svg: SVGSVGElement) {
    this.createDragImage(svg);
    this.createFlippedDragImage(svg);
  }

  @action createDragImage(svg: SVGSVGElement) {
    if (this.img) return;

    let { top, right, bottom, left } = svg.getBoundingClientRect();
    let img = new Image(right - left, bottom - top);
    let el = svg.cloneNode(true) as SVGElement;
    el.style.color = window.getComputedStyle(svg).getPropertyValue('color');
    img.style.position = 'absolute';
    img.style.bottom = '-10000px';
    img.src = `data:image/svg+xml;utf8,${el.outerHTML}`;
    this.img = img;
  }

  @action createFlippedDragImage(svg: SVGSVGElement) {
    if (this.imgFlipped) return;

    let { top, right, bottom, left } = svg.getBoundingClientRect();
    let img = new Image(right - left, bottom - top);
    let el = svg.cloneNode(true) as SVGElement;
    el.style.color = window.getComputedStyle(svg).getPropertyValue('color');
    [...el.children].forEach((child) =>
      child.setAttribute(
        'transform',
        `rotate(180,${svg.viewBox.baseVal.width / 2},${
          svg.viewBox.baseVal.height / 2
        })`
      )
    );

    img.style.position = 'absolute';
    img.style.bottom = '-10000px';
    img.src = `data:image/svg+xml;utf8,${el.outerHTML}`;
    this.imgFlipped = img;
  }

  @action touchStart() {
    this.isTouch = true;
  }

  @action dragStart(dragEvent: DragEvent) {
    let dragImage = this.args.isFlipped ? this.imgFlipped : this.img;

    if (dragImage) {
      this.dragImage?.replaceChildren(dragImage);

      dragEvent.dataTransfer?.setDragImage(
        dragImage,
        this.isTouch ? 0 : dragImage.width / 2,
        this.isTouch
          ? dragImage.height / (this.args.isFlipped ? 2 : -2)
          : dragImage.height * (this.args.isFlipped ? 0.33 : 0.66)
      );
    }
    this.isDragging = true;
    this.args.select();
  }

  @action dragEnd(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    this.isDragging = false;
    while (this.dragImage?.firstChild) {
      this.dragImage.removeChild(this.dragImage.firstChild);
    }
  }

  @action dragOver(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    if (dragEvent.dataTransfer) {
      dragEvent.dataTransfer.dropEffect = 'move';
    }
  }

  @action dragEnter(dragEvent: DragEvent) {
    dragEvent.preventDefault();
  }

  @action drop(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    if (this.canBeTaken) this.args.moveHere();
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Piece: typeof PieceComponent;
  }
}
