import { useMemo, useState } from 'react'

export function useFilters(profiles) {
  const [filters, setFilters] = useState({
    search: '',
    area: '',
    city: '',
    technology: '',
  })

  const uniqueAreas = useMemo(() => {
    return Array.from(new Set(profiles.map((profile) => profile.area))).sort()
  }, [profiles])

  const uniqueCities = useMemo(() => {
    return Array.from(
      new Set(profiles.map((profile) => profile.localizacao)),
    ).sort()
  }, [profiles])

  const uniqueTechnologies = useMemo(() => {
    const allTech = profiles.flatMap((profile) => profile.habilidadesTecnicas)
    return Array.from(new Set(allTech)).sort()
  }, [profiles])

  const filteredProfiles = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase()
    const areaFilter = filters.area.toLowerCase()
    const cityFilter = filters.city.toLowerCase()
    const techFilter = filters.technology.toLowerCase()

    return profiles.filter((profile) => {
      const matchSearch =
        searchTerm === '' ||
        profile.nome.toLowerCase().includes(searchTerm) ||
        profile.cargo.toLowerCase().includes(searchTerm) ||
        profile.resumo.toLowerCase().includes(searchTerm)

      const matchArea =
        filters.area === '' || profile.area.toLowerCase() === areaFilter

      const matchCity =
        filters.city === '' ||
        profile.localizacao.toLowerCase() === cityFilter

      const matchTechnology =
        filters.technology === '' ||
        profile.habilidadesTecnicas
          .map((skill) => skill.toLowerCase())
          .includes(techFilter)

      return matchSearch && matchArea && matchCity && matchTechnology
    })
  }, [profiles, filters])

  const handleChange = (key, value) => {
    if (key === 'reset') {
      setFilters({ search: '', area: '', city: '', technology: '' })
      return
    }

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return {
    filters,
    setFilters: handleChange,
    filteredProfiles,
    uniqueAreas,
    uniqueCities,
    uniqueTechnologies,
  }
}

