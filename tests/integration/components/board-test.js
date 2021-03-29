import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | board', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a board', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('board', {
      grid: [
        [{}, {}],
        [{}, {}],
      ],
    });
    this.set('turnColor', 'white');
    this.set('noop', () => {});

    await render(hbs`
      <Board
        @board={{this.board}}
        @turnColor={{this.turnColor}}
        @incrementTurn={{this.noop}}
      />
    `);

    assert.dom('table[data-test="board"]').exists('renders a table');
    assert
      .dom('table[data-test="board"] tr.row')
      .exists(
        { count: this.board.grid.length },
        'renders rows for each grid row'
      );

    assert
      .dom('table[data-test="board"] tr.row th.key')
      .exists('each row has a row header for the key');
    assert
      .dom('table[data-test="board"] tr.row td.space')
      .exists(
        { count: this.board.grid.length * this.board.grid[0].length },
        'each row has a cell for each cell in the board grid'
      );
  });
});
