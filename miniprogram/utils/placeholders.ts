/** 在线占位图（picsum.photos）。真机/预览请在小程序后台配置 download 合法域名：picsum.photos、i.picsum.photos */

function picsum(seed: string, w: number, h: number): string {
  const s = seed.replace(/[^a-zA-Z0-9_-]/g, '')
  return `https://picsum.photos/seed/${s}/${w}/${h}`
}

export const P = {
  homeBanner: (i: number) => picsum(`znn-home-bn${i}`, 750, 400),
  indexSupply: (id: number) => picsum(`znn-idx-sup${id}`, 200, 200),
  indexProduct: (id: number) => picsum(`znn-idx-prd${id}`, 300, 300),
  indexActivity: (id: number) => picsum(`znn-idx-act${id}`, 300, 300),
  marketSupply: (id: number) => picsum(`znn-mkt-sup${id}`, 200, 200),
  marketDemand: (id: number) => picsum(`znn-mkt-dem${id}`, 200, 200),
  productThumb: (id: number) => picsum(`znn-prd-${id}`, 300, 300),
  activityBanner: (i: number) => picsum(`znn-act-bn${i}`, 750, 400),
  activityCard: (id: number) => picsum(`znn-act-card${id}`, 300, 300),
  userAvatar: () => picsum('znn-user-avatar', 120, 120),
  productsEco: () => picsum('znn-products-eco', 750, 400),
  fallback: () => picsum('znn-fallback', 400, 300)
}

export const DEFAULT_PLACEHOLDER_IMAGE = P.fallback()
