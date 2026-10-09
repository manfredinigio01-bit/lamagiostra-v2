import { Users } from 'lucide-react';
import { staff } from '../data/team';

interface Props {
  language: string;
}

export default function StaffPage({ language }: Props) {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-emerald-700 text-white py-12 sm:py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 text-emerald-300" />
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            {language === 'it' ? 'Il Nostro Team' : 'Our Team'}
          </h1>
          <p className="text-emerald-200 text-base sm:text-lg max-w-xl mx-auto">
            {language === 'it'
              ? 'Le persone che ogni giorno rendono La Magiostra un posto speciale.'
              : 'The people who make La Magiostra a special place every day.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {staff.map((member) => (
            <div key={member.name} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white">
              <div className="relative w-full h-80 overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-xl leading-tight drop-shadow">{member.name}</h3>
                  <p className="text-emerald-200 text-sm mt-0.5 drop-shadow">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
