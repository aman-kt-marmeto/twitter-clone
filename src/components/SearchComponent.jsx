import { SearchSvg, CrossSvg } from './Svg'

export default function SearchComponent() {
  return (
    <div className='search-component'>
      <SearchSvg className="searchsvg"/>
      <input type="text" name="search" id="search-input" placeholder='Search' />
      <CrossSvg/>
    </div>
  )
}
