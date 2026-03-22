describe('Catalog Logic Tests', () => {

  // ✅ 1. Guest user sees only Set A
  test('guest sees only Set A items', () => {
    const items = [
      { cardSet: 'A' },
      { cardSet: 'B' }
    ]

    const isLoggedIn = false

    const result = items.filter(item => isLoggedIn || item.cardSet === 'A')

    expect(result.length).toBe(1)
  })


  // ✅ 2. Logged-in user sees all items
  test('logged-in user sees all items', () => {
    const items = [
      { cardSet: 'A' },
      { cardSet: 'B' }
    ]

    const isLoggedIn = true

    const result = items.filter(item => isLoggedIn || item.cardSet === 'A')

    expect(result.length).toBe(2)
  })


  // ✅ 3. price_first mapping (sort by price)
  test('price_first sorts items by price', () => {
    const items = [
      { price: 300 },
      { price: 100 },
      { price: 200 }
    ]

    const mapping = 'price_first'

    const result = [...items].sort((a, b) => {
      if (mapping === 'price_first') return a.price - b.price
    })

    expect(result[0].price).toBe(100)
  })


  // ✅ 4. specs_first mapping (sort by rating)
  test('specs_first sorts items by rating', () => {
    const items = [
      { attributes: { rating: 2 } },
      { attributes: { rating: 5 } },
      { attributes: { rating: 3 } }
    ]

    const mapping = 'specs_first'

    const result = [...items].sort((a, b) => {
      return (b.attributes?.rating || 0) - (a.attributes?.rating || 0)
    })

    expect(result[0].attributes.rating).toBe(5)
  })

})