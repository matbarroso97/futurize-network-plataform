import React, { useState } from 'react'

function InfoGrid({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white/60 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </h4>
      <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        {children}
      </div>
    </section>
  )
}

function PillList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700/60 dark:text-slate-200"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function ProfileModal({
  profile,
  onClose,
  onRecommend,
  recommendations,
  onSendMessage,
}) {
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  if (!profile) return null

  const experiences = profile.experiencias ?? []
  const formations = profile.formacao ?? []
  const projects = profile.projetos ?? []

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    onSendMessage({
      profileId: profile.id,
      name,
      email,
      message,
    })
    setName('')
    setEmail('')
    setMessage('')
    setIsMessageOpen(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-2 backdrop-blur sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 md:h-auto md:max-h-[90vh] md:rounded-3xl">
        <header className="flex items-start gap-4 border-b border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-700 dark:bg-slate-800/40 sm:px-6 sm:py-5">
          <img
            src={profile.foto}
            alt={`Foto de ${profile.nome}`}
            className="h-16 w-16 rounded-full border border-slate-200 object-cover dark:border-slate-600 sm:h-20 sm:w-20"
          />
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {profile.nome}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {profile.cargo}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  {profile.area}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              >
                Fechar
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {profile.resumo}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span>{profile.localizacao}</span>
              <span>
                Recomendações:{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">
                  {recommendations}
                </strong>
              </span>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoGrid title="Habilidades técnicas">
              <PillList items={profile.habilidadesTecnicas} />
            </InfoGrid>
            <InfoGrid title="Soft skills">
              <PillList items={profile.softSkills} />
            </InfoGrid>
            <InfoGrid title="Áreas de interesse">
              <PillList items={profile.areaInteresses} />
            </InfoGrid>
            <InfoGrid title="Certificações">
              <PillList items={profile.certificacoes} />
            </InfoGrid>
          </div>

          <InfoGrid title="Experiências profissionais">
            <ul className="space-y-4">
              {experiences.map((experience, index) => (
                <li key={`${experience.empresa}-${index}`} className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {experience.cargo} • {experience.empresa}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {experience.inicio} — {experience.fim}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {experience.descricao}
                  </p>
                </li>
              ))}
            </ul>
          </InfoGrid>

          <InfoGrid title="Formação acadêmica">
            <ul className="space-y-3">
              {formations.map((formation, index) => (
                <li key={`${formation.curso}-${index}`}>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {formation.curso}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formation.instituicao} • {formation.ano}
                  </p>
                </li>
              ))}
            </ul>
          </InfoGrid>

          <InfoGrid title="Projetos em destaque">
            <ul className="space-y-4">
              {projects.map((project, index) => (
                <li key={`${project.titulo}-${index}`} className="space-y-1">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    {project.titulo}
                    <span aria-hidden>↗</span>
                  </a>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {project.descricao}
                  </p>
                </li>
              ))}
            </ul>
          </InfoGrid>
        </div>

        <footer className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50/80 px-4 py-5 dark:border-slate-700 dark:bg-slate-800/40 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onRecommend(profile.id)}
              className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
            >
              Recomendar profissional
            </button>
            <button
              type="button"
              onClick={() => setIsMessageOpen((prev) => !prev)}
              className="rounded-full border border-emerald-600 px-5 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400/10"
            >
              {isMessageOpen ? 'Cancelar mensagem' : 'Enviar mensagem'}
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            As interações são simuladas para fins acadêmicos.
          </p>
        </footer>

        {isMessageOpen ? (
          <>
            <div className="hidden border-t border-slate-200 bg-white px-6 py-6 dark:border-slate-700 dark:bg-slate-900/95 sm:block">
              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={handleSubmitMessage}
              >
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  Nome
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  E-mail
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  />
                </label>
                <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  Mensagem
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  />
                </label>
                <div className="md:col-span-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMessageOpen(false)}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
                  >
                    Enviar mensagem
                  </button>
                </div>
              </form>
            </div>
            <div className="absolute inset-0 z-40 overflow-y-auto bg-white dark:bg-slate-900 sm:hidden">
              <div className="flex min-h-full flex-col gap-4 px-4 py-6">
                <header className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Enviar mensagem
                </h3>
                <button
                  type="button"
                  onClick={() => setIsMessageOpen(false)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Fechar
                </button>
                </header>
                <form
                  className="flex flex-1 flex-col justify-between gap-4"
                  onSubmit={handleSubmitMessage}
                >
                  <div className="space-y-4">
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                      Nome
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                      E-mail
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                      Mensagem
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      />
                    </label>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsMessageOpen(false)}
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
                    >
                      Enviar mensagem
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default ProfileModal

