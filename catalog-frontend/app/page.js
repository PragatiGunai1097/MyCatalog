import { client } from '../lib/sanity'
import { cookies } from 'next/headers'
import CatalogClient from './CatalogClient'


export default async function Home() {

  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get('user')?.value === 'true'


  const items = await client.fetch(`*[_type == "item"]`)
  const users = await client.fetch(`*[_type == "user"]`)

  const filteredItems = items
    .filter(item => isLoggedIn || item.cardSet === 'A')
    .map(item => ({
      ...item,
      price: isLoggedIn ? item.priceLoggedIn : item.priceLoggedOut
    }))

  return (
    <CatalogClient
      items={filteredItems}
      users={users}
     
    />
  )
}