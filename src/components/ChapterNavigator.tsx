import { useEffect, useMemo, useState } from 'react';
import { groupChapters } from '../data/chapterGroups';
import type { Lang, Section } from '../types';

type Props = {
  chapters: Section[];
  selectedId: string;
  language: Lang;
  onSelect: (sectionId: string) => void;
};

export function ChapterNavigator({ chapters, selectedId, language, onSelect }: Props) {
  const groups = useMemo(() => groupChapters(chapters), [chapters]);
  const selectedGroup = groups.find(group => group.chapters.some(ch => ch.id === selectedId))?.id ?? groups[0]?.id ?? '';
  const [expanded, setExpanded] = useState(selectedGroup);

  // Opening a deep link, switching components, or selecting a subtopic should
  // reveal the group that contains the current article.
  useEffect(() => setExpanded(selectedGroup), [selectedGroup]);

  return <nav className="toc" aria-label={language === 'tr' ? 'Teknik bölüm gezintisi' : 'Engineering chapter navigation'}>
    <div className="toc-top">
      <span>{language === 'tr' ? 'TEKNİK BÖLÜMLER' : 'TECHNICAL SECTIONS'}</span>
      <small>{groups.length.toString().padStart(2,'0')} {language === 'tr' ? 'ANA BAŞLIK' : 'GROUPS'}</small>
    </div>
    <div className="toc-groups">
      {groups.map((group, groupIndex) => {
        const open = expanded === group.id;
        const containsSelected = group.chapters.some(ch => ch.id === selectedId);
        return <div key={group.id} className={`toc-group ${containsSelected ? 'has-selection' : ''}`}>
          <button
            type="button"
            className={`toc-group-button ${open ? 'expanded' : ''}`}
            aria-expanded={open}
            aria-controls={`toc-group-${group.id}`}
            onClick={() => setExpanded(open ? '' : group.id)}
          >
            <span className="toc-no">{String(groupIndex + 1).padStart(2, '0')}</span>
            <span className="toc-group-label">{group[language]}</span>
            <span className="toc-group-count">{group.chapters.length}</span>
            <span className="toc-chevron" aria-hidden="true">{open ? '⌄' : '›'}</span>
          </button>
          {open && <div id={`toc-group-${group.id}`} className="toc-subtopics">
            {group.chapters.map((chapter, i) => <button
              key={chapter.id}
              type="button"
              className={`toc-subtopic ${chapter.id === selectedId ? 'active' : ''}`}
              onClick={() => onSelect(chapter.id)}
              aria-current={chapter.id === selectedId ? 'page' : undefined}
            >
              <span className="toc-subtopic-index">{String(i + 1).padStart(2, '0')}</span>
              <span>{chapter[language]}</span>
            </button>)}
          </div>}
        </div>;
      })}
    </div>
    <div className="toc-bottom">✦ &nbsp; {language === 'tr' ? `${chapters.length} konu, ${groups.length} ana başlık altında` : `${chapters.length} topics in ${groups.length} groups`}</div>
  </nav>;
}
