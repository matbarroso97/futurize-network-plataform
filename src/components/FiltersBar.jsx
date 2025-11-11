function FiltersBar({ filters, onFilterChange, areas, cities, technologies }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:grid-cols-4">
      <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 md:col-span-2">
        Buscar profissional
        <input
          type="search"
          value={filters.search}
          onChange={(event) => onFilterChange('search', event.target.value)}
          placeholder="Nome, cargo ou resumo"
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        />
      </label>

      <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Área
        <select
          value={filters.area}
          onChange={(event) => onFilterChange('area', event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        >
          <option value="">Todas</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Cidade
        <select
          value={filters.city}
          onChange={(event) => onFilterChange('city', event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        >
          <option value="">Todas</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 md:col-span-2">
        Tecnologia
        <select
          value={filters.technology}
          onChange={(event) =>
            onFilterChange('technology', event.target.value)
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        >
          <option value="">Todas</option>
          {technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() => onFilterChange('reset')}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Limpar filtros
      </button>
    </div>
  )
}

export default FiltersBar

