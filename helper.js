'use strict';

module.exports.isBuffer = function(obj) {
    return obj !== null && obj.constructor !== null && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

module.exports.int32Buffer2Bytes = function(b) {
    var buffer = new Array(b.length);
    var len = b.length;
    var i = 0;
    while (i < len) {
        buffer[i * 4] = (b[i] & 0xFF000000) >>> 24;
        buffer[i * 4 + 1] = (b[i] & 0x00FF0000) >>> 16;
        buffer[i * 4 + 2] = (b[i] & 0x0000FF00) >>> 8;
        buffer[i * 4 + 3] = (b[i] & 0x000000FF);
        i++;
    }
    return buffer;
};

module.exports.string2bytes = function(s) {
    var len = s.length;
    var b = new Array(len);
    var i = 0;
    while (i < len) {
        b[i] = s.charCodeAt(i);
        i++;
    }
    return b;
};

module.exports.bytesBuffer2Int32Buffer = function(b) {
    if (!b) return [];
    var len = b.length ? (((b.length - 1) >>> 2) + 1) : 0;
    var buffer = new Array(len);
    var j = 0;
    while (j < len) {
        buffer[j] = (b[j * 4] << 24) | (b[j * 4 + 1] << 16) | (b[j * 4 + 2] << 8) | b[j * 4 + 3];
        j++;
    }
    return buffer;
};

module.exports.bytesBuffer2BytesArray = function(b) {
    var array = new Array(b.length);
    var len = b.length;
    var i = 0;
    while (i < len) {
        array[i] = b[i];
        i++;
    }
    return array;
};

module.exports.bytesBufferToHexString = function(array) {
    return Array.from(array, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
};