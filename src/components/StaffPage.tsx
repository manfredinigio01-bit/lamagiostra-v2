import { Users, ArrowRight } from 'lucide-react';
import { haScheda, staff, type StaffMember } from '../data/team';
import { personaPath } from '../lib/routes';

interface Props {
  language: string;
  onOpen: (path: string) => void;
}

export default function StaffPage({ language, onOpen }: Props) {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-emerald-700 text-white py-12 sm:py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 text-emerald-300" />
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            {language === 'it' ? 'Il Nostro Team' : 'Our Team'}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {staff.map((member) =>
            haScheda(member) ? (
              <a
                key={member.slug}
                href={personaPath(member.slug)}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  onOpen(personaPath(member.slug));
                }}
                className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white"
              >
                <Scheda member={member} language={language} apribile />
              </a>
            ) : (
              <div key={member.slug} className="rounded-2xl overflow-hidden shadow-md bg-white">
                <Scheda member={member} language={language} apribile={false} />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

/** Foto, nome e reparto; con "Scopri di più" solo se la scheda si apre. */
function Scheda({ member, language, apribile }: { member: StaffMember; language: string; apribile: boolean }) {
  return (
              <div className="relative w-full h-80 overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-emerald-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-xl leading-tight drop-shadow-sm">{member.name}</h3>
                  <p className="text-emerald-200 text-sm mt-0.5 drop-shadow-sm">{language === 'it' ? member.role : member.role_en}</p>
                  {apribile && (
                    <p className="mt-2 inline-flex items-center gap-1 text-white text-xs font-semibold drop-shadow-sm">
                      {language === 'it' ? 'Scopri di più' : 'Learn more'}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </p>
                  )}
                </div>
              </div>
  );
}
