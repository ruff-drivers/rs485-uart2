/*!
 * Copyright (c) 2017 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');
var ReadStreaming = require('./read-streaming');

module.exports = driver({
    attach: function (inputs) {
        var that = this;
        this._uart = inputs['uart'];
        this._readStream = new ReadStreaming(this._uart);

        this._readStream.on('data', function (data) {
            that.emit('data', data);
        });
    },
    detach: function () {
        this._readStream.stop();
    },
    exports: {
        setup: function (options, callback) {
            this._uart.setup(options, callback);
        },
        open: function () {
            this._readStream.start();
        },
        write: function (data, callback) {
            this._uart.write(data, callback);
        }
    }
});
