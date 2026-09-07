import { useState, useEffect } from 'react'
import type { Product } from '../lib/products'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const
const PHONE = '529981035834'

interface Props {
  product: Product
  onClose: () => void
}

export default function OrderModal({ product, onClose }: Props) {
  const [size, setSize] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleOrder = () => {
    const msg = `¡Hola! Me interesa la playera ${product.name} en talla ${size}. ¿Está disponible?`
    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,
      '_blank',
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar"
          type="button"
        >
          ✕
        </button>

        <div className="modal-body">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-details">
            <span className="modal-step">Paso 1 de 2</span>
            <h3 className="modal-product-name">{product.name}</h3>

            <div className="modal-sizes">
              <p className="modal-label">Selecciona tu talla</p>
              <div className="modal-sizes-row">
                {SIZES.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`size-btn${size === s ? ' active' : ''}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-action">
              {size && <span className="modal-step">Paso 2 de 2</span>}
              <button
                type="button"
                className="order-btn"
                disabled={!size}
                onClick={handleOrder}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.305 0-4.459-.676-6.282-1.836l-.42-.27-3.088 1.035 1.035-3.088-.27-.42A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Ordenar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
