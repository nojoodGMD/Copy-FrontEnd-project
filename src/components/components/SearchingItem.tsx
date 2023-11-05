import { ChangeEvent } from 'react'

type SearchItemProps = {
  searchTerm: string
  handleSeach: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchingItem({ searchTerm, handleSeach }: SearchItemProps) {
  return (
    <>
      <div className="home__search">
        <label htmlFor="search-product">Search Bar:</label>
        <input
          name="search-product"
          className="search-bar"
          type="text"
          placeholder="Add search value"
          value={searchTerm}
          onChange={handleSeach}
        />
      </div>
    </>
  )
}
