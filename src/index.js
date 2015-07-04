// provider =
//   grammarScopes: ['source.js', 'source.php']
//   scope: 'file' # or 'project'
//   lintOnFly: false # must be false for scope: 'project'
//   lint: (textEditor)->
//     return new Promise (resolve, reject)->
//       message = {type: 'Error', text: 'Something went wrong', range:[[0,0], [0,1]]}
//       resolve([message])

module.exports =
  { grammarScopes: ['source.js', 'source.jsx', 'source.es6']
  , scope: 'file'
  , lintOnFly: true
  , lint(textEditor) {
      console.debug(textEditor)
      return new Promise((res) => {
        res({type: 'Error', text: 'Just Testing', range: [[0, 0], [0, 1]]})
      })
    }
  }
