import { SocialLink } from './social-link';

export interface ContactContent {
  mailTitle: string;
  socialMediasTitle: string;
  copyLabel: string;
  copiedLabel: string;
  email: string;
  socialLinks: SocialLink[];
}
