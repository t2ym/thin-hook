#!/bin/sh

if [ "$1" = "" ]; then
  echo Please specify the host name for the https
  echo cd /* @echo keys */
  echo \# for server certificate
  echo .//* @echo generateCertSh */ hostname
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
export wildcard=
export fileprefix=
if [ "$mode" = "wildcard" ]; then
  if [ "$host" = "localhost" ]; then
    wildcard=
    for i in `seq 1 32`; do {
      wildcard=${wildcard},DNS:$i.localhost
    } done;
  else
    wildcard=,DNS:*.${host};
  fi
  fileprefix=wildcard.
fi
which openssl
if [ "$?" = "1" ]; then
  echo Please install openssl command
  exit 1
fi
echo host=$host
mkdir -p /* @echo demoCA */
cd /* @echo demoCA */
mkdir -p newcerts
rm -f index.txt
touch index.txt
echo 01 >serial
if [ ! -e /* @echo demoCA */.key ]; then
  openssl genrsa 2048 >/* @echo demoCA */.key
fi
if [ ! -e /* @echo demoCA */.csr ]; then
  openssl req -new -key /* @echo demoCA */.key -subj "/C=/* @echo C *//ST=/* @echo ST *//O=/* @echo O *//OU=/* @echo OU *//CN=/* @echo CN */" -out /* @echo demoCA */.csr
fi
if [ ! -e /* @echo demoCA */.crt ]; then
  openssl x509 -days 3650 -sha256 -req -signkey /* @echo demoCA */.key -in /* @echo demoCA */.csr -out /* @echo demoCA */.crt
  echo how to import /* @echo demoCA */.crt on Linux:
  echo cd /* @echo keys */
  echo certutil -d sql:$HOME/.pki/nssdb -A -n '/* @echo CN */' -i .//* @echo demoCA *///* @echo demoCA */.crt -t TCP,TCP,TCP
fi
if [ ! -e ${fileprefix}${host}.key ]; then
  openssl genrsa 2048 >${fileprefix}${host}.key
fi
if [ ! -e ${fileprefix}${host}.csr ]; then
cat > ${fileprefix}${host}_csr.txt <<-EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = SAN
distinguished_name = dn

[dn]
C=/* @echo C */
ST=/* @echo ST */
O=/* @echo O */
OU=/* @echo OU */
CN=${host}

[SAN]
subjectAltName=DNS:${host}${wildcard}
EOF
  openssl req -config ${fileprefix}${host}_csr.txt -new -sha256 -key ${fileprefix}${host}.key -out ${fileprefix}${host}.csr
  openssl req -text -noout -in ${fileprefix}${host}.csr
fi
cd ..
if [ ! -e demoCA/${fileprefix}${host}.crt ]; then
  openssl x509 -req -CA /* @echo demoCA *///* @echo demoCA */.crt -CAkey /* @echo demoCA *///* @echo demoCA */.key -CAcreateserial -out /* @echo demoCA *//${fileprefix}${host}.crt -in /* @echo demoCA *//${fileprefix}${host}.csr -sha256 -days 3650 \
  -extfile /* @echo demoCA *//${fileprefix}${host}_csr.txt -extensions SAN
fi
if [ "$mode" = "client" ]; then
  if [ ! -e /* @echo demoCA *//${fileprefix}${host}.pfx ]; then
    echo Note: Some browsers may not accept client certificates with empty passwords
    openssl pkcs12 -export -inkey /* @echo demoCA *//${fileprefix}${host}.key -in /* @echo demoCA *//${fileprefix}${host}.crt -out /* @echo demoCA *//${fileprefix}${host}.pfx
    echo how to import pfx on Linux:
    echo cd /* @echo keys */
    echo pk12util -d sql:$HOME/.pki/nssdb -i .//* @echo demoCA *//${fileprefix}${host}.pfx
  fi
fi
