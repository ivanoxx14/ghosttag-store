import { useState } from 'react'
import type { Product } from '../lib/products'

interface Props {
  product: Product
  onClick: () => void
}

export default function ProductCard({ product, onClick }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <button className="product-card" onClick={onClick} type="button">
      <div className="product-card-img">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      </div>
      <div className="product-card-info">
        <span className="product-card-name">{product.name}</span>
      </div>
    </button>
  )
}
