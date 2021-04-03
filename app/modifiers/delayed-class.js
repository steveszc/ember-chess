import Modifier from 'ember-modifier';
import { restartableTask, timeout } from 'ember-concurrency';

// <div {{delayed-class "myClass" 500}}>

export default class DelayedClassModifier extends Modifier {
  classesToRemove = null;

  didReceiveArguments() {
    this.setClassAfterDelay.perform();
  }

  @restartableTask
  *setClassAfterDelay() {
    let [classes, delay] = this.args.positional;
    let classesToAdd = classes.split(' ');

    yield timeout(delay);

    if (this.classesToRemove) {
      this.element.classList.remove(...this.classesToRemove);
    }
    this.element.classList.add(...classesToAdd);
    this.classesToRemove = classesToAdd;
  }
}
