// Cloudinary utility layer — server-side only, never imported from client components.
// Credentials are read from env vars; see CLAUDE.md for variable names.

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

/**
 * Generate an optimized Cloudinary URL for an image already stored in the cloud.
 * f_auto picks the best format (WebP/AVIF) for the browser.
 * q_auto selects quality level automatically to balance size vs. fidelity.
 */
export function getImageUrl(
  publicId: string,
  options: { width?: number; height?: number; crop?: string } = {}
): string {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    ...(options.width && { width: options.width }),
    ...(options.height && { height: options.height }),
    ...(options.crop && { crop: options.crop }),
  })
}

/**
 * Upload a remote image URL to Cloudinary and return the secure URL + public ID.
 * Pass a publicId to keep filenames stable across re-uploads (overwrite: false).
 * Returns null on failure — callers should fall back to the original URL.
 */
export async function uploadImage(
  remoteUrl: string,
  publicId?: string
): Promise<{ secureUrl: string; publicId: string } | null> {
  try {
    const result = await cloudinary.uploader.upload(remoteUrl, {
      ...(publicId && { public_id: publicId }),
      overwrite: false,
      resource_type: 'image',
    })
    return { secureUrl: result.secure_url, publicId: result.public_id }
  } catch (err) {
    console.error('Cloudinary upload error:', err)
    return null
  }
}

/**
 * Fetch metadata (width, height, format, bytes) for an image already in Cloudinary.
 * Useful for build-time validation or admin scripts.
 */
export async function getImageDetails(
  publicId: string
): Promise<{ width: number; height: number; format: string; bytes: number } | null> {
  try {
    const result = await cloudinary.api.resource(publicId)
    return {
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    }
  } catch (err) {
    console.error('Cloudinary getImageDetails error:', err)
    return null
  }
}

export default cloudinary
