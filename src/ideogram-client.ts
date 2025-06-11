import axios, { AxiosInstance, AxiosResponse } from 'axios';
import FormData from 'form-data';
import fs from 'fs-extra';
import path from 'path';
import {
  IdeogramV3GenerateRequest,
  IdeogramV3Response,
  IdeogramError,
  GenerateImageParams
} from './types/ideogram.js';

export class IdeogramV3Client {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: 'https://api.ideogram.ai/v1',
      headers: {
        'Api-Key': apiKey,
      },
      timeout: 120000, // 2 minutes timeout for image generation
    });
  }

  /**
   * Generate images using Ideogram v3.0 API
   */
  async generateImage(params: GenerateImageParams): Promise<IdeogramV3Response> {
    try {
      const formData = new FormData();
      
      // Required parameter
      formData.append('prompt', params.prompt);

      // Optional parameters
      if (params.seed !== undefined) {
        formData.append('seed', params.seed.toString());
      }

      if (params.resolution) {
        formData.append('resolution', params.resolution);
      }

      if (params.aspect_ratio) {
        formData.append('aspect_ratio', params.aspect_ratio);
      }

      if (params.rendering_speed) {
        formData.append('rendering_speed', params.rendering_speed);
      }

      if (params.magic_prompt) {
        formData.append('magic_prompt', params.magic_prompt);
      }

      if (params.negative_prompt) {
        formData.append('negative_prompt', params.negative_prompt);
      }

      if (params.num_images) {
        formData.append('num_images', params.num_images.toString());
      }

      if (params.style_type) {
        formData.append('style_type', params.style_type);
      }

      // Style codes array
      if (params.style_codes && params.style_codes.length > 0) {
        params.style_codes.forEach(code => {
          formData.append('style_codes', code);
        });
      }

      // Style reference handling
      if (params.style_reference) {
        if (params.style_reference.urls && params.style_reference.urls.length > 0) {
          // For URL-based style references, we need to handle this differently
          // The API expects files, so we'd need to download and upload them
          console.warn('URL-based style references require file download and upload');
        }

        if (params.style_reference.style_code) {
          formData.append('style_code', params.style_reference.style_code);
        }

        if (params.style_reference.random_style !== undefined) {
          formData.append('random_style', params.style_reference.random_style.toString());
        }
      }

      const response: AxiosResponse<IdeogramV3Response> = await this.client.post(
        '/ideogram-v3/generate',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Download and save generated images
   */
  async downloadImages(
    response: IdeogramV3Response,
    outputDir: string = 'docs',
    baseFilename: string = 'ideogram-image',
    blurMask: boolean = false
  ): Promise<string[]> {
    const savedPaths: string[] = [];

    // Ensure output directory exists
    await fs.ensureDir(outputDir);

    for (let i = 0; i < response.data.length; i++) {
      const imageData = response.data[i];
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${baseFilename}_${timestamp}_${i + 1}.png`;
      const filepath = path.join(outputDir, filename);

      try {
        // Download the image
        const imageResponse = await axios.get(imageData.url, {
          responseType: 'arraybuffer',
          timeout: 60000,
        });

        let imageBuffer = Buffer.from(imageResponse.data);

        // Apply blur mask if requested
        if (blurMask) {
          imageBuffer = await this.applyBlurMask(imageBuffer);
        }

        // Save the image
        await fs.writeFile(filepath, imageBuffer);
        savedPaths.push(filepath);

        console.log(`Image saved: ${filepath}`);
      } catch (downloadError) {
        console.error(`Failed to download image ${i + 1}:`, downloadError);
        throw new Error(`Failed to download image: ${downloadError}`);
      }
    }

    return savedPaths;
  }

  /**
   * Apply blur mask to image edges (placeholder implementation)
   */
  private async applyBlurMask(imageBuffer: Buffer): Promise<Buffer> {
    // This is a placeholder implementation
    // In a real implementation, you would use an image processing library
    // like Sharp or Canvas to apply a blur mask to the edges
    console.log('Blur mask feature requires image processing library implementation');
    return imageBuffer;
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): IdeogramError {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      
      switch (status) {
        case 400:
          return { message: `Bad Request: ${message}`, status };
        case 401:
          return { message: 'Unauthorized: Invalid API key', status };
        case 422:
          return { message: `Unprocessable Entity: ${message}`, status };
        case 429:
          return { message: 'Too Many Requests: Rate limit exceeded', status };
        default:
          return { message: `API Error: ${message}`, status };
      }
    } else if (error.request) {
      return { message: 'Network Error: No response received from API' };
    } else {
      return { message: `Request Error: ${error.message}` };
    }
  }

  /**
   * Validate API key format
   */
  static validateApiKey(apiKey: string): boolean {
    return typeof apiKey === 'string' && apiKey.length > 0;
  }
}
