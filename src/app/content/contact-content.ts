export interface ContactContent {
  mailTitle: string;
  emailMeLabel: string;
  socialMediasTitle: string;
  copyLabel: string;
  copiedLabel: string;
  email: string;
  socialLinks: SocialLink[];
  resumeTitle: string;
  downloadResumeLabel: string;
}

export interface SocialLink {
  name: string;
  href: string;
}
