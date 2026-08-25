export type ResumeLayout = 'classic' | 'modern' | 'minimalist';

export interface ResumeData {
  layout: ResumeLayout;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    portfolio: string;
  };
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }[];
  skills: string;
  projects: {
    id: string;
    title: string;
    link: string;
    description: string;
  }[];
}

export const initialResumeData: ResumeData = {
  layout: 'classic',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    location: '',
    portfolio: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: '',
  projects: [],
};
