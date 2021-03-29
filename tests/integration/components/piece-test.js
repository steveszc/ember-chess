import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | piece', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('piece', {
      type: 'pawn',
      color: 'white',
    });
    this.set('noop', () => {});
    this.set('isMyTurn', true);
    this.set('canMoveHere', false);

    await render(hbs`
      <Piece
        @piece={{this.piece}}
        @select={{this.noop}}
        @isMyTurn={{this.isMyTurn}}
        @canMoveHere={{this.canMoveHere}}
        @moveHere={{this.noop}}
      />`);

    assert.dom('button').exists('renders a button');

    assert.dom('svg[data-test="icon-pawn"]').exists('renders a pawn icon');

    assert
      .dom('svg[data-test="icon-pawn"] path')
      .exists({ count: 2 }, 'white icon has 2 paths');

    this.set('piece', {
      type: 'queen',
      color: 'black',
    });

    assert.dom('svg[data-test="icon-queen"]').exists('renders a queen icon');

    assert
      .dom('svg[data-test="icon-queen"] path')
      .exists({ count: 1 }, 'black icon has 1 path');
  });
});
