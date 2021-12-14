{
    "targets": [
        {
            "target_name": "argon2d16k",
            "sources": [
                "src/argon2d16k.cpp",
                "src/argon2/argon2.c",
                "src/argon2/core.c",
                "src/argon2/encoding.c",
                "src/argon2/opt.c",
                "src/argon2/thread.c",
                "src/argon2/blake2/blake2b.c",
            ],
            "include_dirs": [
                "src/crypto",
                "<!(node -e \"require('nan')\")"
            ],
            "cflags_cc": [
                "-std=c++11"
            ],
        }
    ]
}