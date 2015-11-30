# Dethunking Compose

[Function composition](https://en.wikipedia.org/wiki/Function composition)
allows the writing of declarative functional code.
I like to pair this style of coding with the main functions at the top of a file
followed by the definitions of the smaller functions out of which it's composed.

Unfortunately, if you are writing in javascript and using function expressions
rather than function statements
(because, for example, you are writing curried functions)
these can be difficult to combine.

Because the arguments to a javascript function are eagerly evaluated,
the functions you are composing have to be defined above the point
that you compose them.

This module allows you to pass a series of thunks to a compose function
(thus delaying their evaluation)
which you allows you to define the smaller functions later
(it still has to be before their actual use).

This module also [stringifies in a debuggable way][debug].

I'm not sure this module is worth using without
the low affordance for writing thunks provided by ES6 arrow functions.

## Example

```js
var compose = require('dethunk-compose')

var triple_add_3 = module.exports = compose(
    () => add_2,
    () => add_1,
    () => triple
)

var add_2 = compose(
    () => add_1,
    () => add_1
)

var add_1 = x => x + 1

var triple = x => x * 3
```

Compare to this attempt with a normal compose module,
which would throw.

```js
var compose = require(/* Normal compose module */)

var add_2 = compose(
    add_1,
    add_1
)

var add_1 = x => x + 1

add_2(4)

// undefined is not a function
```

## Pipe

If you prefer to compose left-to-right, you can use the pipe API.

```js
var pipe = require('dethunk-compose).pipe

var triple_add_3 = module.exports = pipe(
    () => triple,
    () => add_1,
    () => add_2
)

...
```

[debug]: https://medium.com/@drboolean/7deb4688a08c