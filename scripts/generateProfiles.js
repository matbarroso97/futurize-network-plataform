import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const firstNames = [
  'Ana',
  'Bruno',
  'Carla',
  'Diego',
  'Eduarda',
  'Felipe',
  'Gabriela',
  'Heitor',
  'Isabela',
  'João',
  'Karina',
  'Lucas',
  'Mariana',
  'Nicolas',
  'Olívia',
  'Paulo',
  'Rafaela',
  'Samuel',
  'Talita',
  'Victor',
  'Yasmin',
  'Zeca',
  'Larissa',
  'Mateus',
  'Patrícia',
  'Renato',
  'Sofia',
  'Thiago',
  'Vivian',
]

const lastNames = [
  'Almeida',
  'Barbosa',
  'Cardoso',
  'Dias',
  'Esteves',
  'Freitas',
  'Gomes',
  'Hernandez',
  'Ibrahim',
  'Jacinto',
  'Klein',
  'Lima',
  'Moraes',
  'Nogueira',
  'Oliveira',
  'Pereira',
  'Queiroz',
  'Ribeiro',
  'Souza',
  'Teixeira',
  'Uchoa',
  'Vasconcelos',
  'Watanabe',
  'Xavier',
  'Young',
  'Zanetti',
]

const roles = [
  'Engenheiro(a) de Software',
  'Product Manager',
  'UX/UI Designer',
  'Desenvolvedor(a) Front-end',
  'Desenvolvedor(a) Back-end',
  'Cientista de Dados',
  'Analista de Segurança',
  'Arquiteto(a) de Soluções',
  'Especialista em DevOps',
  'Engenheiro(a) de Machine Learning',
  'Scrum Master',
  'Analista de Marketing Digital',
  'Especialista em Cloud',
]

const areas = [
  'Desenvolvimento',
  'Design',
  'Dados',
  'Segurança',
  'Gestão de Produtos',
  'Marketing',
  'Recursos Humanos',
  'Educação',
  'Saúde Digital',
  'Finanças',
]

const cities = [
  'São Paulo/SP',
  'Campinas/SP',
  'Rio de Janeiro/RJ',
  'Belo Horizonte/MG',
  'Curitiba/PR',
  'Porto Alegre/RS',
  'Florianópolis/SC',
  'Recife/PE',
  'Salvador/BA',
  'Fortaleza/CE',
  'Brasília/DF',
  'Goiânia/GO',
]

const hardSkills = [
  'React',
  'Vue',
  'Angular',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'Django',
  'FastAPI',
  'SQL',
  'NoSQL',
  'AWS',
  'Azure',
  'GCP',
  'Docker',
  'Kubernetes',
  'Figma',
  'Adobe XD',
  'TensorFlow',
  'PyTorch',
  'R',
  'Power BI',
  'Tableau',
  'Rust',
  'Go',
  'Java',
  'Spring Boot',
  'C#',
  '.NET',
  'Flutter',
  'React Native',
  'GraphQL',
  'Next.js',
  'NestJS',
  'Laravel',
  'SQL Server',
  'PostgreSQL',
  'MongoDB',
  'CI/CD',
]

const softSkills = [
  'Comunicação',
  'Trabalho em equipe',
  'Pensamento crítico',
  'Resiliência',
  'Adaptabilidade',
  'Liderança',
  'Organização',
  'Gestão de tempo',
  'Proatividade',
  'Empatia',
  'Negociação',
  'Criatividade',
  'Visão estratégica',
]

const interests = [
  'IA Ética',
  'Educação',
  'Saúde Digital',
  'Fintech',
  'GovTech',
  'Impacto Social',
  'Sustentabilidade',
  'Metaverso',
  'Computação Quântica',
  'Cidades Inteligentes',
  'Inclusão Digital',
  'Robótica',
  'Economia Criativa',
]

const certifications = [
  'AWS Certified Solutions Architect',
  'Google Cloud Professional Data Engineer',
  'Azure Administrator Associate',
  'Scrum Master Certified',
  'PMP',
  'OKR Professional',
  'Certified Kubernetes Administrator',
  'TensorFlow Developer Certificate',
  'Certified Ethical Hacker',
  'Design Sprint Master',
  'IELTS C1',
]

const languages = [
  { idioma: 'Inglês', nivel: 'Avançado' },
  { idioma: 'Espanhol', nivel: 'Intermediário' },
  { idioma: 'Francês', nivel: 'Intermediário' },
  { idioma: 'Alemão', nivel: 'Básico' },
  { idioma: 'Italiano', nivel: 'Básico' },
]

