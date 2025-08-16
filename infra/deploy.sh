#!/usr/bin/env bash
set -euo pipefail

# Docker Hub username
DOCKERHUB_USERNAME=ramjitripathi31cell  # replace with your username

# Pull latest images
sudo docker pull $DOCKERHUB_USERNAME/wntd-backend:latest
sudo docker pull $DOCKERHUB_USERNAME/wntd-frontend:latest

# Run the containers using your production compose file
sudo docker compose -f /opt/wntd/docker-compose.prod.yml up -d

# Reload Nginx to pick up any changes (if frontend static files served via Nginx)
sudo systemctl reload nginx || true
