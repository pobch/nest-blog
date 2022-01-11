#!/bin/sh
# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex

# Seeding command
# Use -bail to stop execute the next SQL cmd when an error occurred
sqlite3 -bail prisma/dev.db < prisma/seed.sql