import { SearchState } from '../atoms/SearchState'
import { Search } from 'lucide-react';
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function SearchBar() {
  const search = useRecoilValue(SearchState);
  const setSearch = useSetRecoilState(SearchState);

  return (
    <div className='h-[60px] flex items-center justify-center w-full shadow-2xl shadow-border py-4'>
        <div className="relative bg-transparent rounded-lg w-[85%] md:w-[75%]"> 
        <Search className='lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground'/>
        <input value={search} onChange={(e) => { e.preventDefault(); setSearch(e.target.value)}} className="flex h-9 w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8" placeholder="Search" />
        </div>
    </div>
  )
}
