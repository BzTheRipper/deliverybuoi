#!/bin/bash
gunicorn -w 1 -b 0.0.0.0:$PORT wsgi:app
chmod +x start.sh