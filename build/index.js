/* global atom */
// import fs from 'fs'
// import path from 'path'
// import {sync} from 'resolve'
// import {exec} from 'child_process'
// import {CompositeDisposable} from 'atom'
// import {allowUnsafeNewFunction} from 'loophole'

'use strict';

var linterPackage = atom.packages.getLoadedPackage('linter');
if (!linterPackage) {
  return atom.notifications.addError('Linter should be installed first, `apm install linter`', { dismissable: true });
}

// const linterPath = linterPackage.path
// const findFile = require(`${linterPath}/lib/util`)

module.exports = { config: { testRuleOne: { type: 'string',
      'default': ''
    },
    testRuleTwo: { type: 'boolean',
      'default': false
    }
  },
  activate: function activate() {
    console.log('activating linter-flow-plus');
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
        console.log('TextEditor: ', TextEditor);

        // no errors: return []

        return [{ type: 'warning',
          html: '<span class="badge badge-flexible">21</span> Test Error',
          filePath: filePath,
          range: [[0, 0], [0, 1]]
        }];
      }
    };

    return provider;
  }
};
// eslint-disable-line
// getting custom value
// const customValueOne: string = atom.config.get('linter-flow-plus.testRuleOne')
