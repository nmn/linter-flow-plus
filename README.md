# linter-flow-plus

A better flowtype linter that works on the fly.

![linter-demo](https://naman.s3.amazonaws.com/linter-flow-plus/linter-flow-plus.gif)

Another project, linter-flow doesn't work and hasn't been maintained for a long time. IDE-flow and Nuclide do work, but neither of them work on the fly. They only give you errors on save.

Nuclide will support on-the-fly linting soon, however, at which point this linter may be deprecated. (There may be some value in having a flowtype linter that does nothing else)

Please Note: IDE-flow and Nuclide provide other features such as autocomplete, type definitions on hover etc. Please continue to use those services for those features. (possibly in addition to linter-flow-plus)

### Installation

linter-flow-plus depends on the linter package. Please install that before you install this package.
You also need to install flow on your machine. Then you can either make flow available on the `PATH` or configure linter-flow-plus by giving it the path to your local flow executable.

Please see the official flow website for details on how to install flow. My recommendation is to clone down the repo and build it yourself for the best ES6 support possible.


### features

linter-flow-plus has on-the-fly linting using flow types. It also provides clean errors with traces. No other linter for flow currently supports traces. (When an error is caused by a definition somewhere else in your codebase.)

My pull request for Traces in Nuclide has been accepted and you can expect traces in Nuclide in the future.

That's it. That is the very reason I built this linter. It strives to do just one thing. I may build other projects for autocomplete or type definitions using flow, or I may not. But this linter works and it will never do anything other than lint your code.

### Limitations

This linter currently does not support Hack. Though the linter just uses the flow-cli and hack support should be trivial to add, I'm not a Hack/PHP developer and I can't test that it actually works. I would welcome if someone was to add support for Hack to this package and test it.

This linter only works within files with the `/* @flow */` comment. Linter errors from other files are currently ignored and settings to lint all files without the comment are currently ignored. I would love some feedback to fix this issue.

### Known issues

If you open a project without `.flowconfig` file with this linter enabled, you will get a dumb error on line 1, saying `Error Linting`.

### Contribution and Feedback

This project started off as I was frustrated with IDE-flow and Nuclide. I hunted around in the flow-cli, made a PR to add documentation about it to their website, and create a few issues on Nuclide, and eventually, after seeing how straightforward writing a linter was, creating this linter over the night.

Since then, I depend on this linter on a daily basis for all my Javascript development, and so I maintain this project. There are a few rough edges and I would love some help to fix them.

So please, make contributions and create github issues. In the issues, please complain about problems and missing features.
