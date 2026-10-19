export type Lang = 'tr' | 'en';
export type Localized = { tr: string; en: string };
export type Section = { id: string; tr: string; en: string; tag: string; refs: string[] };
export type Reference = { id: string; title: string; author: string; year: string | number; url: string; scope: string };
export type EngineComponent = {
  id: string;
  parentId?: string | null;
  code: string;
  status: 'draft' | 'reviewed' | 'planned';
  category: string;
  title: Localized;
  subtitle: Localized;
  chapters: Section[];
  references: Reference[];
};
export type GlossaryTerm = { term: string; tr: string; definition_tr: string; definition_en: string };
