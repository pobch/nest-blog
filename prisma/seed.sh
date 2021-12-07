#!/bin/sh
# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex

# Seeding command
sqlite3 prisma/dev.db < prisma/seed.sql