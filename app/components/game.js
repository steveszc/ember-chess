import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import move from "ember-animated/motions/move";
import { action } from "@ember/object";

export default class GameComponent extends Component {
  @tracked turn = 1;

  @action incrementTurn() {
    this.turn++;
  }

  *transition({ receivedSprites }) {
    receivedSprites.forEach((sprite) => {
      sprite.applyStyles({ "z-index": "1" });
      move(sprite);
    });
  }
}
