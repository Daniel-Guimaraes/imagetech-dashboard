import { useSearchParams } from 'react-router-dom'

interface AddSearchParamsProps {
  paramInitial: string
  paramSecondary: string
  dataInitial: string
  dataSecondary: string
}

interface ClearFilterProps {
  paramInitial: string
  paramSecondary: string
}

export function useFilterSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  function addSearchParams({
    paramInitial,
    paramSecondary,
    dataInitial,
    dataSecondary,
  }: AddSearchParamsProps) {
    setSearchParams((state) => {
      state.set(`${paramInitial}`, `${dataInitial}`)
      state.set(`${paramSecondary}`, `${dataSecondary}`)
      return state
    })
  }

  function clearFilter({ paramInitial, paramSecondary }: ClearFilterProps) {
    setSearchParams((state) => {
      state.delete(`${paramInitial}`)
      state.delete(`${paramSecondary}`)
      return state
    })
  }

  return {
    addSearchParams,
    clearFilter,
    searchParams,
  }
}
