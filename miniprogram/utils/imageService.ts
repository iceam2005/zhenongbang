import { DEFAULT_PLACEHOLDER_IMAGE, P } from './placeholders'

const RELIABLE_IMAGES: Record<string, string[]> = {
  straw: [P.productThumb(101), P.productThumb(102)],
  box: [P.productThumb(201), P.productThumb(202)],
  pot: [P.productThumb(301), P.productThumb(302)],
  gift: [P.productThumb(401), P.productThumb(402)],
  default: [DEFAULT_PLACEHOLDER_IMAGE]
}

let imageIndexMap: Record<string, number> = {}

export const imageService = {
  getImageUrl(query: string, category?: string): string {
    const cat = category || 'default'
    const images = RELIABLE_IMAGES[cat] || RELIABLE_IMAGES.default

    if (!imageIndexMap[query]) {
      imageIndexMap[query] = 0
    } else {
      imageIndexMap[query] = (imageIndexMap[query] + 1) % images.length
    }

    const url = images[imageIndexMap[query]]
    console.log(`[ImageService] 图片: ${query} (${cat}) -> ${url}`)
    return url
  },

  getPlaceholder(): string {
    return DEFAULT_PLACEHOLDER_IMAGE
  },

  clearCache() {
    imageIndexMap = {}
  }
}
