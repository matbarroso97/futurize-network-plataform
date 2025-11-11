function ProfileCard({ profile, onSelect, recommendations = 0 }) {
  return (
    <article
      onClick={() => onSelect(profile)}
      className="group flex cursor-pointer flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-500"
    >
      <div className="flex items-center gap-4">
        <img
          src={profile.foto}
          alt={`Foto de ${profile.nome}`}
          className="h-16 w-16 rounded-full border border-slate-200 object-cover group-hover:scale-105 dark:border-slate-600"
          loading="lazy"
        />
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {profile.nome}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {profile.cargo}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            {profile.area}
          </p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
        {profile.resumo}
      </p>

      <div className="flex flex-wrap gap-2">
        {profile.habilidadesTecnicas.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 transition group-hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:group-hover:bg-emerald-800/60"
          >
            {skill}
          </span>
        ))}
        {profile.habilidadesTecnicas.length > 4 ? (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700/60 dark:text-slate-200">
            +{profile.habilidadesTecnicas.length - 4}
          </span>
        ) : null}
      </div>

      <footer className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{profile.localizacao}</span>
        <span className="font-medium text-emerald-600 dark:text-emerald-400">
          {recommendations} recomendações
        </span>
      </footer>
    </article>
  )
}

export default ProfileCard

