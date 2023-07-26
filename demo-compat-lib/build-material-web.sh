#!/bin/bash

if [ ! "$0" = "./build-material-web.sh" ]; then
  echo build-material-web.sh must reside in the current directory. exiting...
  exit 1
fi

# @material/web 1.0.0-pre.13
VERSION=1.0.0-pre.13
PACKAGE=material-web-${VERSION}.tgz
TAG=v${VERSION}
if [ ! -f ${PACKAGE} ]; then
  echo building compatible ${PACKAGE}
  mkdir -p build
  pushd build
  rm -rf material-web
  git clone -b "${TAG}" https://github.com/material-components/material-web
  pushd material-web
  git apply ../../material-web.patch
  npm install
  npm run build
  popd
  popd
  npm pack build/material-web/
  if [ -f ${PACKAGE} ]; then
    echo building compatible ${PACKAGE} done
  else
    echo building compatible ${PACKAGE} failed
    exit 1
  fi
else
  echo skipping ${PACKAGE}
fi
