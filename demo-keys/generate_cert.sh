#!/bin/sh

if [ "$1" = "" ]; then
  echo Please specify the host name for the https
  echo cd demo-keys
  echo \# for server certificate
  echo ./generate_cert.sh hostname
  echo \# via npm
  echo npm run demo-certificates -- hostname
  echo \# for client certificate
  echo ./generate_cert.sh client client
  echo \# via npm
  echo npm run demo-certificates -- client client
  exit 1
fi
export host=$1
export mode=$2
which openssl
if [ "$?" = "1" ]; then
  echo Please install openssl command
  exit 1
fi
echo host=$host
mkdir -p demoCA
cd demoCA
mkdir -p newcerts
rm -f index.txt
touch index.txt
echo 01 >serial
if [ ! -e demoCA.key ]; then
  openssl genrsa 2048 >demoCA.key
fi
if [ ! -e demoCA.csr ]; then
  openssl req -new -key demoCA.key -subj "/C=JP/ST=Tokyo/O=thin-hook/OU=demo/CN=thin-hook demo CA" -out demoCA.csr
fi
if [ ! -e demoCA.crt ]; then
  openssl x509 -days 3650 -sha256 -req -signkey demoCA.key -in demoCA.csr -out demoCA.crt
  echo how to import demoCA.crt on Linux:
  echo cd demo-keys
  echo certutil -d sql:$HOME/.pki/nssdb -A -n 'thin-hook demo CA' -i ./demoCA/demoCA.crt -t TCP,TCP,TCP
fi
if [ ! -e ${host}.key ]; then
  openssl genrsa 2048 >${host}.key
fi
if [ ! -e ${host}.csr ]; then
cat > ${host}_csr.txt <<-EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = SAN
distinguished_name = dn

[dn]
C=JP
ST=Tokyo
O=thin-hook
OU=demo
CN=${host}

[SAN]
subjectAltName=DNS:${host}
EOF
  openssl req -config ${host}_csr.txt -new -sha256 -key ${host}.key -out ${host}.csr
  openssl req -text -noout -in ${host}.csr
fi
cd ..
if [ ! -e demoCA/${host}.crt ]; then
  openssl x509 -req -CA demoCA/demoCA.crt -CAkey demoCA/demoCA.key -CAcreateserial -out demoCA/${host}.crt -in demoCA/${host}.csr -sha256 -days 3650 \
  -extfile demoCA/${host}_csr.txt -extensions SAN
fi
if [ "$mode" = "client" ]; then
  if [ ! -e demoCA/${host}.pfx ]; then
    echo Note: Some browsers may not accept client certificates with empty passwords
    openssl pkcs12 -export -inkey demoCA/${host}.key -in demoCA/${host}.crt -out demoCA/${host}.pfx
    echo how to import pfx on Linux:
    echo cd demo-keys
    echo pk12util -d sql:$HOME/.pki/nssdb -i ./demoCA/${host}.pfx
  fi
fi
