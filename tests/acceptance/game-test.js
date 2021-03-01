import { module, test } from 'qunit';
import { click, triggerEvent, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | game', function(hooks) {
  setupApplicationTest(hooks);

  const position = position => `[data-test="${position}"] button`;

  const clickMove = async (from, to) => {
    await click(position(from));
    await click(position(to));
  }

  const dragMove = async (from, to) => {
    await triggerEvent(position(from), 'dragstart', { dataTransfer: { setDragImage: () => {}}});
    await triggerEvent(position(to), 'dragover', { dataTransfer: {}});
    await triggerEvent(position(to), 'drop', { dataTransfer: {}});
  }

  test('Moving a pawn by clicking an open space', async function(assert) {
    await visit('');

    assert.dom(position('a2')).hasAttribute('data-test', 'pawn', 'a2 is a pawn');

    assert.dom(position('a3')).hasAttribute('data-test', 'empty-space', 'a3 is empty');

    await clickMove('a2', 'a3');

    assert.dom(position('a2')).hasAttribute('data-test', 'empty-space', 'a2 is empty');

    assert.dom(position('a3')).hasAttribute('data-test', 'pawn', 'a3 is a pawn');
  });

  test('Moving a pawn by dragging to an open space', async function(assert) {
    await visit('');

    assert.dom(position('a2')).hasAttribute('data-test', 'pawn', 'a2 is a pawn');

    assert.dom(position('a3')).hasAttribute('data-test', 'empty-space', 'a3 is empty');

    await dragMove('a2', 'a3');

    assert.dom(position('a2')).hasAttribute('data-test', 'empty-space', 'a2 is empty');

    assert.dom(position('a3')).hasAttribute('data-test', 'pawn', 'a3 is a pawn');
  });
});
