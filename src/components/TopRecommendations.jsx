function TopRecommendations({ profiles, recommendations }) {
  const ranked = Object.entries(recommendations)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  if (ranked.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400">
        Ainda não existem recomendações. Abra um perfil e utilize o botão
        &ldquo;Recomendar profissional&rdquo;.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {ranked.map(([id, count], index) => {
        const profile = profiles[id]
        if (!profile) return null
        const positions = ['1º', '2º', '3º']
        return (
          <article
            key={id}
            className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-5 shadow-sm dark:border-emerald-800/60 dark:from-slate-900 dark:via-slate-800/60 dark:to-emerald-900/10"
          >
            <span className="absolute right-4 top-4 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {positions[index]} lugar
            </span>
            <div className="flex items-center gap-4">
              <img
                src={profile.foto}
                alt={`Foto de ${profile.nome}`}
                className="h-14 w-14 rounded-full border border-emerald-200 object-cover shadow-sm dark:border-emerald-800/60"
              />
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {profile.nome}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {profile.cargo}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              {count} pessoas recomendaram este talento para oportunidades em{' '}
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                {profile.area.toLowerCase()}
              </span>
              .
            </p>
          </article>
        )
      })}
    </div>
  )
}

export default TopRecommendations

