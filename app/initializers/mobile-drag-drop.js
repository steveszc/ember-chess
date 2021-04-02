import { polyfill } from 'mobile-drag-drop';

export function initialize(/* application */) {
  if (typeof FastBoot === 'undefined') {
    polyfill();
    window.addEventListener('touchmove', function () {}, { passive: false });
  }
}

export default {
  initialize,
};
