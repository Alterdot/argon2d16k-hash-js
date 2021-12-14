'use strict';

var helper = require('./helper');
var argon2d16k = require('bindings')('argon2d16k.node')
module.exports = argon2d16k;

/**
 * Error codes
 */
 var errors = module.exports.errors = {
    input_not_specified: 'input not specified',
    input_single_invalid_type: 'input must be string when inputFormat is not specified',
    input_format_mismatch_string: 'input format mismatch: input should be an string',
    input_format_mismatch_array: 'input format mismatch: input should be an array',
    input_format_invalid: 'invalid input format',
    output_format_invalid: 'invalid output format'
};

/**
 * Obtain an argon2d16k hash
 * @param input {string|array|buffer} input data to hash
 * @param inputFormat {number} optional - format of the input: 0: string, 1: 8 bit array/Buffer, 2: 32 bit array
 * @param outputFormat {number} optional - format of the output: 0: string, 1: 8 bit array, 2: 32 bit array
 * @returns {string|array} argon2d16k hash of input as a string, 8-bit array or 32-bit array
 */
 module.exports.digest = function (input, inputFormat, outputFormat) {

    // argument exceptions
    if (input === undefined) {
        throw (errors.input_not_specified);
    } else if (inputFormat === undefined) {

        // single input arg must be string
        if (!(typeof input === 'string' || input instanceof String)) {
            throw (errors.input_single_invalid_type);
        }
    } else {

        // validate input arguments
        if (inputFormat === 0) {
            if (!(typeof input === 'string' || input instanceof String)) {
                throw (errors.input_format_mismatch_string);
            }
        } else if (inputFormat === 1 || inputFormat === 2) {
            if (!Array.isArray(input) && !helper.isBuffer(input)) {
                throw (errors.input_format_mismatch_array);
            }
        } else {
            throw (errors.input_format_invalid);
        }

        // validate output format
        if (outputFormat !== undefined
                && outputFormat !== 0
                && outputFormat !== 1
                && outputFormat !== 2) {
            throw (errors.output_format_invalid);
        }
    }

    let msg = '';

    if (inputFormat === 1) {
        msg = input;
    } else if (inputFormat === 2) {
        msg = helper.int32Buffer2Bytes(input);
    } else {
        msg = helper.string2bytes(input);
    }

    // obtain the argon2d16k hash of the input
    var a = argon2d16k.hash(Buffer.from(msg));

    // output 32-bit array
    if (outputFormat === 2) {
        return helper.bytesBuffer2Int32Buffer(a);
    }
    // output 8-bit array
    else if (outputFormat === 1) {
        return helper.bytesBuffer2BytesArray(a);
    }
    // output string
    return helper.bytesBufferToHexString(a);
};