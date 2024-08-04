#!/bin/bash

# Navigate to the backend directory and start the backend server
cd backend || { echo "Directory 'backend' not found"; exit 1; }
npm start &

BACKEND_PID=$!

# Navigate to the spire-coffee directory and start the frontend server
cd ../spire-coffee || { echo "Directory 'spire-coffee' not found"; exit 1; }
npm run dev &

FRONTEND_PID=$!

wait $BACKEND_PID
wait $FRONTEND_PID

if [ $? -eq 0 ]; then
  echo "Both npm commands executed successfully."
else
  echo "One or both npm commands failed."
  exit 1
fi

