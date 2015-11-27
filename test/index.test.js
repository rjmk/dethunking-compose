'use strict'

var test = require('tape')
var compose = require('../')
var pipe = compose.pipe

test('"composing" only one function works fine', function (t) {

  t.plan(1)
  var composed_pass = compose(
      () => id
  )

  var id = x =>
      x

  var actual = composed_pass('ok')
  var expected = 'ok'

  t.equal(actual, expected, 'one arg "ok"')
})

test('composing multiple functions work well', function (t) {

  t.plan(1)
  var composed_pass = compose(
    () => id
    , () => id
    , () => to_upper
    , () => id
  )

  var id = x =>
    x

  var to_upper = str =>
    str.toUpperCase()

  var actual = composed_pass('ok')
  var expected = 'OK'

  t.equal(actual, expected, 'multi arg "OK"')
})

test('a composed function has a good stringification', function (t) {

  t.plan(1)
  var composed_pass = compose(
    () => id
    , () => id
    , () => id
  )

  var id = x =>
      x === 'ok'

  var test_string = id.toString()

  t.equal(
      composed_pass.toString()
      , 'compose(' + [test_string, test_string, test_string].join(', ') + ')'
      , 'composed function stringifies nicely'
  )
})

test('a piped multifunction thing works', function (t) {

  t.plan(1)
  var piped_pass = pipe(
    () => id
    , () => to_upper
    , () => id
  )

  var id = x =>
    x

  var to_upper = str =>
    str.toUpperCase()

  var actual = piped_pass('ok')
  var expected = 'OK'

  t.equal(actual, expected, 'multi arg pipe "OK"')
})

test('piped functions stringify nicely', function (t) {

  t.plan(1)
  var piped_pass = pipe(
    () => id
    , () => id
    , () => id
  )

  var id = x =>
      x

  var test_string = id.toString()

  t.equal(
      piped_pass.toString()
      , 'pipe(' + [test_string, test_string, test_string].join(', ') + ')'
      , 'piped function stringifies nicely'
  )
})

test('better error throwing', function (t) {

  t.plan(1)
  var piped_pass = pipe(
    () => id
    , () => id(3)
    , () => id
  )

  var id = x =>
      x

  try {
    piped_pass(3)
  } catch (e) {
    t.equal(
      e.message,
      piped_pass.toString() + ' blew up on 3',
      'correct message'
    )
  }
})
