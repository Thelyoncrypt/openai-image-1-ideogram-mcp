#!/usr/bin/env node

import { runServer } from './server.js';

// Get API key from environment variable
const apiKey = process.env.IDEOGRAM_API_KEY;

if (!apiKey) {
  console.error('Error: IDEOGRAM_API_KEY environment variable is required');
  console.error('Please set your Ideogram API key:');
  console.error('export IDEOGRAM_API_KEY="your_api_key_here"');
  process.exit(1);
}

// Start the server
runServer(apiKey).catch((error) => {
  console.error('Failed to start Ideogram MCP Server v3:', error.message);
  process.exit(1);
});
