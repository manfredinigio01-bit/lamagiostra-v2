import type { StaffMember } from '../data/team';
import { SUGGERIMENTI_STAFF } from '../data/team';
import { pathFor } from '../lib/routes';
import DettaglioLayout from './DettaglioLayout';

interface Props {
  language: string;
  member: StaffMember;
  onBack: () => void;
}

export default function PersonaPage({ language, member, onBack }: Props) {
  const it = language === 'it';
  return (
    <DettaglioLayout
      language={language}
      backHref={pathFor('staff')}
      backLabel={it ? 'Torna al team' : 'Back to the team'}
      onBack={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onBack();
      }}
      media={
        <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-stone-200 shadow-md">
          <img src={member.photo} alt={member.name} decoding="async" className="w-full h-full object-cover" />
        </div>
      }
      kicker={it ? member.role : member.role_en}
      title={member.name}
      descrizione={member.descrizione}
      dettagli={member.dettagli}
      suggerimenti={SUGGERIMENTI_STAFF}
    />
  );
}
