# **Argon2d16k Hashing Library**

![ADOT Logo](https://github.com/Alterdot/Alterdot/blob/master/src/qt/res/icons/bitcoin.png)

**Copyright (c) 2021 [Alterdot Network](https://alterdot.network/)**

What is argon2d16k-hash-js?
-----------------------------
A Node.js module that performs the Argon2d16000 hashing algorithm used by the Alterdot cryptocurrency.


Installation Instructions
-------------------------

It can be installed via the Node.js Package Manager (NPM) by using the command:

```$ npm install @Alterdot/argon2d16k-hash-js```

or by cloning from Github and installing locally using NPM:

```$ git clone https://github.com/Alterdot/argon2d16k-hash-js```

```$ cd argon2d16k-hash-js```

```$ npm install```


Usage
-----
In order to produce the hash of a string of data, you can use the following:
```js
var argon2d16k = require('argon2d16k-hash-js');
let buf = Buffer.from("There's a starman in the sky", 'utf8');
let hash = argon2d.argon2d(buf);
console.log(hash);
// should return <Buffer 0d 01 c4 09 bd 11 f1 07 d0 e9 41 ca c3 bd bf 3e ed 02 0f 9e ca d2 2b 8a 8f a0 eb 3a e2 2c b1 e0>
// or
var argon2d16k = require('argon2d16k-hash-js');
let hash = argon2d16k.digest("There's a starman in the sky");
console.log(hash);
// should return ""
```

### argon2d16k.digest(str)

Returns a `string` representation of the Argon2d16000 hash of an input `string` ***str***.

#### str

Type: `string`

The string to be hashed.

### argon2d16k.digest(input, inputFormat, outputFormat)

Returns the Argon2d16000 hash of ***input*** with the input and output types variable between a `string`, 8 bit `array` or 32 bit `array`

#### input

Type: `string` or `array`

The input data to be hashed.

#### inputFormat

Type: `number`

Specifies the format and type of the ***input*** value:

 - **0**: `string`
 - **1**: 8 bit `array`
 - **2**: 32 bit `array`

#### outputFormat

Type: `number`

Specifies the format and type of the return value:

 - **0**: `string`
 - **1**: 8 bit `array`
 - **2**: 32 bit `array`

Credits, Sources
-------
zone117x - https://github.com/zone117x/node-multi-hashing
duality-solutions - https://github.com/duality-solutions/argon2d-dynamic
dashpay - https://github.com/dashpay/x11-hash-js


License
-------
This work is licensed under the [MIT License](LICENSE). Please check
[P-H-C/phc-winner-argon2](https://github.com/P-H-C/phc-winner-argon2) for
license over Argon2 and the reference implementation.