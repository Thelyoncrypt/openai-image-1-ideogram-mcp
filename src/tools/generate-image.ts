import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { IdeogramV3Client } from '../ideogram-client.js';
import {
  GenerateImageParams,
  AspectRatio,
  RenderingSpeed,
  MagicPrompt,
  StyleType,
  SUPPORTED_RESOLUTIONS
} from '../types/ideogram.js';

export const generateImageTool: Tool = {
  name: 'generate_image',
  description: 'Generate images using Ideogram v3.0 API with advanced features like style references, rendering speed control, and enhanced quality',
  inputSchema: {
    type: 'object',
    properties: {
      prompt: {
        type: 'string',
        description: 'The prompt to use for generating the image (English recommended)',
      },
      aspect_ratio: {
        type: 'string',
        enum: ['1x1', '4x3', '3x4', '16x9', '9x16', '2x3', '3x2', '5x4', '4x5', '21x9', '9x21', '3x1', '1x3', '2x1', '1x2'],
        description: 'The aspect ratio for image generation (15 options available)',
      },
      resolution: {
        type: 'string',
        description: 'Specific resolution (see Ideogram v3 documentation for all 69 supported resolutions)',
      },
      seed: {
        type: 'integer',
        minimum: 0,
        maximum: 2147483647,
        description: 'Random seed for reproducible generation',
      },
      magic_prompt: {
        type: 'string',
        enum: ['AUTO', 'ON', 'OFF'],
        description: 'Whether to use MagicPrompt enhancement',
      },
      rendering_speed: {
        type: 'string',
        enum: ['TURBO', 'DEFAULT', 'QUALITY'],
        description: 'Rendering speed for Ideogram v3 (TURBO/DEFAULT/QUALITY)',
      },
      style_codes: {
        type: 'array',
        items: {
          type: 'string',
          pattern: '^[a-fA-F0-9]{8}$',
        },
        description: 'Array of 8-character hexadecimal style codes',
      },
      style_type: {
        type: 'string',
        enum: ['AUTO', 'GENERAL', 'REALISTIC', 'DESIGN'],
        description: 'The style type for generation',
      },
      style_reference: {
        type: 'object',
        properties: {
          urls: {
            type: 'array',
            items: { type: 'string' },
            maxItems: 3,
            description: 'URLs to reference images for style (max 3)',
          },
          style_code: {
            type: 'string',
            description: 'Style code to apply (alternative to URLs)',
          },
          random_style: {
            type: 'boolean',
            description: 'Whether to use a random style from Ideogram\'s library',
          },
        },
        description: 'Style reference options for Ideogram 3.0',
      },
      negative_prompt: {
        type: 'string',
        description: 'Description of what to exclude from the image (English recommended)',
      },
      num_images: {
        type: 'integer',
        minimum: 1,
        maximum: 8,
        description: 'Number of images to generate (1-8)',
      },
      output_dir: {
        type: 'string',
        description: 'Directory to save generated images (default: "docs")',
      },
      base_filename: {
        type: 'string',
        description: 'Base filename for saved images (default: "ideogram-image")',
      },
      blur_mask: {
        type: 'boolean',
        description: 'Apply a blurred mask to the image edges (using a fixed mask image)',
      },
    },
    required: ['prompt'],
  },
};

export async function executeGenerateImage(
  args: any,
  client: IdeogramV3Client
): Promise<string> {
  try {
    // Validate required parameters
    if (!args.prompt || typeof args.prompt !== 'string') {
      throw new Error('Prompt is required and must be a string');
    }

    // Validate optional parameters
    const params: GenerateImageParams = {
      prompt: args.prompt,
    };

    if (args.aspect_ratio) {
      params.aspect_ratio = args.aspect_ratio as AspectRatio;
    }

    if (args.resolution) {
      params.resolution = args.resolution;
    }

    if (args.seed !== undefined) {
      if (args.seed < 0 || args.seed > 2147483647) {
        throw new Error('Seed must be between 0 and 2147483647');
      }
      params.seed = args.seed;
    }

    if (args.magic_prompt) {
      params.magic_prompt = args.magic_prompt as MagicPrompt;
    }

    if (args.rendering_speed) {
      params.rendering_speed = args.rendering_speed as RenderingSpeed;
    }

    if (args.style_codes && Array.isArray(args.style_codes)) {
      // Validate style codes format
      for (const code of args.style_codes) {
        if (!/^[a-fA-F0-9]{8}$/.test(code)) {
          throw new Error(`Invalid style code format: ${code}. Must be 8 hexadecimal characters.`);
        }
      }
      params.style_codes = args.style_codes;
    }

    if (args.style_type) {
      params.style_type = args.style_type as StyleType;
    }

    if (args.style_reference) {
      params.style_reference = args.style_reference;
    }

    if (args.negative_prompt) {
      params.negative_prompt = args.negative_prompt;
    }

    if (args.num_images !== undefined) {
      if (args.num_images < 1 || args.num_images > 8) {
        throw new Error('Number of images must be between 1 and 8');
      }
      params.num_images = args.num_images;
    }

    // Generate images
    console.log('Generating images with Ideogram v3.0...');
    const response = await client.generateImage(params);

    // Download and save images
    const outputDir = args.output_dir || 'docs';
    const baseFilename = args.base_filename || 'ideogram-image';
    const blurMask = args.blur_mask || false;

    const savedPaths = await client.downloadImages(
      response,
      outputDir,
      baseFilename,
      blurMask
    );

    // Prepare response
    const result = {
      success: true,
      message: `Successfully generated ${response.data.length} image(s) using Ideogram v3.0`,
      images: response.data.map((img, index) => ({
        url: img.url,
        local_path: savedPaths[index],
        prompt: img.prompt,
        resolution: img.resolution,
        seed: img.seed,
        style_type: img.style_type,
        is_safe: img.is_image_safe,
      })),
      generation_details: {
        created: response.created,
        total_images: response.data.length,
        rendering_speed: params.rendering_speed || 'DEFAULT',
        style_type: params.style_type || 'GENERAL',
      },
    };

    return JSON.stringify(result, null, 2);
  } catch (error: any) {
    const errorResult = {
      success: false,
      error: error.message || 'Unknown error occurred',
      details: error.details || null,
    };

    return JSON.stringify(errorResult, null, 2);
  }
}
