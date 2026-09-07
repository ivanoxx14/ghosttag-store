import { useState } from 'react'
import { products } from '../lib/products'
import type { Product } from '../lib/products'
import ProductCard from './ProductCard'

const BATCH = 24

interface Props {
  onSelect: (product: Product) => void
}

export default function Catalog({ onSelect }: Props) {
  const [visible, setVisible] = useState(BATCH)
  const shown = products.slice(0, visible)
  const hasMore = visible < products.length

  return (
    <section id="catalogo" className="catalog">
      <h2 className="catalog-title">Colección</h2>
      <p className="catalog-count">{products.length} diseños exclusivos</p>
      <div className="catalog-grid">
        {shown.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onSelect(product)}
          />
        ))}
      </div>
      {hasMore && (
        <div className="catalog-more">
          <button
            type="button"
            className="catalog-more-btn"
            onClick={() => setVisible(v => Math.min(v + BATCH, products.length))}
          >
            Ver más diseños ({products.length - visible} restantes)
          </button>
        </div>
      )}
    </section>
  )
}