const institutions = [
  'USP',
  'Unicamp',
  'PUC-Rio',
  'FIAP',
  'Insper',
  'UFSC',
  'UFPE',
  'UFRGS',
  'UFBA',
  'UFF',
  'Faculdade Impacta',
]

const courses = [
  'Bacharelado em Ciência da Computação',
  'Engenharia de Software',
  'Design Digital',
  'Análise e Desenvolvimento de Sistemas',
  'MBA em Gestão de Produtos Digitais',
  'Especialização em Ciência de Dados',
  'Mestrado em Inteligência Artificial',
  'Pós-graduação em UX Strategy',
  'MBA em Gestão Ágil',
  'Especialização em Segurança da Informação',
]

const companyNames = [
  'TechNova',
  'InovaLabs',
  'FutureCorp',
  'NexuSoft',
  'DataPulse',
  'CloudBridge',
  'DesignSphere',
  'HealthConnect',
  'FinEdge',
  'EduPrime',
  'SafeNet',
  'GreenBits',
]

const projectTitles = [
  'Plataforma de Mentoria Digital',
  'Marketplace de Serviços Criativos',
  'Dashboard de Analytics em Tempo Real',
  'Aplicativo Saúde Preventiva',
  'Sistema de Gestão de Energia',
  'Portal Educacional Imersivo',
  'Assistente Virtual para RH',
  'Hub de Conteúdo Interativo',
  'Solução Financeira Gamificada',
  'Ferramenta de OKR colaborativa',
  'Plataforma de Voluntariado Tech',
]

const randomFrom = (list) => list[Math.floor(Math.random() * list.length)]

const randomSubset = (list, min, max) => {
  const size = Math.floor(Math.random() * (max - min + 1)) + min
  const shuffled = [...list].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, size)
}

const profiles = Array.from({ length: 60 }, (_, index) => {
  const firstName = randomFrom(firstNames)
  const lastName = randomFrom(lastNames)
  const fullName = `${firstName} ${lastName}`
  const role = randomFrom(roles)
  const area = randomFrom(areas)
  const location = randomFrom(cities)
  const photoId = (index % 70) + 1
  const technicalSkills = randomSubset(hardSkills, 3, 6)
  const softSkillsSelection = randomSubset(softSkills, 3, 5)
  const interestsSelection = randomSubset(interests, 2, 4)
  const certSelection = randomSubset(certifications, 1, 3)
  const languageSelection = randomSubset(languages, 1, 3)
  const company = randomFrom(companyNames)

  const experiences = [
    {
      empresa: company,
      cargo: role,
      inicio: `20${Math.floor(Math.random() * 10 + 14)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}`,
      fim: 'Atual',
      descricao: `Atuação em iniciativas estratégicas na área de ${area.toLowerCase()}, liderando squads multidisciplinares e promovendo cultura de inovação.`,
    },
    {
      empresa: randomFrom(companyNames),
      cargo: randomFrom(roles),
      inicio: `20${Math.floor(Math.random() * 6 + 10)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}`,
      fim: `20${Math.floor(Math.random() * 5 + 17)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}`,
      descricao: `Contribuição na transformação digital de processos, com foco em entrega contínua de valor e uso de métricas.`,
    },
  ]

  const formation = [
    {
      curso: randomFrom(courses),
      instituicao: randomFrom(institutions),
      ano: 2015 + Math.floor(Math.random() * 9),
    },
  ]

  const projects = randomSubset(projectTitles, 1, 2).map((title, idx) => ({
    titulo: title,
    link: `https://portfolio.futurize.dev/${firstName.toLowerCase()}-${index + 1}-${idx + 1}`,
    descricao: `Projeto focado em ${title.toLowerCase()}, utilizando ${technicalSkills.slice(0, 2).join(', ')}.`,
  }))

  return {
    id: index + 1,
    nome: fullName,
    foto: `https://i.pravatar.cc/150?img=${photoId}`,
    cargo: role,
    resumo: `${fullName.split(' ')[0]} é ${role.toLowerCase()} com foco em soluções para ${area.toLowerCase()} e atuação em iniciativas do futuro do trabalho.`,
    localizacao: location,
    area,
    habilidadesTecnicas: technicalSkills,
    softSkills: softSkillsSelection,
    experiencias: experiences,
    formacao: formation,
    projetos: projects,
    certificacoes: certSelection,
    idiomas: languageSelection,
    areaInteresses: interestsSelection,
  }
})

const outputDir = resolve(__dirname, '../src/data')
mkdirSync(outputDir, { recursive: true })
const outputPath = resolve(outputDir, 'professionals.json')
writeFileSync(outputPath, JSON.stringify(profiles, null, 2), 'utf-8')

console.log(`Generated ${profiles.length} profiles in ${outputPath}`)


