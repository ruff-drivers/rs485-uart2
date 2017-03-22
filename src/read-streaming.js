/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var util = require('util');
var EventEmitter = require('events');

function ReadStreaming(obj) {
    EventEmitter.call(this);
    this._started = false;
    this._read = obj.read.bind(obj);
}

util.inherits(ReadStreaming, EventEmitter);

ReadStreaming.prototype.start = function () {
    var that = this;
    this._started = true;

    setImmediate(readNext);

    function readNext() {
        if (that._started) {
            that._read(function (error, data) {
                if (error) {
                    that.emit('error', error);
                } else {
                    that.emit('data', data);
                    setImmediate(readNext);
                }
            });
        }
    }
};

ReadStreaming.prototype.stop = function () {
    this._started = false;
};

module.exports = ReadStreaming;
