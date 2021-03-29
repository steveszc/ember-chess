import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SettingsComponent extends Component {
  @tracked isShowing = false;

  @action toggle(e) {
    e?.preventDefault();
    this.isShowing = !this.isShowing;
  }
}
