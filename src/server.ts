import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { IdeogramV3Client } from './ideogram-client.js';
import { generateImageTool, executeGenerateImage } from './tools/generate-image.js';

export async function runServer(apiKey: string): Promise<void> {
  // Validate API key
  if (!IdeogramV3Client.validateApiKey(apiKey)) {
    throw new Error('Invalid Ideogram API key provided');
  }

  // Initialize Ideogram client
  const ideogramClient = new IdeogramV3Client(apiKey);

  // Create MCP server
  const server = new Server(
    {
      name: 'openai-image-1-ideogram-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [generateImageTool],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'generate_image':
          const result = await executeGenerateImage(args, ideogramClient);
          return {
            content: [
              {
                type: 'text',
                text: result,
              },
            ],
          };

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'An unknown error occurred';
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: errorMessage,
              tool: name,
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  });

  // Error handling
  server.onerror = (error) => {
    console.error('[MCP Error]', error);
  };

  process.on('SIGINT', async () => {
    console.log('\nShutting down OpenAI Image 1 Ideogram MCP Server...');
    await server.close();
    process.exit(0);
  });

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log('OpenAI Image 1 Ideogram MCP Server started successfully!');
  console.log('Features: Style References, Rendering Speed Control, Enhanced Quality');
}
