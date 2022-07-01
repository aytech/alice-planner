#!/usr/bin/env bash

PUBLIC_URL=/static yarn build && (cd build && zip -r ../build.zip .)