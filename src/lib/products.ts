import productIds from '../data/products.json'

export interface Product {
  id: string
  name: string
  image: string
}

export const products: Product[] = (productIds as string[])
  .map(id => ({
    id,
    name: `GHOSTTAG #${id}`,
    image: `/mockups/${id}.webp`,
  }))
  .sort((a, b) => parseInt(a.id) - parseInt(b.id))
