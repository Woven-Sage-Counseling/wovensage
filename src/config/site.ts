/**
 * Central site configuration — update values here without touching page code.
 */
export const siteConfig = {
  name: 'Woven Sage Psychology',
  shortName: 'Woven Sage',
  tagline: 'Clarity through connection',
  url: 'https://wovensage.com',
  contactEmail: 'admin@wovensage.com',

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
  },

  /** Replace with Michele's Headway profile URL when available */
  headwayBaseUrl: 'https://headway.co/providers',

  /** Formspree form ID — sign up at formspree.io and paste your form ID here */
  formspreeFormId: 'YOUR_FORM_ID',

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
    instagram: '',
    linkedin: '',
    headway: '',
  },

  team: {
    founder: {
      name: 'Christian Evans',
      title: 'Founder',
      pronouns: '',
      bio: 'Bio coming soon. Christian founded Woven Sage Psychology with a vision to make thoughtful, connection-centered mental health care accessible across South Florida and beyond.',
    },
    clinician: {
      name: 'Michele Evans',
      title: 'Co-Founder & LMHC',
      credentials: 'LMHC, MMHC, MCAR, EMDR trained',
      pronouns: 'she/her/hers',
      languages: ['English'],
      license: 'Florida license — coming soon',
      bio: 'Bio coming soon. Michele brings a warm, integrative approach to therapy with specialized training in EMDR and addiction counseling.',
      specialties: 'Strengths working with adults and young adults',
    },
  },

  insurance: {
    note: 'We bill insurance through Headway and are actively credentialing additional plans.',
    carriers: [] as string[],
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
    'Trauma',
    'Grief & loss',
    'Life transitions',
    'ADHD',
    'Substance use',
    'Relationship issues',
  ],
} as const;

/** Headway URL with UTM tracking params */
export function getHeadwayUrl(source = 'website'): string {
  const base = siteConfig.headwayBaseUrl;
  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}utm_source=wovensage&utm_medium=${source}&utm_campaign=book`;
}

/** Formspree endpoint for contact form */
export function getFormspreeUrl(): string {
  return `https://formspree.io/f/${siteConfig.formspreeFormId}`;
}

export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/services', label: 'Services' },
  { href: '/insurance', label: 'Insurance & Fees' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;

export const footerLinks = [
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/wsp', label: 'WSP App' },
  { href: '/privacy', label: 'Privacy Policy' },
] as const;
