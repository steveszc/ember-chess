import { polyfill } from 'mobile-drag-drop';

export function initialize(/* application */) {
  // @ts-expect-error FastBoot global
  if (typeof FastBoot === 'undefined') {
    polyfill();
    window.addEventListener('touchmove', function () {}, { passive: false });
  }
}

export default {
  initialize,
};
