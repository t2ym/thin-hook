#!/bin/bash

if [ ! "$0" = "./build-react-old.sh" ]; then
  echo build-react-old.sh must reside in the current directory. exiting...
  exit 1
fi

# react     18.2.0
# react-dom 18.2.0
# scheduler 0.23.0
if [ ! -f react-18.2.0.tgz ] || [ ! -f react-dom-18.2.0.tgz ] || [ ! -f scheduler-0.23.0.tgz ]; then
  echo building compatible react-18.2.0.tgz, react-dom-18.2.0.tgz, and scheduler-0.23.0.tgz
  mkdir -p build
  pushd build
  rm -rf react
  git clone -b v18.2.0 https://github.com/facebook/react
  pushd react
  git apply ../../react-old.patch # not working well
  yarn
  yarn run build
  popd
  popd
  npm pack build/react/build/node_modules/react
  if [ -f react-18.2.0.tgz ]; then
    echo building compatible react-18.2.0.tgz done
  else
    echo building compatible react-18.2.0.tgz failed
    exit 1
  fi
  npm pack build/react/build/node_modules/react-dom
  if [ -f react-dom-18.2.0.tgz ]; then
    echo building compatible react-dom-18.2.0.tgz done
  else
    echo building compatible react-dom-18.2.0.tgz failed
    exit 1
  fi
  npm pack build/react/build/node_modules/scheduler
  if [ -f scheduler-0.23.0.tgz ]; then
    echo building compatible scheduler-0.23.0.tgz done
  else
    echo building compatible scheduler-0.23.0.tgz failed
    exit 1
  fi
else
  echo skipping react-18.2.0.tgz, react-dom-18.2.0.tgz, and scheduler-0.23.0.tgz
fi
