import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | delayed-class', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it sets and updates the dynamic class', async function (assert) {
    this.set('dynamic', 'foo bar');

    await render(hbs`<div {{delayed-class this.dynamic 5}}></div>`);

    await waitFor('.foo.bar', { timeout: 2000 });
    assert.dom('.foo.bar').exists('The classes are added');

    this.set('dynamic', 'baz');

    await waitFor('.baz', { timeout: 2000 });
    assert.dom('.baz').exists('The new class is added');
    assert.dom('.foo.bar').doesNotExist('The old class is removed');
  });
});
