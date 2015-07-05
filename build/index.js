'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* global atom */
// import fs from 'fs'

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

// import {sync} from 'resolve'

var _child_process = require('child_process');

// import {CompositeDisposable} from 'atom'
// import {allowUnsafeNewFunction} from 'loophole'

var linterPackage = atom.packages.getLoadedPackage('linter');
if (!linterPackage) {
  atom.notifications.addError('Linter should be installed first, `apm install linter`', { dismissable: true });
}

// const linterPath = linterPackage.path
// const findFile = require(`${linterPath}/lib/util`)

var cmdString = 'flow';

function combineArray(obj, error) {
  obj.descr = obj.descr ? error.descr : obj.descr + ' ' + error.descr;
  obj.level = obj.level ? error.level : obj.level === 'error' || error.level === 'error' ? 'error' : 'warning';
  obj.start = obj.start !== undefined ? Math.min(obj.start, error.start) : error.start;
  obj.end = obj.end !== undefined ? Math.max(obj.end, error.end) : error.end;
  obj.line = obj.line !== undefined ? Math.min(obj.line, error.line) : error.line;
  obj.endline = obj.endline !== undefined ? Math.max(obj.endline, error.endline) : error.endline;
  obj.path = error.path;
  return obj;
}

function flowMessageToLinterMessage(message) {
  // h/t Nuclide-flow
  // It's unclear why the 1-based to 0-based indexing works the way that it
  // does, but this has the desired effect in the UI, in practice.
  var range = [[message.line - 1, message.start - 1], [message.endline - 1, message.end]];

  return { type: 'Error',
    text: message.descr,
    filePath: message.path,
    range: range
  };
}

module.exports = { config: { pathToFlowExecutable: { type: 'string',
      'default': 'flow'
    },
    testRuleTwo: { type: 'boolean',
      'default': false
    }
  },
  activate: function activate() {
    console.log('activating linter-flow-plus');

    // getting custom value
    cmdString = atom.config.get('linter-flow-plus.pathToFlowExecutable');
  },
  deactivate: function deactivate() {
    console.log('deactivating linter-flow-plus');
  },
  provideLinter: function provideLinter() {
    var provider = { grammarScopes: ['source.js', 'source.js.jsx', 'source.babel', 'source.js-semantic', 'source.es6'],
      scope: 'file',
      lintOnFly: true,
      lint: function lint(TextEditor) {
        var filePath = TextEditor.getPath();
        var fileText = TextEditor.buffer && TextEditor.buffer.cachedText;

        if (fileText.indexOf('@flow') === -1) {
          return [];
        }

        return new Promise(function (resolve, reject) {
          var command = _child_process.spawn(cmdString, ['check-contents', filePath, '--json', '--no-auto-start', '--timeout', '1'], { cwd: _path2['default'].dirname(filePath) });
          var data = '',
              errors = '';
          command.stdout.on('data', function (d) {
            data += d;
          });
          command.stderr.on('data', function (d) {
            errors += d;
          });
          command.on('close', function (err) {
            if (err) {
              reject(errors);
            } else if (!data || errors) {
              resolve([]);
            } else {
              data = JSON.parse(data.substr(data.indexOf('{')));
              if (!data.errors || data.passed) {
                resolve([]);
              } else {
                resolve(data.errors.map(function (obj) {
                  return obj.message;
                }).map(function (arr) {
                  return arr.length === 1 ? arr[0] : arr.reduce(combineArray, {});
                }).map(flowMessageToLinterMessage));
              }
            }
          });

          command.stdin.write(fileText);
          command.stdin.end();
        })['catch'](function (err) {
          console.error(err);
          return [{ type: 'warning',
            html: 'Error Linting',
            filePath: filePath,
            range: [[0, 0], [0, 1]]
          }];
        });
      }
    };

    return provider;
  }
};
// eslint-disable-line