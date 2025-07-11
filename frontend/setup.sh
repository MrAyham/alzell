#!/bin/bash
echo "🔧 Installing dependencies..."
npm install
echo "🔧 Generating Supabase types..."
npx supabase gen types typescript --local
echo "✅ Setup complete."
