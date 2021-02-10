import Component from "@glimmer/component";

export default class EmptySpaceComponent extends Component {
  get canMoveToSpace() {
    if (!this.args.selectedPiece) return false;

    return this.args.selectedPiece.availablePositions.includes(
      this.args.position
    );
  }
}
