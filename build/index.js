'use strict';

module.exports = { grammarScopes: ['source.js', 'source.jsx', 'source.es6'],
  scope: 'file',
  lintOnFly: true,
  lint: function lint(textEditor) {
    console.debug(textEditor);
    return new Promise(function (res) {
      res({ type: 'Error', text: 'Just Testing', range: [[0, 0], [0, 1]] });
    });
  }
};