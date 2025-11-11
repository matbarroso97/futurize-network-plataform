function MessagesPanel({ messages, profilesById }) {
  if (messages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400">
        Nenhuma mensagem enviada ainda. Utilize o botão &ldquo;Enviar mensagem&rdquo;
        dentro do perfil para iniciar uma conversa simulada.
      </div>
    )
  }

  const lastMessages = [...messages]
    .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
    .slice(0, 4)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
        Mensagens recentes
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Registros simulados das interações enviadas pela plataforma.
      </p>

      <ul className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
        {lastMessages.map((item) => {
          const profile = profilesById[item.profileId]
          return (
            <li
              key={item.id}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 leading-relaxed shadow-sm dark:border-slate-700 dark:bg-slate-800/60"
            >
              <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {item.name} •{' '}
                  <a
                    href={`mailto:${item.email}`}
                    className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    {item.email}
                  </a>
                </span>
                <span>
                  {new Date(item.sentAt).toLocaleString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                  })}
                </span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Destinatário: {profile?.nome ?? 'Perfil removido'}
              </p>
              <p className="mt-2 whitespace-pre-line">{item.message}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MessagesPanel

