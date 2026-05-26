// ============================================================
// CONFIGURACIÓN GLOBAL DEL SITIO — CORPORACIÓN USQAY S.A.C.
// Modifica este archivo para actualizar toda la landing page
// ============================================================

export const SITE = {
  name: 'Usqay',
  tagline: 'Sistema para Restaurantes',
  url: 'https://usqay.com',
  locale: 'es',
} as const;

// ============================================================
// BANNER SUPERIOR
// ============================================================
export const BANNER = {
  enabled: true,
  text: '¿Tienes un restaurante en Piura?',
  highlight: 'Solicita tu demo gratuita',
  suffix: 'y descubre cómo Usqay digitaliza tu negocio en menos de 24 horas.',
  link: { label: 'Demo gratuita', href: '#contacto' },
} as const;

// ============================================================
// HERO
// ============================================================
export const HERO = {
  heading: 'El sistema que tu restaurante necesita para crecer',
  subheading:
    'Gestiona pedidos, comandas, inventario y facturación desde una sola plataforma. Membresía mensual, sin costos de instalación.',
  billingToggle: {
    monthly: 'Mensual',
    annual: 'Anual',
    saveBadge: 'Ahorra 13%',
  },
} as const;

// ============================================================
// PLANES DE PRECIOS
// ============================================================
export interface Plan {
  id: string;
  name: string;
  description: string;
  emoji: string;
  featured: boolean;
  featuredLabel?: string;
  priceMonthly: number;
  priceAnnual: number;
  annualSavingsLabel?: string;
  ctaLabel: string;
  ctaVariant: 'primary' | 'secondary';
  ctaHref: string;
  features: { label: string; included: boolean }[];
}

