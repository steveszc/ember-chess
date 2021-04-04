import { module, test } from 'qunit';
import { click, fillIn, triggerEvent, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | game', function (hooks) {
  setupApplicationTest(hooks);

  const position = (position) => `[data-test="${position}"] button`;

  const clickMove = async (from, to) => {
    await click(position(from));
    await click(position(to));
  };

  const dragMove = async (from, to) => {
    await triggerEvent(position(from), 'dragstart', {
      dataTransfer: { setDragImage: () => {} },
    });
    await triggerEvent(position(to), 'dragover', { dataTransfer: {} });
    await triggerEvent(position(to), 'drop', { dataTransfer: {} });
  };

  module('with a mouse', function () {
    test('Moving a pawn by clicking an open space', async function (assert) {
      await visit('');

      assert
        .dom(position('a2'))
        .hasAttribute('data-test', 'white pawn', 'a2 is a pawn');

      assert
        .dom(position('a3'))
        .hasAttribute('data-test', 'empty-space', 'a3 is empty');

      await clickMove('a2', 'a3');

      assert
        .dom(position('a2'))
        .hasAttribute('data-test', 'empty-space', 'a2 is empty');

      assert
        .dom(position('a3'))
        .hasAttribute('data-test', 'white pawn', 'a3 is a pawn');
    });
  });

  module('with a drag-n-drop', function () {
    test('Moving a pawn by dragging to an open space', async function (assert) {
      await visit('');

      assert
        .dom(position('a2'))
        .hasAttribute('data-test', 'white pawn', 'a2 is a pawn');

      assert
        .dom(position('a3'))
        .hasAttribute('data-test', 'empty-space', 'a3 is empty');

      await dragMove('a2', 'a3');

      assert
        .dom(position('a2'))
        .hasAttribute('data-test', 'empty-space', 'a2 is empty');

      assert
        .dom(position('a3'))
        .hasAttribute('data-test', 'white pawn', 'a3 is a pawn');
    });
  });

  module('New Game', function () {
    test('Starting a new game', async function (assert) {
      await visit('');

      assert
        .dom(position('a3'))
        .hasAttribute('data-test', 'empty-space', 'a3 is empty');

      assert
        .dom('[data-test="game"]')
        .hasAttribute('data-test-turn-color', 'white', 'It is now white turn');

      await clickMove('a2', 'a3');

      assert
        .dom(position('a3'))
        .hasAttribute('data-test', 'white pawn', 'a3 is a pawn');

      assert
        .dom('[data-test="game"]')
        .hasAttribute('data-test-turn-color', 'black', 'It is now black turn');

      await click('[data-test="settings-button"]');
      await click('[data-test="new-game-button"]');

      assert
        .dom(position('a3'))
        .hasAttribute('data-test', 'empty-space', 'a3 is empty');

      assert
        .dom('[data-test="game"]')
        .hasAttribute('data-test-turn-color', 'white', 'It is now white turn');
    });

    test('Starting a new game with a FEN', async function (assert) {
      const fen =
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
      await visit('');
      await click('[data-test="settings-button"]');
      await fillIn('[data-test="fen-textarea"]', fen);
      await click('[data-test="new-game-button"]');

      assert
        .dom(position('e2'))
        .hasAttribute('data-test', 'empty-space', 'e2 is empty');

      assert
        .dom(position('e4'))
        .hasAttribute('data-test', 'white pawn', 'e4 is a pawn');

      assert
        .dom('[data-test="game"]')
        .hasAttribute('data-test-turn', '2', 'It is now turn 2');

      assert
        .dom('[data-test="game"]')
        .hasAttribute('data-test-turn-color', 'black', 'It is now black turn');
    });
  });

  module('Capturing', function () {
    test('Capturing ', async function (assert) {
      await visit('');

      await dragMove('e2', 'e4');
      await dragMove('d7', 'd5');
      await dragMove('e4', 'd5'); // white captures black pawn

      assert
        .dom(position('d5'))
        .hasAttribute('data-test', 'white pawn', 'e5 is a white pawn');

      assert
        .dom('[data-test-captured-piece="black pawn"]')
        .exists({ count: 1 }, 'captured black pawn is shown');

      await clickMove('d8', 'd5'); // black captures white pawn

      assert
        .dom('[data-test-captured-piece="white pawn"]')
        .exists({ count: 1 }, 'captured white pawn is shown');
    });
  });
});
