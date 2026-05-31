#!/bin/bash

# Deployment script for Isha Systems
# Run this on your production server

set -e

echo "🚀 Deploying Isha Systems..."

# Pull latest code
echo "📥 Pulling latest code from GitHub..."
git pull origin master

# Build and start Docker containers
echo "🐳 Building and starting Docker containers..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# Check if containers are running
echo "✅ Checking container status..."
docker ps | grep ishasystems-web
docker ps | grep ishasystems-backend

echo "🎉 Deployment complete!"
echo "Website should be accessible at http://localhost:8085"
echo ""
echo "Next steps:"
echo "1. Test locally: curl http://localhost:8085"
echo "2. Test backend health (via web proxy): curl http://localhost:8085/api/health"
echo "3. Setup SSL: sudo certbot --nginx -d ishasystems.com -d www.ishasystems.com"
echo "4. Reload Nginx: sudo nginx -t && sudo systemctl reload nginx"
