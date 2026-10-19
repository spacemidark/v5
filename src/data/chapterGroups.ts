import type { Section } from '../types';

export type ChapterGroup = {
  id: string;
  tr: string;
  en: string;
  chapters: Section[];
};

// Navigation taxonomy only: original chapter IDs, content files and references
// remain unchanged. Add a chapter to one group by updating the matching ID list.
const GROUPS = [
  { id: 'intro', tr: 'Genel bakış', en: 'Overview', ids: ['overview', 'architecture'] },
  { id: 'function', tr: 'Çalışma prensibi', en: 'Working principles', ids: ['principles', 'principle', 'working-principle', 'flow', 'aero', 'aerodynamics', 'actuation'] },
  { id: 'design', tr: 'Tasarım ve geometri', en: 'Design & geometry', ids: ['geometry', 'mechanical', 'mechanical-loads', 'thermal', 'thermal-clearances'] },
  { id: 'materials', tr: 'Malzemeler ve üretim', en: 'Materials & manufacturing', ids: ['materials', 'manufacturing', 'manufacture'] },
  { id: 'reliability', tr: 'Titreşim ve güvenilirlik', en: 'Vibration & reliability', ids: ['dynamics', 'vibration', 'vibration-fatigue', 'tribology', 'failure', 'failure-modes'] },
  { id: 'verification', tr: 'Montaj ve doğrulama', en: 'Assembly & verification', ids: ['interfaces', 'testing', 'inspection', 'design-checklist'] },
  { id: 'resources', tr: 'Örnekler ve kaynaklar', en: 'Examples & references', ids: ['examples', 'example', 'references'] },
] as const;

export function groupChapters(chapters: Section[]): ChapterGroup[] {
  const used = new Set<string>();
  const groups: ChapterGroup[] = GROUPS.map(group => {
    const entries = chapters.filter(chapter => group.ids.some(id => id === chapter.id));
    entries.forEach(chapter => used.add(chapter.id));
    return { id: group.id, tr: group.tr, en: group.en, chapters: entries };
  }).filter(group => group.chapters.length > 0);

  // New content authors may invent chapter IDs. Keep these visible rather than
  // hiding unrecognized chapters in the compact navigation.
  const remaining = chapters.filter(chapter => !used.has(chapter.id));
  if (remaining.length) groups.push({ id: 'other', tr: 'Diğer konular', en: 'Other topics', chapters: remaining });
  return groups;
}
