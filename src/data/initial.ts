import { Section } from "@/types/section";

export const initialSections: Section[] = [
  {
    id: 'summary',
    title: 'Résumé',
    content: 'Résumé de votre profil',
    inPreview: false
  },
  {
    id: 'experience',
    title: 'Expérience',
    content: 'Expérience professionnelle',
    inPreview: false
  },
  {
    id: 'education',
    title: 'Éducation',
    content: 'Formation académique',
    inPreview: false
  },
  {
    id: 'skills',
    title: 'Compétences',
    content: 'Compétences techniques',
    inPreview: false
  }
];

export const columns = [
  {
    id: 'initial',
    title: 'Column 1',
  },
  {
    id: 'preview',
    title: 'Column 2',
  }
]