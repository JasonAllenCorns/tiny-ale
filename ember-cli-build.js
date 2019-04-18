'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const postcssImport = require('postcss-easy-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const tailwindcss = require('tailwindcss');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        enabled: true,
        plugins: [
          { module: postcssImport },
          { module: postcssNested },
          { module: tailwindcss, options: './config/tailwind.js' },
          { module: postcssPresetEnv },
        ],
      },
    },
    nodeAssets: {
      pikaday: {
        vendor: ['css/pikaday.css'],
      },
    },
  });

  app.import('vendor/pikaday/css/pikaday.css');

  return app.toTree();
};
