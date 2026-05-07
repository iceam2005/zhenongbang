/** 本地营销图：miniprogram/images/marketing（无需配置 download 域名） */

const IMG = '/images/marketing'

function picsum(seed: string, w: number, h: number): string {
  const s = seed.replace(/[^a-zA-Z0-9_-]/g, '')
  return `https://picsum.photos/seed/${s}/${w}/${h}`
}

export const P = {
  homeBanner: (i: number) => {
    const list = [`${IMG}/carousel-harvest.png`, `${IMG}/carousel-products.png`, `${IMG}/carousel-factory.png`]
    return list[(i - 1 + list.length) % list.length] || list[0]
  },
  indexSupply: (id: number) => {
    const list = [
      `${IMG}/supply-fresh-cane.png`,
      `${IMG}/supply-juicer.png`,
      `${IMG}/supply-brown-sugar.png`,
      `${IMG}/supply-bagasse.png`
    ]
    return list[(id - 1 + list.length) % list.length] || list[0]
  },
  indexProduct: (id: number) => {
    const list = [
      `${IMG}/eco-straws.png`,
      `${IMG}/eco-lunchbox.png`,
      `${IMG}/eco-flowerpot.png`,
      `${IMG}/eco-giftbox.png`,
      `${IMG}/eco-cutlery.png`,
      `${IMG}/eco-freshbox.png`
    ]
    return list[(id - 1 + list.length) % list.length] || list[0]
  },
  indexActivity: (id: number) => picsum(`znn-idx-act${id}`, 300, 300),
  marketSupply: (id: number) => {
    const list = [
      `${IMG}/supply-fresh-cane.png`,
      `${IMG}/supply-juicer.png`,
      `${IMG}/supply-brown-sugar.png`,
      `${IMG}/supply-bagasse.png`
    ]
    return list[(id - 1 + list.length) % list.length] || list[0]
  },
  marketDemand: (id: number) => {
    const list = [
      `${IMG}/demand-wholesale.png`,
      `${IMG}/demand-supermarket.png`,
      `${IMG}/demand-milktea.png`,
      `${IMG}/demand-factory.png`
    ]
    return list[(id - 1 + list.length) % list.length] || list[0]
  },
  productThumb: (id: number) => {
    const list = [
      `${IMG}/eco-straws.png`,
      `${IMG}/eco-lunchbox.png`,
      `${IMG}/eco-flowerpot.png`,
      `${IMG}/eco-giftbox.png`,
      `${IMG}/eco-cutlery.png`,
      `${IMG}/eco-freshbox.png`,
      `${IMG}/eco-seedling-cup.png`,
      `${IMG}/eco-notebook.png`
    ]
    return list[(id - 1 + list.length) % list.length] || list[0]
  },
  activityBanner: (i: number) => picsum(`znn-act-bn${i}`, 750, 400),
  activityCard: (id: number) => picsum(`znn-act-card${id}`, 300, 300),
  userAvatar: () => picsum('znn-user-avatar', 120, 120),
  productsEco: () => `${IMG}/supply-bagasse.png`,
  fallback: () => picsum('znn-fallback', 400, 300)
}

export const DEFAULT_PLACEHOLDER_IMAGE = P.fallback()
