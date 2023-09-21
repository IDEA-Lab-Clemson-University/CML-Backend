
#!/bin/bash
# scripts/application_stop.sh

# Find the process ID of the Node.js application started with nodemon
APP_NAME="nodemon app"

# Find the process ID (PID) of the running application
PID=$(pgrep -f "$APP_NAME")

if [ -n "$PID" ]; then
  echo "Stopping the Node.js application (PID: $PID)"
  kill $PID
  sleep 5 # Wait for the application to gracefully stop (adjust as needed)
  echo "Node.js application stopped successfully"
else
  echo "Node.js application is not currently running"
fi