import { useEffect, useMemo, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import profilesJSON from './data/professionals.json'
import FiltersBar from './components/FiltersBar'
import ProfileCard from './components/ProfileCard'
import ProfileModal from './components/ProfileModal'
import MessagesPanel from './components/MessagesPanel'
import TopRecommendations from './components/TopRecommendations'
import { useFilters } from './hooks/useFilters'

const storedRecommendationsKey = 'futurize:recommendations'
const storedThemeKey = 'futurize:theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem(storedThemeKey)
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getInitialRecommendations() {
  if (typeof window === 'undefined') return {}
  const saved = window.localStorage.getItem(storedRecommendationsKey)
  if (!saved) return {}
  try {
    return JSON.parse(saved)
  } catch {
    return {}
  }
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  const [recommendations, setRecommendations] = useState(
    getInitialRecommendations,
  )

  const [selectedProfile, setSelectedProfile] = useState(null)
  const [messages, setMessages] = useState([])

  const profilesById = useMemo(() => {
    const map = {}
    profilesJSON.forEach((profile) => {
      map[profile.id] = profile
    })
    return map
  }, [])

  const {
    filters,
    setFilters,
    filteredProfiles,
    uniqueAreas,
    uniqueCities,
    uniqueTechnologies,
  } = useFilters(profilesJSON)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(storedThemeKey, theme)
  }, [theme])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(
      storedRecommendationsKey,
      JSON.stringify(recommendations),
    )
  }, [recommendations])

  const handleRecommend = (profileId) => {
    setRecommendations((prev) => ({
      ...prev,
      [profileId]: (prev[profileId] ?? 0) + 1,
    }))
  }

  const handleSendMessage = (payload) => {
    setMessages((prev) => [
      ...prev,
      {
        ...payload,
        id: Date.now(),
        sentAt: new Date().toISOString(),
      },
    ])
  }

  const totalProfiles = filteredProfiles.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 text-slate-900 transition dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
              Futurize Network
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
              Conecte talentos do futuro do trabalho
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 md:max-w-xl">
              Explore perfis, recomendações e portfólios de profissionais
              visionários. Use filtros inteligentes para encontrar especialistas
              por área, localização ou tecnologia-chave.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {messages.length} mensagens simuladas
            </div>
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {theme === 'dark' ? (
                <>
                  <SunIcon className="h-5 w-5 text-amber-400" />
                  Modo claro
                </>
              ) : (
                <>
                  <MoonIcon className="h-5 w-5 text-slate-600" />
                  Modo escuro
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
        <FiltersBar
          filters={filters}
          onFilterChange={setFilters}
          areas={uniqueAreas}
          cities={uniqueCities}
          technologies={uniqueTechnologies}
        />

        <section className="flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {totalProfiles} profissionais encontrados
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Voltar ao topo
          </button>
        </section>

        {Object.keys(recommendations).length > 0 ? (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Destaques mais recomendados
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Acompanhe quem vem recebendo mais votos de confiança da
                comunidade.
              </p>
            </div>
            <TopRecommendations
              profiles={profilesById}
              recommendations={recommendations}
            />
          </section>
        ) : null}

        {filteredProfiles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSelect={setSelectedProfile}
                recommendations={recommendations[profile.id] ?? 0}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-12 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              Nenhum profissional encontrado com os filtros selecionados.
            </h3>
            <p className="mt-2 text-sm">
              Ajuste sua busca por área, cidade ou tecnologia para descobrir
              novos talentos.
            </p>
          </div>
        )}

        {selectedProfile ? (
          <ProfileModal
            profile={selectedProfile}
            onClose={() => setSelectedProfile(null)}
            onRecommend={handleRecommend}
            recommendations={recommendations[selectedProfile.id] ?? 0}
            onSendMessage={handleSendMessage}
          />
        ) : null}

        <section>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Interações registradas
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Todo envio de mensagem é armazenado localmente para acompanhar o
            histórico simulado sem sair da página.
          </p>
          <div className="mt-4">
            <MessagesPanel messages={messages} profilesById={profilesById} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
