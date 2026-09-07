import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import OrderModal from './components/OrderModal'
import Footer from './components/Footer'
import type { Product } from './lib/products'

export default function App() {
  const [selected, setSelected] = useState<Product | null>(null)

  return (
    <>
      <Navbar />
      <Hero />
      <Catalog onSelect={setSelected} />
      {selected && (
        <OrderModal product={selected} onClose={() => setSelected(null)} />
      )}
      <Footer />
    </>
  )
}
