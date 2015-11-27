'use strict'

var pipe = (...fns) => {
  var piped = nice_to_string('pipe', fns, val =>
    fns.reduce((v, f) => safe_call(piped, f, v), val))
  return piped
}

var compose = (...fns) =>
  nice_to_string('compose', fns, pipe(...fns.reverse()))

var safe_call = (piped, fn, val) => {
  try {
    return fn()(val)
  } catch (e) {
    e.message = piped.toString() + ' blew up on ' + fn().toString()
    throw(e)
  }
}

var nice_to_string = (name, fns, piped) => {
  piped.toString = () =>
    name + '(' + fns.map(fn => fn().toString()).join(', ')+')'
  return piped
}

module.exports = compose

module.exports.pipe = pipe
