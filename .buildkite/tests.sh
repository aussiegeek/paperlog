#!/bin/bash

set -e
set -o pipefail

echo "--- Installing dependencies"
pnpm install

echo "--- Checking prettier"
pnpm run prettier:check

echo "--- Running tests"
pnpm test

echo "--- Building app"
pnpm build