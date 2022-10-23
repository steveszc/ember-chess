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

  const startNewGame = async (fen) => {
    await click('[data-test="settings-button"]');
    if (fen) await fillIn('[data-test="fen-textarea"]', fen);
    await click('[data-test="new-game-button"]');
  };

  const assertPosition = (assert, coord, piece) =>
    assert
      .dom(position(coord))
      .hasAttribute('data-test', piece, `${coord} is a ${piece}`);

  const assertTurnColor = (assert, turnColor) =>
    assert
      .dom('[data-test="game"]')
      .hasAttribute(
        'data-test-turn-color',
        turnColor,
        `It is now ${turnColor} turn`
      );

  const assertTurnNumber = (assert, turnNumber) =>
    assert
      .dom('[data-test="game"]')
      .hasAttribute(
        'data-test-turn',
        `${turnNumber}`,
        `It is now turn ${turnNumber}`
      );

  const assertCaptured = (assert, piece, count = 1) =>
    assert
      .dom(`[data-test-captured-piece="${piece}"]`)
      .exists({ count }, `captured ${piece} is shown`);

  module('with a mouse', function () {
    test('Moving a pawn by clicking an open space', async function (assert) {
      assert.expect(4);

      await visit('');

      assertPosition(assert, 'a2', 'white pawn');
      assertPosition(assert, 'a3', 'empty-space');

      await clickMove('a2', 'a3');

      assertPosition(assert, 'a2', 'empty-space');
      assertPosition(assert, 'a3', 'white pawn');
    });
  });

  module('with a drag-n-drop', function () {
    test('Moving a pawn by dragging to an open space', async function (assert) {
      assert.expect(4);

      await visit('');

      assertPosition(assert, 'a2', 'white pawn');
      assertPosition(assert, 'a3', 'empty-space');

      await dragMove('a2', 'a3');

      assertPosition(assert, 'a2', 'empty-space');
      assertPosition(assert, 'a3', 'white pawn');
    });
  });

  module('New Game', function () {
    test('Starting a new game', async function (assert) {
      assert.expect(6);

      await visit('');

      assertPosition(assert, 'a3', 'empty-space');
      assertTurnColor(assert, 'white');

      await clickMove('a2', 'a3');

      assertPosition(assert, 'a3', 'white pawn');
      assertTurnColor(assert, 'black');

      await startNewGame();

      assertPosition(assert, 'a3', 'empty-space');
      assertTurnColor(assert, 'white');
    });

    test('Starting a new game with a FEN', async function (assert) {
      assert.expect(4);

      await visit('');

      await startNewGame(
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
      );

      assertPosition(assert, 'e2', 'empty-space');
      assertPosition(assert, 'e4', 'white pawn');
      assertTurnNumber(assert, 2);
      assertTurnColor(assert, 'black');
    });
  });

  module('Capturing', function () {
    test('Capturing ', async function (assert) {
      assert.expect(3);

      await visit('');

      await dragMove('e2', 'e4');
      await dragMove('d7', 'd5');
      await dragMove('e4', 'd5'); // white captures black pawn

      assertPosition(assert, 'd5', 'white pawn');
      assertCaptured(assert, 'black pawn');

      await clickMove('d8', 'd5'); // black captures white pawn

      assertCaptured(assert, 'white pawn');
    });
  });

  module('Pawn promotion', function () {
    test('White pawn can be promoted to Queen', async function (assert) {
      assert.expect(4);

      await visit('');

      await startNewGame('8/P7/8/8/8/8/8/8 w - - 0 1');

      assertPosition(assert, 'a7', 'white pawn');
      assertPosition(assert, 'a8', 'empty-space');

      await clickMove('a7', 'a8');

      assertPosition(assert, 'a7', 'empty-space');
      assertPosition(assert, 'a8', 'white queen');
    });
  });
});
