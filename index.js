'use strict';

var pipe = function () {
  var fns = [].slice.call(arguments)
  var piped = nice_to_string('pipe', fns, function (val) {
    return fns.reduce(function (v, f) {
      return safe_call(piped, f, v)
    }, val)
  })
  return piped
}

var compose = function () {
  var fns = [].slice.call(arguments)
  return nice_to_string('compose', fns, pipe.apply(undefined, fns.reverse()))
}

var safe_call = function (piped, fn, val) {
  try {
    return fn()(val)
  } catch (e) {
    e.message = piped.toString() + ' blew up on ' + fn().toString()
    throw e
  }
}

var nice_to_string = function (name, fns, piped) {
  piped.toString = function () {
    return name + '(' + fns.map(function (fn) {
      return fn().toString()
    }).join(', ') + ')'
  }
  return piped
}

module.exports = compose

module.exports.pipe = pipe