#!/bin/bash

# CCCK Website Deployment Script
# This script builds the project and can be used for local testing

echo "🚀 Starting CCCK Website Deployment Process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm ci

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "🔧 Linting code..."
npm run lint

if [ $? -ne 0 ]; then
    echo "⚠️  Linting failed, but continuing with build..."
fi

echo "🏗️  Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Built files are in the 'dist' directory"
echo "🌐 You can test locally with: npm run preview"
echo ""
echo "📋 Next steps for Truehost deployment:"
echo "1. Push your changes to GitHub"
echo "2. GitHub Actions will automatically deploy to your hosting"
echo "3. Configure SSL certificate in Truehost control panel"
echo "4. Update .htaccess to force HTTPS (uncomment the last lines)"

# Optional: Preview the build locally
read -p "🤔 Would you like to preview the build locally? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌟 Starting local preview server..."
    npm run preview
fi 