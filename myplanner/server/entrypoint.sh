#!/bin/sh
until nc -z -v db 5432
do
  echo "Waiting for database connection..."
  # wait for 1 second before check again
  sleep 1
done

echo "Databese ready"

gunicorn -b 0.0.0.0:5000 main:app
