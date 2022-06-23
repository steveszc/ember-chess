import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | get-position-for-index', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it the positions based on 0-based indices', async function (assert) {
    await render(hbs`{{get-position-for-index 0 0}}`);
    assert.strictEqual(this.element.textContent.trim(), 'a8', 'a8');

    await render(hbs`{{get-position-for-index 0 1}}`);
    assert.strictEqual(this.element.textContent.trim(), 'b8', 'b8');

    await render(hbs`{{get-position-for-index 1 0}}`);
    assert.strictEqual(this.element.textContent.trim(), 'a7', 'a7');

    await render(hbs`{{get-position-for-index 1 1}}`);
    assert.strictEqual(this.element.textContent.trim(), 'b7', 'b7');

    await render(hbs`{{get-position-for-index 7 7}}`);
    assert.strictEqual(this.element.textContent.trim(), 'h1', 'h1');
  });
});