export const PLANS: Plan[] = [
  {
    id: 'lite',
    name: 'Lite',
    description: 'Ideal para empezar a digitalizar. Incluye todo lo esencial menos CRM y almacén. CRM (+S/30) y Cloud (+S/20) disponibles como adicionales.',
    emoji: '🍽️',
    featured: false,
    priceMonthly: 99,
    priceAnnual: 99,
    ctaLabel: 'Solicitar demo',
    ctaVariant: 'secondary',
    ctaHref: '#contacto',
    features: [
      { label: '1 Caja', included: true },
      { label: '5 Usuarios', included: true },
      { label: '500 comprobantes (boletas y facturas)', included: true },
      { label: 'Notificaciones por correo', included: true },
      { label: 'Cloud', included: false },
      { label: 'Almacén', included: false },
      { label: 'CRM', included: false },
    ],
  },
  {
    id: 'sube',
    name: 'Sube',
    description: 'Para negocios en crecimiento. Incluye Cloud y almacén. CRM disponible como adicional (+S/30).',
    emoji: '📈',
    featured: false,
    priceMonthly: 149,
    priceAnnual: 130,
    annualSavingsLabel: 'Facturado anualmente — ahorras S/ 228 (13% dto.)',
    ctaLabel: 'Solicitar demo',
    ctaVariant: 'secondary',
    ctaHref: '#contacto',
    features: [
      { label: '1 Caja', included: true },
      { label: '10 Usuarios', included: true },
      { label: '2 Dispositivos Cloud', included: true },
      { label: '1 Almacén', included: true },
      { label: '1,500 comprobantes', included: true },
      { label: 'Notificaciones correo y WhatsApp', included: true },
      { label: 'CRM', included: false },
    ],
  },
  {
    id: 'emprende',
    name: 'Emprende',
    description: 'Solución completa con CRM incluido, múltiples usuarios y 3 dispositivos Cloud para escalar tu negocio.',
    emoji: '🚀',
    featured: true,
    featuredLabel: '⭐ Más popular',
    priceMonthly: 199,
    priceAnnual: 173,
    annualSavingsLabel: 'Facturado anualmente — ahorras S/ 312 (13% dto.)',
    ctaLabel: 'Solicitar demo',
    ctaVariant: 'primary',
    ctaHref: '#contacto',
    features: [
      { label: '2 Cajas', included: true },
      { label: 'Usuarios ilimitados', included: true },
      { label: '3 Dispositivos Cloud', included: true },
      { label: '3 Almacenes', included: true },
      { label: 'CRM incluido', included: true },
      { label: '3,000 comprobantes', included: true },
      { label: 'Notificaciones correo y WhatsApp', included: true },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Para cadenas y negocios con múltiples locales. Todo ilimitado: cajas, usuarios, Cloud, almacenes y comprobantes.',
    emoji: '🏆',
    featured: false,
    priceMonthly: 249,
    priceAnnual: 217,
    annualSavingsLabel: 'Facturado anualmente — ahorras S/ 384 (13% dto.)',
    ctaLabel: 'Contactar ventas',
    ctaVariant: 'secondary',
    ctaHref: '#contacto',
    features: [
      { label: 'Cajas ilimitadas', included: true },
      { label: 'Usuarios ilimitados', included: true },
      { label: 'Dispositivos Cloud ilimitados', included: true },
      { label: 'Almacenes ilimitados', included: true },
      { label: 'CRM incluido', included: true },
      { label: 'Comprobantes ilimitados', included: true },
      { label: 'Notificaciones correo y WhatsApp', included: true },
    ],
  },
];

// ============================================================
// ESTADÍSTICAS
// ============================================================
export interface Stat {
  value: string;
  description: string;
}

export const STATS: Stat[] = [
  {
    value: '98%',
    description:
      'de los mozos y cajeros <strong>reducen sus errores de pedido y cobro</strong> desde el primer día de uso de Usqay.',
  },
  {
    value: '+800',
    description:
      '<strong>restaurantes</strong> en la región Piura ya digitalizaron su operación con Usqay.',
  },
  {
    value: '3x',
    description:
      'más rápida la atención al cliente y gestión de mesas comparado con el uso de papel y sistemas manuales.',
  },
];

// ============================================================
// CASOS DE ÉXITO
// ============================================================
export interface SuccessCase {
  name: string;
  initials: string;
  role: string;
  quote: string;
  avatarColor: string;
  textColor: string;
}

export const SUCCESS_CASES: SuccessCase[] = [
  {
    name: 'Carlos Mendoza',
    initials: 'CM',
    role: 'Dueño de Restaurante El Rincón Piurano',
    quote:
      'Antes anotaba los pedidos en papel y siempre había errores. Con Usqay mis mozos toman el pedido desde el celular y llega directo a cocina. Mis ventas subieron 30%.',
    avatarColor: 'bg-orange-900',
    textColor: 'text-usqay-orange',
  },
  {
    name: 'Laura Gómez',
    initials: 'LG',
    role: 'Dueña de Restaurante La Piuranita',
    quote:
      'Con Usqay mis mozos y cajeros trabajan juntos sin errores. El inventario se descuenta solo y los reportes del día los veo desde mi celular.',
    avatarColor: 'bg-indigo-900',
    textColor: 'text-indigo-400',
  },
  {
    name: 'Andrés Pérez',
    initials: 'AP',
    role: 'Dueño de Pollería El Sabrosón',
    quote:
      'La facturación electrónica conectada con SUNAT me ahorra horas cada semana. Usqay es fácil de aprender y el soporte responde muy rápido cuando tengo dudas.',
    avatarColor: 'bg-rose-900',
    textColor: 'text-rose-400',
  },
  {
    name: 'María Rodríguez',
    initials: 'MR',
    role: 'Propietaria de Pollería Don Pedro',
    quote:
      'Antes perdía horas cuadrando la caja y el inventario. Ahora Usqay lo hace automático. Recuperé tiempo para atender mejor a mis clientes.',
    avatarColor: 'bg-teal-900',
    textColor: 'text-teal-400',
  },
];

// ============================================================
// BENEFICIOS
// ============================================================
export interface Benefit {
  emoji: string;
  title: string;
  description: string;
}

export const BENEFITS: Benefit[] = [
  {
    emoji: '🧾',
    title: 'Pedidos y comandas digital',
    description: 'Tus mozos toman pedidos desde el celular. Llegan automáticamente a cocina sin errores ni demoras.',
  },
  {
    emoji: '📅',
    title: 'Reservas online',
    description: 'Gestiona mesas en tiempo real. Tus clientes reservan desde WhatsApp o la web.',
  },
  {
    emoji: '📦',
    title: 'Inventario inteligente',
    description: 'Controla insumos, recibe alertas de stock bajo y evita pérdidas por desabastecimiento.',
  },
  {
    emoji: '🧾',
    title: 'Facturación electrónica',
    description: 'Emite boletas y facturas electrónicas válidas ante SUNAT desde el mismo sistema.',
  },
  {
    emoji: '📊',
    title: 'Reportes en tiempo real',
    description: 'Consulta ventas del día, platillos más pedidos y el rendimiento de tu restaurante desde tu celular.',
  },
  {
    emoji: '📱',
    title: 'Funciona online y offline',
    description: 'Si se corta el internet, el sistema sigue funcionando. Cuando vuelve la conexión, sincroniza solo.',
  },
];

// ============================================================
// LOGOS DE EMPRESAS (clientes de referencia)
// ============================================================
export const COMPANY_LOGOS: string[] = [
  'Restaurantes',
  'Cevicherías',
  'Pollerías',
  'Bares',
  'Food Courts',
];

// ============================================================
// PREGUNTAS FRECUENTES
// ============================================================
export interface FAQ {
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    question: '¿Necesito conocimientos técnicos para usar Usqay?',
    answer:
      'No. Usqay está diseñado para ser muy fácil de usar. Brindamos capacitación presencial a tu equipo y soporte continuo para que empiecen a usarlo desde el primer día.',
  },
  {
    question: '¿El sistema funciona sin internet?',
    answer:
      'Sí. Usqay funciona en modo offline cuando no hay conexión a internet. Cuando se restablece la conexión, sincroniza automáticamente todos los datos sin perder ningún registro.',
  },
  {
    question: '¿Puedo cancelar mi membresía en cualquier momento?',
    answer:
      'Sí, puedes cancelar cuando quieras sin penalizaciones. Seguirás teniendo acceso al sistema hasta el final del período pagado.',
  },
  {
    question: '¿La facturación electrónica está conectada con SUNAT?',
    answer:
      'Sí. Los planes Pro y Enterprise incluyen facturación electrónica integrada y válida ante SUNAT. Emites boletas y facturas desde el mismo sistema sin necesidad de programas adicionales.',
  },
  {
    question: '¿Usqay funciona para todo tipo de restaurante?',
    answer:
      'Sí. Usqay está diseñado para restaurantes de todo tipo: pollerías, cevicherías, fuentes de soda, chifas y más. Si vendes comida, Usqay es para ti.',
  },
];

// ============================================================
// CTA FINAL
// ============================================================
export const CTA = {
  heading: 'Digitaliza tu negocio hoy mismo',
  subheading:
    'Únete a más de 800 restaurantes de Piura que ya usan Usqay.\nSolicita tu demo gratuita, sin compromisos.',
  ctaLabel: 'Solicitar demo gratuita',
  ctaHref: '#contacto',
  trust: ['Sin costo de instalación', 'Capacitación incluida', 'Soporte en español'],
} as const;
