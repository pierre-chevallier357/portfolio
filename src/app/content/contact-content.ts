export interface ContactContent {
  mailTitle: string;
  socialMediasTitle: string;
  copyLabel: string;
  copiedLabel: string;
  email: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  name: string;
  href: string;
}
