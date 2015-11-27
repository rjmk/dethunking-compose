'use strict'

var test = require('tape')
var compose = require('../')
var pipe = compose.pipe

test('"composing" only one function works fine', function (t) {

  t.plan(1)
  var composed_pass = compose(function () {
    return id
  })

  var id = function (x) {
    return x
  }

  var actual = composed_pass('ok')
  var expected = 'ok'

  t.equal(actual, expected, 'one arg "ok"')
})

test('composing multiple functions work well', function (t) {

  t.plan(1)
  var composed_pass = compose(function () {
    return id
  }, function () {
    return id
  }, function () {
    return to_upper
  }, function () {
    return id
  })

  var id = function (x) {
    return x
  }

  var to_upper = function (str) {
    return str.toUpperCase()
  }

  var actual = composed_pass('ok')
  var expected = 'OK'

  t.equal(actual, expected, 'multi arg "OK"')
})

test('a composed function has a good stringification', function (t) {

  t.plan(1)
  var composed_pass = compose(function () {
    return id
  }, function () {
    return id
  }, function () {
    return id
  })

  var id = function (x) {
    return x
  }

  var test_string = id.toString()

  t.equal(
      composed_pass.toString(),
      'compose(' + [test_string, test_string, test_string].join(', ') + ')',
      'composed function stringifies nicely'
  )
})

test('a piped multifunction thing works', function (t) {

  t.plan(1)
  var piped_pass = pipe(function () {
    return id
  }, function () {
    return to_upper
  }, function () {
    return id
  })

  var id = function (x) {
    return x
  }

  var to_upper = function (str) {
    return str.toUpperCase()
  }

  var actual = piped_pass('ok')
  var expected = 'OK'

  t.equal(actual, expected, 'multi arg pipe "OK"')
})

test('piped functions stringify nicely', function (t) {

  t.plan(1)
  var piped_pass = pipe(function () {
    return id
  }, function () {
    return id
  }, function () {
    return id
  })

  var id = function (x) {
    return x
  }

  var test_string = id.toString()

  t.equal(
      piped_pass.toString(),
      'pipe(' + [test_string, test_string, test_string].join(', ') + ')',
      'piped function stringifies nicely'
  )
})

test('better error throwing', function (t) {

  t.plan(1)
  var piped_pass = pipe(function () {
    return id
  }, function () {
    return id(3)
  }, function () {
    return id
  })

  var id = function (x) {
    return x
  }

  try {
    piped_pass(3)
  } catch (e) {
    t.equal(e.message, piped_pass.toString() + ' blew up on 3', 'correct error')
  }
})

