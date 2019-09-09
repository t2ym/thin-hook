/*
  @license https://github.com/t2ym/thin-hook/blob/master/LICENSE.md
  Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
#include <napi.h>
#include <stdlib.h>
#include <openssl/evp.h>
#include <openssl/bio.h>
#include <openssl/pem.h>
#include <openssl/engine.h>

using namespace Napi;

/* rsa_oaep_decrypt(ArrayBuffer encrypted, String private_key_pem): 40 times faster than node-forge */
Value rsa_oaep_decrypt(const CallbackInfo& info) {
  auto env = info.Env();
  napi_value null;
  napi_get_null(env, &null);
  Value result;

  BIO *bio = NULL;
  EVP_PKEY *key = NULL;
  ENGINE *e = NULL;
  EVP_PKEY_CTX *ctx = NULL;
  unsigned char *decrypted = NULL;
  size_t decryptedSize = 0;

  try {
    auto arrayBuffer = info[0].As<ArrayBuffer>();
    const auto encrypted = static_cast<const uint8_t *>(arrayBuffer.Data());
    const auto encryptedSize = arrayBuffer.ByteLength();
    std::string private_key_pem = info[1].As<String>().Utf8Value();

    bio = BIO_new(BIO_s_mem());
    BIO_write(bio, private_key_pem.data(), private_key_pem.size());
    key = PEM_read_bio_PrivateKey(bio, NULL, NULL, NULL);
    if (key == NULL)
      throw "PEM_read_bio_PrivateKey";
    e = ENGINE_get_default_RSA();
    ctx = EVP_PKEY_CTX_new(key, e);
    if (ctx == NULL)
      throw "EVP_PKEY_CTX_new";
    if (EVP_PKEY_decrypt_init(ctx) != 1)
      throw "EVP_PKEY_decrypt_init";
    if (EVP_PKEY_CTX_set_rsa_padding(ctx, RSA_PKCS1_OAEP_PADDING) <= 0)
      throw "EVP_PKEY_CTX_set_rsa_padding";
    if (EVP_PKEY_CTX_set_rsa_oaep_md(ctx, EVP_sha256()) <= 0)
      throw "EVP_PKEY_CTX_set_rsa_oaep_md";
    if (EVP_PKEY_CTX_set_rsa_mgf1_md(ctx, EVP_sha256()) <= 0)
      throw "EVP_PKEY_CTX_set_rsa_mgf1_md";
    if (EVP_PKEY_decrypt(ctx, NULL, &decryptedSize, encrypted, encryptedSize) <= 0)
      throw "EVP_PKEY_decrypt";
    decrypted = (unsigned char *)calloc(sizeof(char), decryptedSize);
    if (decrypted == NULL)
      throw "calloc";
    if (EVP_PKEY_decrypt(ctx, decrypted, &decryptedSize, encrypted, encryptedSize) <= 0)
      throw "EVP_PKEY_decrypt";
    result = Buffer<uint8_t>::Copy(env, decrypted, decryptedSize);
  }
  catch (const char *error) {
    //printf(error);
    result = Value(env, null);
  }
  if (decrypted) free(decrypted);
  if (ctx) EVP_PKEY_CTX_free(ctx);
  if (e) ENGINE_free(e);
  if (key) EVP_PKEY_free(key);
  if (bio) BIO_free_all(bio);

  return result.As<Value>();
}

Object Init(Env env, Object exports)
{
  exports.Set("rsa_oaep_decrypt", Function::New(env, rsa_oaep_decrypt));
  return exports;
}

NODE_API_MODULE(addon, Init)