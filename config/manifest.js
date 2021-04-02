'use strict';

module.exports = function (/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'Chess',
    short_name: 'Chess',
    description: 'Two-player local chess on the web',
    start_url: '/',
    scope: '/',
    display: 'fullscreen',
    background_color: '#fff',
    theme_color: '#d1d5db',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/assets/apple-touch-icon.png',
        sizes: '280x280',
        targets: ['apple'],
      },
      {
        src: '/assets/favicon-16x16.png',
        sizes: '16x16',
        targets: ['favicon'],
        type: 'image/png',
      },
      {
        src: '/assets/favicon-32x32.png',
        sizes: '32x32',
        targets: ['favicon'],
        type: 'image/png',
      },
      {
        src: '/assets/mstile-70x70.png',
        element: 'square70x70logo',
        targets: ['ms'],
      },
      {
        src: '/assets/mstile-150x150.png',
        element: 'square150x150logo',
        targets: ['ms'],
      },
      {
        src: '/assets/mstile-310x150.png',
        element: 'wide310x150logo',
        targets: ['ms'],
      },
      {
        src: '/assets/mstile-310x310.png',
        element: 'square310x310logo',
        targets: ['ms'],
      },
      {
        src: '/assets/safari-pinned-tab.svg',
        targets: ['safari-pinned-tab'],
      },
    ],
    ms: {
      tileColor: '#fff',
    },
  };
};
