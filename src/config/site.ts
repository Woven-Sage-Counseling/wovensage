/**
 * Central site configuration — update values here without touching page code.
 */
export const siteConfig = {
  name: 'Woven Sage Counseling',
  shortName: 'Woven Sage',
  tagline: 'Clarity through connection',
  url: 'https://wovensage.com',
  contactEmail: 'admin@wovensage.com',
  contactPhone: '561-556-2229',
  contactPhoneHref: 'tel:+15615562229',
  contactFax: '(561) 328-4833',

  bookingCtaLabel: 'Request an Appointment',
  /** Destination for appointment / consult CTAs */
  bookingUrl: '/book',
  /** Sign-in chooser for client vs provider portals */
  signInUrl: '/sign-in',
  signInLabel: 'Sign in',
  /** Existing-client SimplePractice client portal */
  clientPortalUrl: 'https://wovensage.clientsecure.me',
  clientPortalLabel: 'Client portal',
  /** Invite-only employee / provider portal */
  providerPortalUrl: 'https://portal.wovensage.com',
  providerPortalLabel: 'Provider portal',
  providerPortalComingSoon: false,
  /** SimplePractice online appointment request widget */
  simplePractice: {
    portalUrl: 'https://michele-evans.clientsecure.me',
    scopeId: '2ada73f0-b0d1-4088-ac15-f70a7635fd22',
    scopeUri: 'michele-evans',
    applicationId: '7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b',
    buttonLabel: 'Request an Appointment',
  },

  contactFormSubmitLabel: 'Send message',
  contactFormSuccessTitle: 'Thank you — we received your message.',
  contactFormSuccessMessage:
    'We will follow up at the email you provided as soon as we can.',
  contactFormErrorMessage:
    'Something went wrong sending your message. Please try again or reach us by phone or email.',

  logos: {
    main: '/images/logo-main-transparent.png',
    text: '/images/logo-text.jpg',
    textHeader: '/images/logo-text-header-transparent.png',
    monogram: '/images/logo-ws.jpg',
    monogramFooter: '/images/logo-ws-footer-transparent.png',
    leaf: '/images/logo-leaf.png',
    sageLeaves: '/images/sage-leaves-transparent.png',
    sageBranchHero: '/images/sage-branch-hero-transparent.png',
    sageBranchHeroLeft: '/images/sage-branch-hero-left-transparent.png',
    sageBotanicalHero: '/images/sage-botanical-hero.png',
    chapter2Rest: '/images/chapter-2-rest-cropped.jpg',
    servicesHero: '/images/services-hero-matcha.jpg',
    teamGrowing: '/images/team-growing-bg.jpg',
  },

  /** Formspree form ID — sign up at formspree.io and paste your form ID here */
  formspreeFormId: 'xjgqplvy',

  /** Optional: Cloudflare Web Analytics token from dashboard */
  cloudflareAnalyticsToken: '',

  serviceAreas: [
    'Wellington',
    'Boca Raton',
    'Delray Beach',
    'Lake Worth',
    'Boynton Beach',
  ],

  social: {
    psychologyToday: '',
    linkedin: '',
    instagram: '',
    tiktok: '',
    facebook: '',
  },

  team: {
    founder: {
      name: 'Christian Evans',
      title: 'Founder & Operations Director',
      credentials: 'BS · MMHC',
      pronouns: '',
      bio: 'Christian founded Woven Sage Counseling with a vision to build a thoughtful, connection-centered practice serving clients across South Florida and throughout the state. He leads the practice’s operations, growth, brand, and client experience.',
    },
    clinician: {
      name: 'Michele L. Evans',
      title: 'Co-Founder & Clinical Director',
      credentials: 'LMHC · MCAR · EMDR Trained',
      pronouns: 'she/her/hers',
      languages: ['English'],
      license: 'Florida',
      bio: 'Michele graduated from Nova Southeastern University with a Masters in Mental Health Counseling. She is a Licensed Mental Health Counselor in the state of Florida, working in Boca Raton, Coral Springs, Delray Beach and virtually throughout the state. Michele is a lifelong learner and stays up to date with the latest research and development in the field of mental health. She actively seeks opportunities for professional development to enhance her knowledge and skills, ensuring to provide the highest quality of care to her clients. She has attained a second Masters in Conflict Analysis and Resolution and is currently enrolled in a Ph.D. program in the field. With expertise in various modalities such as cognitive behavioral therapy, dialectical behavioral therapy, and specializing in EMDR, Michele works with teens and adults to meet the individual needs of each client. Michele has successfully supported clients in overcoming challenges related to anxiety, depression, trauma, relationship issues, addictions, and more. Michele is a compassionate and dedicated mental health therapist with a deep understanding of the human mind and a genuine desire to help others. With over 6 years of experience in the field she has developed a unique approach to therapy that combines evidence-based techniques with a person-centered approach. Beyond her technical skills, Michele possesses exceptional interpersonal skills, allowing her to build strong therapeutic relationships based on trust, empathy, and respect. She is known for her ability to listen attentively and provide genuine support, guiding her clients towards self-discovery and improved mental wellbeing. As a therapist, Michele is committed to creating a safe and non-judgmental space for her clients to explore their thoughts, emotions, and experiences. Michele is empathetic, knowledgeable, and committed to her clients’ well-being. She believes in the power of collaboration and actively involves her clients in the therapeutic process, encouraging them to set goals and work toward achieving them.',
      specialties: 'Adults · Young Adults',
    },
  },

  insurance: {
    note: 'We accept many major insurance plans and related networks. Coverage varies by plan, so please confirm your benefits with us before your first session.',
    carriers: [] as Array<{
      id: string;
      name: string;
      aliases: string[];
      featured: boolean;
      status: 'active' | 'coming-soon';
      logo: string;
    }>,
    featuredCarrierLogos: [
      {
        id: 'unitedhealthcare',
        name: 'UnitedHealthcare',
        logo: '/images/carriers/unitedhealthcare.svg',
      },
      {
        id: 'aetna',
        name: 'Aetna',
        logo: '/images/carriers/aetna.svg',
      },
      {
        id: 'oscar',
        name: 'Oscar Health',
        logo: '/images/carriers/oscar.svg',
      },
      {
        id: 'carelon',
        name: 'Carelon',
        logo: '/images/carriers/carelon.svg',
      },
    ] as const,
  },

  services: [
    'Individual therapy',
    'Couples therapy',
    'Family therapy',
    'Group therapy',
    'Psychological assessments',
    'Consultation',
  ],

  specialties: [
    'Anxiety',
    'Depression',
    'Trauma & PTSD',
    'EMDR',
    'LGBTQ+ Affirming Care',
    'Gender Identity',
    'Women’s Mental Health',
    'Relationship Challenges',
    'Stress & Burnout',
    'Life Transitions',
    'Self-Esteem',
    'Grief & Loss',
    'Young Adults',
    'Communication & Boundaries',
  ],
} as const;

/** Formspree endpoint for contact form */
export function getFormspreeUrl(): string {
  return `https://formspree.io/f/${siteConfig.formspreeFormId}`;
}

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Why Woven Sage' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Team' },
  { href: '/insurance', label: 'Insurance' },
  { href: '/faq', label: 'FAQ' },
] as const;

export const footerLinks = [
  { href: '/contact', label: 'Contact' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/portal-privacy', label: 'Portal privacy' },
  { href: '/portal-terms', label: 'Portal terms' },
] as const;

export const socialLinks = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'facebook', label: 'Facebook' },
] as const;
