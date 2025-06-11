import { AspectRatio, RenderingSpeed, MagicPrompt, StyleType } from '../types/ideogram.js';

/**
 * Validate aspect ratio
 */
export function validateAspectRatio(aspectRatio: string): aspectRatio is AspectRatio {
  const validRatios: AspectRatio[] = [
    '1x1', '4x3', '3x4', '16x9', '9x16', 
    '2x3', '3x2', '5x4', '4x5', '21x9', 
    '9x21', '3x1', '1x3', '2x1', '1x2'
  ];
  return validRatios.includes(aspectRatio as AspectRatio);
}

/**
 * Validate rendering speed
 */
export function validateRenderingSpeed(speed: string): speed is RenderingSpeed {
  const validSpeeds: RenderingSpeed[] = ['TURBO', 'DEFAULT', 'QUALITY'];
  return validSpeeds.includes(speed as RenderingSpeed);
}

/**
 * Validate magic prompt setting
 */
export function validateMagicPrompt(magicPrompt: string): magicPrompt is MagicPrompt {
  const validSettings: MagicPrompt[] = ['AUTO', 'ON', 'OFF'];
  return validSettings.includes(magicPrompt as MagicPrompt);
}

/**
 * Validate style type
 */
export function validateStyleType(styleType: string): styleType is StyleType {
  const validTypes: StyleType[] = ['AUTO', 'GENERAL', 'REALISTIC', 'DESIGN'];
  return validTypes.includes(styleType as StyleType);
}

/**
 * Validate style code format (8 hexadecimal characters)
 */
export function validateStyleCode(styleCode: string): boolean {
  return /^[a-fA-F0-9]{8}$/.test(styleCode);
}

/**
 * Validate seed value
 */
export function validateSeed(seed: number): boolean {
  return Number.isInteger(seed) && seed >= 0 && seed <= 2147483647;
}

/**
 * Validate number of images
 */
export function validateNumImages(numImages: number): boolean {
  return Number.isInteger(numImages) && numImages >= 1 && numImages <= 8;
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate style reference URLs (max 3)
 */
export function validateStyleReferenceUrls(urls: string[]): boolean {
  if (urls.length > 3) {
    return false;
  }
  return urls.every(url => validateUrl(url));
}

/**
 * Sanitize filename for safe file system usage
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Generate timestamp for filenames
 */
export function generateTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Validate and normalize prompt
 */
export function validatePrompt(prompt: string): string {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt is required and must be a string');
  }
  
  const trimmed = prompt.trim();
  if (trimmed.length === 0) {
    throw new Error('Prompt cannot be empty');
  }
  
  if (trimmed.length > 2000) {
    console.warn('Prompt is very long, consider shortening for better results');
  }
  
  return trimmed;
}
