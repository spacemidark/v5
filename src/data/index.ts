import catalog from './catalog.json';
import glossary from './glossary.json';
import type { EngineComponent, GlossaryTerm, Lang } from '../types';
import type { ComponentType } from 'react';

// v5: LPC and its descendants are hidden from the published interface.
// Their original catalog entries and MDX chapters are retained for future authoring.
const allComponents = catalog.components as EngineComponent[];
const excludedIds = new Set(['lpc']);
let changed = true;
while (changed) {
  changed = false;
  for (const entry of allComponents) {
    if (entry.parentId && excludedIds.has(entry.parentId) && !excludedIds.has(entry.id)) {
      excludedIds.add(entry.id);
      changed = true;
    }
  }
}
export const components = allComponents.filter(entry => !excludedIds.has(entry.id));
export const glossaryTerms = glossary as GlossaryTerm[];

// Vite imports new MDX files automatically; each article section is independently editable.
const pages = import.meta.glob('../../content/**/*.mdx', { eager: true }) as Record<
  string,
  { default: ComponentType<{ components?: Record<string, ComponentType<any>> }> }
>;

export function loadSection(componentId: string, sectionId: string, lang: Lang) {
  return pages[`../../content/${componentId}/${sectionId}.${lang}.mdx`]?.default ?? null;
}
