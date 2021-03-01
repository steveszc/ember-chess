import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | game', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a board', async function(assert) {
    await render(hbs`<Game />`);

    assert.dom('[data-test="board"]').exists('it renders a board');
    assert.dom('[data-test="settings-button"]').exists('it renders a settings button');
  });
});
