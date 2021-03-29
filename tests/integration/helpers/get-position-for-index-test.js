import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | get-position-for-index', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it the positions based on 0-based indices', async function (assert) {
    await render(hbs`{{get-position-for-index 0 0}}`);
    assert.equal(this.element.textContent.trim(), 'a1', 'a1');

    await render(hbs`{{get-position-for-index 0 1}}`);
    assert.equal(this.element.textContent.trim(), 'b1', 'b1');

    await render(hbs`{{get-position-for-index 1 0}}`);
    assert.equal(this.element.textContent.trim(), 'a2', 'a2');

    await render(hbs`{{get-position-for-index 1 1}}`);
    assert.equal(this.element.textContent.trim(), 'b2', 'b2');

    await render(hbs`{{get-position-for-index 7 7}}`);
    assert.equal(this.element.textContent.trim(), 'h8', 'h8');
  });
});
