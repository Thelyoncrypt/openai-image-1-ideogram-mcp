// Ideogram v3.0 API Types

export type RenderingSpeed = "TURBO" | "DEFAULT" | "QUALITY";
export type MagicPrompt = "AUTO" | "ON" | "OFF";
export type StyleType = "AUTO" | "GENERAL" | "REALISTIC" | "DESIGN";

// Aspect ratios supported by Ideogram v3
export type AspectRatio = 
  | "1x1" | "4x3" | "3x4" | "16x9" | "9x16" 
  | "2x3" | "3x2" | "5x4" | "4x5" | "21x9" 
  | "9x21" | "3x1" | "1x3" | "2x1" | "1x2";

// Color palette configuration
export interface ColorPalette {
  name?: string; // Preset name
  members?: Array<{
    color: string; // Hexadecimal color
    weight?: number; // Optional weight
  }>;
}

// Style reference configuration for v3
export interface StyleReference {
  urls?: string[]; // Up to 3 reference image URLs
  style_code?: string; // 8-character style code
  random_style?: boolean; // Use random style from library
}

// Main generation request interface for v3
export interface IdeogramV3GenerateRequest {
  prompt: string;
  seed?: number; // 0 to 2147483647
  resolution?: string; // One of 69 supported resolutions
  aspect_ratio?: AspectRatio;
  rendering_speed?: RenderingSpeed;
  magic_prompt?: MagicPrompt;
  negative_prompt?: string;
  num_images?: number; // 1 to 8
  color_palette?: ColorPalette;
  style_codes?: string[]; // Array of 8-character style codes
  style_type?: StyleType;
  style_reference_images?: File[]; // For file uploads
  style_reference?: StyleReference; // For URL-based style references
}

// Response types
export interface ImageObject {
  prompt: string;
  resolution: string;
  is_image_safe: boolean;
  seed: number;
  url: string;
  style_type: StyleType;
}

export interface IdeogramV3Response {
  created: string; // ISO datetime
  data: ImageObject[];
}

// Tool parameters interface
export interface GenerateImageParams {
  prompt: string;
  aspect_ratio?: AspectRatio;
  resolution?: string;
  seed?: number;
  magic_prompt?: MagicPrompt;
  rendering_speed?: RenderingSpeed;
  style_codes?: string[];
  style_type?: StyleType;
  style_reference?: StyleReference;
  negative_prompt?: string;
  num_images?: number;
  output_dir?: string;
  base_filename?: string;
  blur_mask?: boolean;
}

// Error types
export interface IdeogramError {
  message: string;
  status?: number;
  details?: any;
}

// Supported resolutions (subset - full list has 69 options)
export const SUPPORTED_RESOLUTIONS = [
  "1024x1024", "1152x896", "896x1152", "1216x832", "832x1216",
  "1344x768", "768x1344", "1536x640", "640x1536", "1728x576",
  "576x1728", "1792x512", "512x1792", "1856x448", "448x1856",
  "1920x384", "384x1920", "1984x320", "320x1984", "2048x256",
  "256x2048", "2112x192", "192x2112", "2176x128", "128x2176"
] as const;

export type SupportedResolution = typeof SUPPORTED_RESOLUTIONS[number];
