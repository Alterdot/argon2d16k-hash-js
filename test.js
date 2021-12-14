'use strict';

var argon2d16k = require('./');
var expect = require('chai').expect;

let starman = "There's a starman in the sky";
let alterdot = 'alterdot';
let int32 = [-1245000620, -1578223460, 654805539, -1068884769, -968029107, -8582190, 491541657, 290156804, 1046922525, 1254877013, -1307320917, 1691597203, 55068107, 1715389297, 252729336, 127805489];
let buffer = Buffer.from('0400000097ea9c8bee806143a8ae50116fe3d329dcbb18b5d8ea71a7a213a1b052000000b1950f668df2593684169b0e33ee7fb1b8e00d90ed906d80b4c2baa7d1b65f548f495a57ed98521d348b0700', 'hex');

describe('Argon2d16000 Hash Functions', function () {

    // main argon2d16k digest function tests
    describe('argon2d16k (digest)', function () {

        it('starman string', function () {
            expect(argon2d16k.digest(starman)).to.equal('06957ef254c45e7f059b573a796a7446d0d4133d8f86c02972f4eb7a402be103');
        });

        it('alterdot string', function () {
            expect(argon2d16k.digest(alterdot)).to.equal('93aede4dc9cfe8295b2bd1aa744f7e792956d38cea8e6a23fe3ccb9a2c8646e5');
        });

        it('int32', function () {
            expect(argon2d16k.digest(int32, 2)).to.equal('83b0ee9a61070fcae89b3909a00c6ebb73b798463119f162e53ce34827bdc763');
        });

        it('buffer', function () {
            expect(argon2d16k.digest(buffer, 1)).to.equal('f668ad6a18781b6bdbc0fe35b810d4e86c7ee989bbd3c7ee2a0bc7e3ff83d5d6');
        });

        it('buffer outputFormat = 0', function () {
            expect(argon2d16k.digest(buffer, 1, 0)).to.equal('f668ad6a18781b6bdbc0fe35b810d4e86c7ee989bbd3c7ee2a0bc7e3ff83d5d6');
        });

        it('buffer outputFormat = 1 -> 8 bit', function () {
            expect(argon2d16k.digest(buffer, 1, 1)).to.deep.equal([
                246, 104, 173, 106,  24, 120,  27,
                107, 219, 192, 254,  53, 184,  16,
                212, 232, 108, 126, 233, 137, 187,
                211, 199, 238,  42,  11, 199, 227,
                255, 131, 213, 214
            ]);
        });

        it('buffer outputFormat = 2 -> 32 bit', function () {
            expect(argon2d16k.digest(buffer, 1, 2)).to.deep.equal([
                -160912022,
                410524523,
                -608109003,
                -1206856472,
                1820256649,
                -1143748626,
                705415139,
                -8137258
            ]);
        });

        // argument exceptions...
        describe('input argument exceptions', function () {

            it('invalid input type: missing', function () {
                expect(function () {
                    argon2d16k.digest();
                }).to.throw(argon2d16k.errors.input_not_specified);
            });

            it('invalid single-arg input type: array', function () {
                expect(function () {
                    argon2d16k.digest(int32);
                }).to.throw(argon2d16k.errors.input_single_invalid_type);
            });

            it('invalid single-arg input type: object', function () {
                expect(function () {
                    argon2d16k.digest({});
                }).to.throw(argon2d16k.errors.input_single_invalid_type);
            });
        });

        describe('inputFormat argument exceptions', function () {

            it('invalid inputFormat argument type: string', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, '');
                }).to.throw(argon2d16k.errors.input_format_invalid);
            });

            it('invalid inputFormat argument type: boolean', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, false);
                }).to.throw(argon2d16k.errors.input_format_invalid);
            });

            it('invalid inputFormat argument type: object', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, {});
                }).to.throw(argon2d16k.errors.input_format_invalid);
            });

            it('invalid inputFormat argument value: min', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, -1);
                }).to.throw(argon2d16k.errors.input_format_invalid);
            });

            it('invalid inputFormat argument value: max', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, 3);
                }).to.throw(argon2d16k.errors.input_format_invalid);
            });

            it('mismatch of input argument to inputFormat: string', function () {
                expect(function () {
                    argon2d16k.digest(int32, 0);
                }).to.throw(argon2d16k.errors.input_format_mismatch_string);
            });

            it('mismatch of input argument to inputFormat: array 1', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, 1);
                }).to.throw(argon2d16k.errors.input_format_mismatch_array);
            });

            it('mismatch of input argument to inputFormat: array 2', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, 2);
                }).to.throw(argon2d16k.errors.input_format_mismatch_array);
            });
        });

        describe('outputFormat argument exceptions', function () {

            it('invalid outputFormat argument type: string', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, 0, '');
                }).to.throw(argon2d16k.errors.output_format_invalid);
            });

            it('invalid outputFormat argument type: boolean', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, 0, false);
                }).to.throw(argon2d16k.errors.output_format_invalid);
            });

            it('invalid outputFormat argument type: object', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, 0, {});
                }).to.throw(argon2d16k.errors.output_format_invalid);
            });

            it('invalid outputFormat argument value: below min', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, 0, -1);
                }).to.throw(argon2d16k.errors.output_format_invalid);
            });

            it('invalid outputFormat argument value: above max', function () {
                expect(function () {
                    argon2d16k.digest(alterdot, 0, 3);
                }).to.throw(argon2d16k.errors.output_format_invalid);
            });
        });
    });
});