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

  bookingCtaLabel: 'Express interest',
  bookingTrustCopy:
    'We are currently in prelaunch. Share your interest and we will reach out when we open officially.',

  contactFormPrelaunchNote:
    'We are currently in prelaunch and not yet accepting appointments. Submit this form to express your interest — we will contact you when we open officially. Please do not include clinical or health information.',

  contactFormSubmitLabel: 'Express interest',
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
    instagram: '',
    linkedin: '',
  },

  team: {
    founder: {
      name: 'Christian Evans',
      title: 'Founder',
      pronouns: '',
      bio: 'Bio coming soon. Christian founded Woven Sage Counseling with a vision to make thoughtful, connection-centered mental health care accessible across South Florida and beyond.',
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
    'Trauma',
    'Grief & loss',
    'Life transitions',
    'ADHD',
    'Substance use',
    'Relationship issues',
  ],
} as const;

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
