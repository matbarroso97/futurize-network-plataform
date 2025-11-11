# Futurize Network

Rede profissional colaborativa que conecta talentos do futuro do trabalho. O projeto foi desenvolvido como parte da Global Solution (2º semestre/2025) utilizando **React**, **Vite** e **Tailwind CSS**.

## ✨ Visão Geral

- Listagem de 60 perfis fictícios com nome, foto, cargo e principais habilidades.
- Filtros combinados por área, cidade e tecnologia, além de busca textual.
- Modal completo por perfil com formação, experiências, projetos, certificações, soft skills e áreas de interesse.
- Botões funcionais de **Recomendar** e **Enviar mensagem**, com histórico local das interações.
- Ranking dos profissionais mais recomendados e painel de mensagens recentes.
- Tema claro/escuro com preferência persistida no navegador.

## 🚀 Instalação

```bash
git clone https://github.com/matbarroso97/futurize-network-plataform.git
cd futurize-network-plataform
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173/` (ou próxima porta disponível). Para gerar o build de produção execute `npm run build`.

## 🗂️ Estrutura de Dados

- `scripts/generateProfiles.js`: script para gerar perfis sintéticos.
- `src/data/professionals.json`: base com 60 profissionais simulados seguindo as propriedades exigidas (id, nome, cargo, resumo, localização, área, habilidades técnicas, soft skills, experiências, formação, projetos, certificações, idiomas e interesses).

## 👥 Usuários

Não há autenticação; as interações são simuladas e mantidas apenas no armazenamento local do navegador.

## 👨‍🎓 Integrantes

- Matheus da Costa Barroso — RM 561308

## 🔗 Repositório

- https://github.com/matbarroso97/futurize-network-plataform.git

