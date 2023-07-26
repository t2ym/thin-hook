#!/bin/bash

if [ ! "$0" = "./build-react.sh" ]; then
  echo build-react.sh must reside in the current directory. exiting...
  exit 1
fi

# React client packages
COMPONENTS=("react" "react-dom" "scheduler")
VERSIONS=("18.2.0" "18.2.0" "0.23.0")
ARCHIVES=()
DIRECTORIES=()
PACKAGES=()

for i in ${!COMPONENTS[@]}; do
  ARCHIVES+=("${COMPONENTS[$i]}-${VERSIONS[$i]}.tgz")
  DIRECTORIES+=("${COMPONENTS[$i]}-${VERSIONS[$i]}")
  PACKAGES+=("${COMPONENTS[$i]}@${VERSIONS[$i]}")
done

BUILT=0
for archive in ${ARCHIVES[@]}; do
  if [ ! -f $archive ]; then
    BUILT=1
  fi
done

if [ "$BUILT" = "1" ]; then  
  echo building compatible ${ARCHIVES[@]}
  mkdir -p build
  pushd build
  rm -rf react-convert
  mkdir -p react-convert
  pushd react-convert
  npm init -y
  npm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-replace glob
  cp -v ../../react-rollup.config.mjs .
  #cp -v ../../react.patch .
  mkdir -p original-packages
  pushd original-packages
  for i in ${PACKAGES[@]}; do {
    npm pack $i
  } done
  ls -l
  popd
  mkdir -p expanded-packages
  pushd expanded-packages
  for i in ${DIRECTORIES[@]}; do {
    mkdir -p ${i}
    pushd ${i}
    tar -xvf ../../original-packages/${i}.tgz
    popd
  } done
  popd

  REACT_PACKAGES="${DIRECTORIES[@]}" npx rollup -c react-rollup.config.mjs

  popd

  popd
  for i in ${!DIRECTORIES[@]}; do {
    npm pack build/react-convert/expanded-packages/${DIRECTORIES[$i]}/package/
    if [ -f ${ARCHIVES[$i]} ]; then
      echo building compatible ${ARCHIVES[$i]} done
    else
      echo building compatible ${ARCHIVES[$i]} failed
      exit 1
    fi
  } done
else
  ls -l ${ARCHIVES[@]}
  echo skip building ${ARCHIVES[@]}
fi
