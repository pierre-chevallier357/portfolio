export interface EducationContent {
  certificationsTitle: string;
  certifications: Certification[];
  educationTitle: string;
  education: Education[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  description: string;
}
