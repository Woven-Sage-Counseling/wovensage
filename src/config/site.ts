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

  bookingCtaLabel: 'Join our waitlist',
  bookingTrustCopy:
    'We are currently in prelaunch. Share your interest and we will reach out when we open officially.',

  contactFormPrelaunchNote:
    'We are currently in prelaunch and not yet accepting appointments. Submit this form to express your interest — we will contact you when we open officially. Please do not include clinical or health information.',

  contactFormSubmitLabel: 'Join our waitlist',
  contactFormSuccessTitle: 'Thank you — we received your interest.',
  contactFormSuccessMessage:
    'We will contact you at the email you provided when Woven Sage Counseling opens officially.',
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
      pronouns: '',
      bio: 'Christian founded Woven Sage Counseling with a vision to build a thoughtful, connection-centered practice serving clients across South Florida and throughout the state. He leads the practice’s operations, growth, brand, and client experience.',
    },
    clinician: {
      name: 'Michele Evans',
      title: 'Co-Founder & LMHC',
      credentials: 'LMHC · MCAP · EMDR Trained',
      pronouns: 'she/her/hers',
      languages: ['English'],
      license: 'Florida',
      bio: 'Michele believes therapy should feel collaborative, compassionate, and grounded in genuine connection. She works with adults and young adults navigating anxiety, trauma, depression, life transitions, relationship challenges, and substance use concerns. Her approach integrates evidence-based care with warmth and curiosity to help clients move toward meaningful, lasting change.',
      specialties: 'Adults · Young Adults',
    },
  },

  insurance: {
    note: 'We are actively credentialing insurance plans and will share accepted carriers as we open.',
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
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/wsp', label: 'WSP App' },
  { href: '/privacy', label: 'Privacy Policy' },
] as const;

export const socialLinks = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'facebook', label: 'Facebook' },
] as const;
