{
  "targets": [
    {
      "target_name": "native",
      "sources": [
        "binding.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "defines": ["NAPI_CPP_EXCEPTIONS"],
      "conditions": [
        ["OS=='win'", {
          "cflags": [
            "/EHsc"
          ]
        }],
        ["OS=='linux'", {
          "cflags_cc!": [
            "-fno-exceptions",
            "-fno-rtti"
          ],
          "cflags_cc": [
            "-fpermissive",
          ]
        }],
        ["OS=='mac'", {
          "OTHER_LDFLAGS": [ "-stdlib=libc++" ],
          "cflags_cc!": [
            "-fno-exceptions"
          ],
          "link_settings": {
            "libraries": ["-liconv"],
          },
          "xcode_settings": {
            "OTHER_CPLUSPLUSFLAGS" : [ "-std=c++11", "-stdlib=libc++" ],
            "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
            "MACOSX_DEPLOYMENT_TARGET": "10.14",
            "GCC_ENABLE_CPP_RTTI": "YES",
            "CLANG_CXX_LANGUAGE_STANDARD": "c++11"
          }
        }]
      ],
    }
  ]
}
