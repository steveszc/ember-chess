import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PieceComponent extends Component {
  @tracked isDragging = false;
  @tracked dragImage;
  @tracked img;

  get canBeTaken() {
    return !this.args.isMyTurn && this.args.canMoveHere;
  }

  @action createDragImage(svg) {
    if (this.img) return;
    let { top, right, bottom, left } = svg.getBoundingClientRect();
    let color = window.getComputedStyle(svg).getPropertyValue('color');
    svg.style.color = color;
    let width = right - left;
    let height = bottom - top;
    let img = new Image(width, height);
    img.src = `data:image/svg+xml;utf8,${svg.outerHTML}`;
    img.style.position = 'absolute';
    img.style.bottom = '-10000px';
    this.img = img;
  }

  @action dragStart(dragEvent) {
    this.dragImage.replaceChildren(this.img);
    dragEvent.dataTransfer.setDragImage(
      this.img,
      this.img.width / 2,
      this.img.height / 2
    );
    this.isDragging = true;
    this.args.select();
  }

  @action dragEnd(dragEvent) {
    dragEvent.preventDefault();
    this.isDragging = false;
    while (this.dragImage.firstChild) {
      this.dragImage.removeChild(this.dragImage.firstChild);
    }
  }

  @action dragOver(dragEvent) {
    dragEvent.preventDefault();
    dragEvent.dataTransfer.dropEffect = 'move';
  }

  @action drop(dragEvent) {
    dragEvent.preventDefault();
    if (this.canBeTaken) this.args.moveHere();
  }
}
