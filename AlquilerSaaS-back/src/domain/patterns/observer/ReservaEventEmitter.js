const { EventEmitter } = require('events');

class ReservaEventEmitter extends EventEmitter {}

module.exports = new ReservaEventEmitter();
