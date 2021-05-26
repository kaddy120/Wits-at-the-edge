# Code Review Guide

The following checklist is a list of considerations a developer should make when formatting their pull request:

- [ ] Did the developer specify what they changed?

It is enouraged that the developer provide a brief overview of which features they added/changed in the pull request.

- [ ] Did the developer provide a summery of their commits?

It is encouraged for developers to provide a brief summery of their most significant commits. It is also recommended to give a summery of what they changed in each commit.

- [ ] Did the developer specify who must review the pull request?

It is also encouraged for developers to name specific individuals who they feel would be best suited to review the pull request. 

- [ ] Did the developer specify who they collaborated with?

It is encouraged that developers specify who they collaborated with. 

- [ ] Is there evidence of unit testing?

The developer must provide a checklist of tests that were performed when adding the new functionality. 

# Style Guide and Conventions

## HTML Code

* All HTML code must be committed to the `Views` directory.

## JavaScript

* All JavaScript code must be formatted according to StandardJS.
* The `var` keyword is forbidden for declaring variables.
* All variables must be declared using the `let` keyword.
* All constants must be declared using the `const` keyword.
* All JavaScript must have the `use strict` directive at the beginning of each file
* Server side JavaScript code must be in the `Backend` directory, while client side JavaScript must be in the `Public`

## Tests 
* Every JavaScriipt file must be accompanied by a corresponding test file.
* All test files must end with the `.test.js` extention.
* Every publicly accessable method must have a minimum of 1 test.
* All test file are to be stored in the `__tests__` directory.