export const mockUsers = [
  {
    id: 'u_client_1',
    name: 'Carla Contratante',
    email: 'contratante@upserv.com',
    role: 'client',
    bio: 'Preciso de servicos rapidos e confiaveis para casa e empresa.',
    location: 'Sao Paulo',
    blocked: false,
  },
  {
    id: 'u_provider_1',
    name: 'Lucas Eletrica Pro',
    email: 'prestador@upserv.com',
    role: 'provider',
    bio: 'Eletricista e automacao residencial para PF e PJ.',
    location: 'Sao Paulo',
    blocked: false,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'u_provider_2',
    name: 'Ana Limpeza Prime',
    email: 'ana@upserv.com',
    role: 'provider',
    bio: 'Limpeza premium para ambientes comerciais e residenciais.',
    location: 'Campinas',
    blocked: false,
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'u_admin_1',
    name: 'Aline Admin',
    email: 'admin@upserv.com',
    role: 'admin',
    bio: 'Administracao e moderacao da plataforma Upserv.',
    location: 'Sao Paulo',
    blocked: false,
  },
];

export const mockCategories = [
  'Eletrica',
  'Limpeza',
  'Encanamento',
  'TI',
  'Design',
  'Consultoria',
];

export const mockServices = [
  {
    id: 's1',
    providerId: 'u_provider_1',
    providerName: 'Lucas Eletrica Pro',
    name: 'Instalacao eletrica residencial',
    description: 'Instalacao de pontos, quadros e revisao tecnica com laudo.',
    price: 350,
    category: 'Eletrica',
    location: 'Sao Paulo',
    rating: 4.8,
    approved: true,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 's2',
    providerId: 'u_provider_2',
    providerName: 'Ana Limpeza Prime',
    name: 'Limpeza pos-obra',
    description: 'Equipe especializada para limpeza profunda apos reforma.',
    price: 480,
    category: 'Limpeza',
    location: 'Campinas',
    rating: 4.6,
    approved: true,
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 's3',
    providerId: 'u_provider_1',
    providerName: 'Lucas Eletrica Pro',
    name: 'Automacao de iluminacao',
    description: 'Projetos de automacao com cenas inteligentes e app mobile.',
    price: 920,
    category: 'TI',
    location: 'Sao Paulo',
    rating: 4.9,
    approved: false,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
];

export const mockRequests = [
  {
    id: 'r1',
    serviceId: 's1',
    serviceName: 'Instalacao eletrica residencial',
    clientId: 'u_client_1',
    providerId: 'u_provider_1',
    description: 'Instalar 4 tomadas e revisar quadro eletrico.',
    dateTime: '2026-04-20 14:00',
    location: 'Pinheiros, Sao Paulo',
    status: 'pendente',
  },
  {
    id: 'r2',
    serviceId: 's2',
    serviceName: 'Limpeza pos-obra',
    clientId: 'u_client_1',
    providerId: 'u_provider_2',
    description: 'Apartamento de 90m2 apos pintura.',
    dateTime: '2026-04-18 09:00',
    location: 'Cambuí, Campinas',
    status: 'em_andamento',
  },
];

export const mockConversations = [
  {
    id: 'cv1',
    requestId: 'r2',
    participants: ['u_client_1', 'u_provider_2'],
    lastMessage: 'Chego em 20 minutos.',
  },
];

export const mockMessages = [
  {
    id: 'm1',
    conversationId: 'cv1',
    senderId: 'u_client_1',
    text: 'Tudo certo para hoje as 9h?',
    time: '08:10',
  },
  {
    id: 'm2',
    conversationId: 'cv1',
    senderId: 'u_provider_2',
    text: 'Sim, equipe confirmada.',
    time: '08:12',
  },
];

export const mockReviews = [
  {
    id: 'rv1',
    requestId: 'r2',
    providerId: 'u_provider_2',
    clientName: 'Carla Contratante',
    rating: 5,
    comment: 'Atendimento impecavel e muito rapido.',
  },
];

export const mockReports = [
  {
    id: 'rp1',
    title: 'Atraso recorrente em atendimento',
    detail: 'Cliente relatou dois atrasos sem aviso previo.',
    targetType: 'servico',
    targetId: 's3',
    status: 'em_analise',
  },
];
