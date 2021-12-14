#include <node.h>
#include <node_buffer.h>
#include <v8.h>
#include <stdint.h>
#include "nan.h"

extern "C" {
    #include "argon2/argon2.h"
}

using namespace node;
using namespace Nan;
using namespace v8;

NAN_METHOD(hash) {
    if (info.Length() != 1)
        return Nan::ThrowError("You must provide only one argument, a buffer to hash.");

    Local<Object> target = Nan::To<Object>(info[0]).ToLocalChecked();

    if(!Buffer::HasInstance(target))
        return Nan::ThrowError("Argument should be a buffer object.");

    unsigned int mValue = 16000; // memory cost
    unsigned int tValue = 1; // iterations
    unsigned int pValue = 1; // parallelism

    char * input = Buffer::Data(target);
    char output[32];

    uint32_t input_len = Buffer::Length(target);

    argon2d_hash_raw(tValue, mValue, pValue, input, input_len, input, input_len, output, 32);

    info.GetReturnValue().Set(Nan::CopyBuffer(output, 32).ToLocalChecked());
}

NAN_MODULE_INIT(init) {
    NAN_EXPORT(target, hash);
}

NAN_MODULE_WORKER_ENABLED(argon2d16k, init);
