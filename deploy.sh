#!/bin/bash

# Urban Planning with NASA Earth Science Data - Deployment Script

echo "🚀 Urban Planning with NASA Earth Science Data - Deployment Script"
echo "=================================================================="

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project directory found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Check deployment options
echo ""
echo "🌐 Deployment Options:"
echo "1. Vercel (Recommended)"
echo "2. Netlify"
echo "3. Railway"
echo "4. Local Production Server"
echo ""

read -p "Choose deployment option (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "Installing Vercel CLI..."
            npm install -g vercel
            vercel login
            vercel --prod
        fi
        ;;
    2)
        echo "🚀 Ready for Netlify deployment!"
        echo "1. Go to https://netlify.com"
        echo "2. Drag and drop the .next folder"
        echo "3. Or connect your GitHub repository"
        ;;
    3)
        echo "🚀 Deploying to Railway..."
        if command -v railway &> /dev/null; then
            railway deploy
        else
            echo "Installing Railway CLI..."
            npm install -g @railway/cli
            railway login
            railway deploy
        fi
        ;;
    4)
        echo "🚀 Starting local production server..."
        echo "Your app will be available at: http://localhost:3000"
        npm start
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "Your Urban Planning with NASA Earth Science Data prototype is ready to help cities make data-driven planning decisions! 🌍"
