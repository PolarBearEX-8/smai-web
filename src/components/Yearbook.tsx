/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Instagram } from 'lucide-react';

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.split('/').map(encodeURIComponent).join('/')}`;

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
interface Student {
  id: number;
  fullName: string;
  nickname: string;
  instagram?: string;
  photo?: string; // path relative to public/
}

interface YearbookData {
  model: string;
  year: string;
  students: Student[];
}

// ─────────────────────────────────────────────
//  Raw student data  ← แก้ข้อมูลตรงนี้เลย!
//  ใส่ชื่อในแต่ละ array ให้ตรงกันตามลำดับ
//  เช่น fullname[0] + nickname[0] + instagram[0] = นักเรียนคนที่ 1
// ─────────────────────────────────────────────

// helper: รับ parallel arrays แล้ววน loop รวมเป็น Student[]
function makeStudents(data: {
  fullname:  string[];
  nickname:  string[];
  instagram?: string[];
  photo?:    string[];
}): Student[] {
  return data.fullname.map((fullName, i) => ({
    id:        i + 1,
    fullName,
    nickname:  data.nickname[i]  ?? '',
    instagram: data.instagram?.[i],
    photo:     data.photo?.[i],
  }));
}
const TEACHER = makeStudents({
  fullname:  ['ณัฐสิทธิ์ ประจิม', 'จินตนา คงอ่ำ', 'ศิริรัฐพล ไตรสังข์','สัญชัย วัชรพรรณ','นพวิชญ์ วงค์สม','ภูมิ สารักษ์'],
  nickname:  ['พี่ก๊อปปี้','พี่อ้อม','พี่แซ็ค','พี่เอ็กซ์','พี่บรอนซ์','พี่ภูมิ'],
  instagram: ['jarnjim.is.khuncool','-','zacksophone_kme','-','bronopphawich','-'],
})
// ── SMAI-05 (2569) ──────────────────────────
const SMAI05 = makeStudents({
  fullname:  ['ชื่อ นามสกุล', 'ชื่อ นามสกุล', 'ชื่อ นามสกุล'],
  nickname:  ['ชื่อเล่น',     'ชื่อเล่น',     'ชื่อเล่น'    ],
  instagram: ['username',     'username',     'username'    ],
});

// ── SMAI-04 (2568) ──────────────────────────
const SMAI04 = makeStudents({
  fullname:  ['ปภังกร ศักดิ์แสน', 'ยศตระกูล ส่งตระกูล', 'ชรัณ พงศ์ธนากุล', 'ณัทรา วสุธนานนท์', 'สิวราพร รอดภัย', 'ชยุต อินทร์รุ่ง', 'เดชพันธุ์ ยอดสีหรัตน์', 'ทัศภูมิ จรัสตระกูล', 'แทนชนก เรืองโชติช่วง', 'ธนภูมิ อ้อยสิน', 'นันทพัทธ์ แย้มพราหมณ์', 'พรพิพัฒน์ เชื้อตาลี', 'พีรวัส เพ็ชรอำไพ', 'ภัทรภีร์ ธรรมพุทธพงศ์', 'ภีมรภีร์ ธรรมพุทธพงศ์', 'วิชยุตม์ แสงจันทร์ศิริ', 'เรืองยศ ทองงาม', 'อนิวัตติ์ เมฆวิมานรัตน์', 'อำนาจ พรมดี', 'ณิชกานต์ สุวัจนธาดาพงศ์', 'มีนา เจริญมาตย์', 'สุภัททรีญา พิมศรี', 'วรกนก ทองถึง', 'จิรเมธ พุ่มหอม', 'ธนัชชัย บุญธนะ', 'ยศวริศ ชัยธวัลภัสร์', 'อัฑฒกร มงคลคี', 'กัญญาวรัตน์ นนท์ธนสรณ์', 'ชนันธร จักรกฤษณ์'],
  nickname:  ['ยู', 'ออโต้', 'วิน', 'ณิลิน', 'คาราเมล', 'ตะวัน', 'พี', 'ภูมิ', 'ติ๊กเกอร์', 'คุน', 'มาร์ค', 'น้ำมนต์', 'แบงก์', 'ภัทร', 'ภีม', 'บลู', 'เจ้าคุณ', 'เพชร', 'โอวัลติน', 'ณิชา', 'มีนา', 'อุ๋งอิ๋ง', 'นิด้า', 'ต้นน้ำ', 'มิก', 'เอลฟ์', 'พอตเตอร์', 'มิ้นท์', 'ปาร์ตี้'],
  instagram: ['zyx_._uy','hello_simp555','win_aviation','tue4agust','s.oracrmel','-','pee_dekaer','sue._ak','a.b.e.l.1565','txnap_om','pakahoe_m','mailuqwe','peerawatzeros','ph4t_t','stellaron_raccoon','skidder24','jaowyahh','aniwat2553','ov4ltinnn','shestheonenichy','mtyuid_o.o','babeshawtyae','bbyflowerlunchy','tnmjrm','v4ri4ble_','yr_chp','pott.o4r.june','tyq4wr','__18.35__'],
  // เพิ่มชื่อในแต่ละ array ให้ตรงกันตามลำดับ ↓
});

// ── SMAI-03 (2567) ──────────────────────────
const SMAI03 = makeStudents({
  fullname:  ['ชื่อ นามสกุล', 'ชื่อ นามสกุล', 'ชื่อ นามสกุล'],
  nickname:  ['ชื่อเล่น',     'ชื่อเล่น',     'ชื่อเล่น'    ],
  instagram: ['username',     'username',     'username'    ],
});

// ── SMAI-02 (2566) ──────────────────────────
const SMAI02 = makeStudents({
  fullname:  ['ชื่อ นามสกุล', 'ชื่อ นามสกุล'],
  nickname:  ['ชื่อเล่น',     'ชื่อเล่น'    ],
  instagram: ['username',     'username'    ],
});

// ── SMAI-01 (2565) ──────────────────────────
const SMAI01 = makeStudents({
  fullname:  ['ชื่อ นามสกุล', 'ชื่อ นามสกุล'],
  nickname:  ['ชื่อเล่น',     'ชื่อเล่น'    ],
  instagram: ['username',     'username'    ],
});

// ─────────────────────────────────────────────
//  Yearbook Data  ← ห้ามแก้ส่วนนี้ แก้ที่ด้านบนแทน
// ─────────────────────────────────────────────
const YEARBOOK_DATA: YearbookData[] = [
  { model: 'Teacher', year: 'all the time', students: TEACHER },
  { model: 'SMAI-05', year: '2569', students: SMAI05 },
  { model: 'SMAI-04', year: '2568', students: SMAI04 },
  { model: 'SMAI-03', year: '2567', students: SMAI03 },
  { model: 'SMAI-02', year: '2566', students: SMAI02 },
  { model: 'SMAI-01', year: '2565', students: SMAI01 },
];

// ─────────────────────────────────────────────
//  Avatar placeholder
// ─────────────────────────────────────────────
function AvatarPlaceholder({ nickname }: { nickname: string }) {
  const initials = nickname.slice(0, 2);
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#05086e]/10 to-[#DA5F8E]/20 dark:from-[#93a5ff]/10 dark:to-[#DA5F8E]/25">
      <span className="font-prompt font-bold text-[#05086e]/50 dark:text-[#93a5ff]/60 text-3xl select-none">
        {initials}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Student Card
// ─────────────────────────────────────────────
function StudentCard({ student }: { student: Student; key?: string | number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative bg-white dark:bg-[#18181b] rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300">
      {/* Photo */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-white/5">
        {student.photo && !imgError ? (
          <img
            src={asset(student.photo)}
            alt={student.nickname}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <AvatarPlaceholder nickname={student.nickname} />
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* IG icon — hover-revealed on desktop, always tappable on touch screens */}
        {student.instagram && (
          <a
            href={`https://instagram.com/${student.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 p-2 bg-black/30 sm:bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-300 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 hover:bg-white/40"
            aria-label={`Instagram ของ ${student.nickname}`}
          >
            <Instagram size={16} className="sm:hidden" />
            <Instagram size={18} className="hidden sm:block" />
          </a>
        )}
      </div>

      {/* Info */}
      <div className="px-3 py-3 sm:px-4 sm:py-4">
        <p className="font-prompt font-semibold text-[#05086e] dark:text-[#93a5ff] text-[13px] sm:text-sm leading-snug line-clamp-2">
          {student.fullName}
        </p>
        <p className="font-prompt text-[#DA5F8E] text-xs mt-0.5 font-medium truncate">
          "{student.nickname}"
        </p>
        {student.instagram && (
          <a
            href={`https://instagram.com/${student.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-full items-center gap-1 mt-2 text-xs text-gray-400 dark:text-gray-500 hover:text-[#DA5F8E] dark:hover:text-[#DA5F8E] transition-colors font-prompt"
          >
            <Instagram size={11} className="flex-shrink-0" />
            <span className="truncate">@{student.instagram}</span>
          </a>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Main Yearbook Component
// ─────────────────────────────────────────────
interface YearbookProps {
  activeModel: string;
  setActiveModel: (model: string) => void;
}

export function Yearbook({ activeModel, setActiveModel }: YearbookProps) {
  const models = YEARBOOK_DATA.map((d) => d.model);
  const currentData = YEARBOOK_DATA.find((d) => d.model === activeModel) ?? YEARBOOK_DATA[0];

  return (
    <section id="yearbook-section" className="min-h-screen bg-gray-50 dark:bg-[#0d0d0f]">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 py-8 sm:py-12 flex flex-col lg:flex-row gap-6 lg:gap-8">

        {/* ── Mobile / tablet: horizontal tab strip ── */}
        <div className="lg:hidden -mx-5 sm:-mx-10">
          <h3 className="text-[#05086e] dark:text-[#93a5ff] font-bold font-prompt text-base mb-3 px-5 sm:px-10">
            ทำเนียบรุ่น
          </h3>
          <nav className="flex gap-2 overflow-x-auto px-5 sm:px-10 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {models.map((model) => {
              const data = YEARBOOK_DATA.find((d) => d.model === model)!;
              return (
                <button
                  key={model}
                  onClick={() => setActiveModel(model)}
                  className={`flex-shrink-0 rounded-xl border px-4 py-2.5 font-prompt text-sm font-medium transition-all duration-200 ${
                    activeModel === model
                      ? 'text-[#DA5F8E] bg-pink-50 border-pink-100 shadow-sm dark:bg-[#DA5F8E]/15 dark:border-[#DA5F8E]/30'
                      : 'text-gray-600 bg-white border-gray-100 hover:text-[#05086e] dark:text-gray-300 dark:bg-[#18181b] dark:border-white/10 dark:hover:text-white'
                  }`}
                >
                  <span className="block whitespace-nowrap">{model}</span>
                  <span className={`block text-[10px] font-normal whitespace-nowrap ${activeModel === model ? 'text-pink-300 dark:text-[#DA5F8E]/70' : 'text-gray-400 dark:text-gray-500'}`}>
                    {data.year}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Sidebar (desktop) ── */}
        <aside className="hidden lg:block lg:w-56 flex-shrink-0">
          <div className="sticky top-28 bg-white dark:bg-[#18181b] rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 p-5">
            <h3 className="text-[#05086e] dark:text-[#93a5ff] font-bold font-prompt text-base mb-4 pb-3 border-b border-gray-100 dark:border-white/10">
              ทำเนียบรุ่น
            </h3>
            <nav className="flex flex-col gap-1">
              {models.map((model) => {
                const data = YEARBOOK_DATA.find((d) => d.model === model)!;
                return (
                  <button
                    key={model}
                    onClick={() => setActiveModel(model)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-prompt text-sm font-medium transition-all duration-200 flex flex-col gap-0.5 ${
                      activeModel === model
                        ? 'text-[#DA5F8E] bg-pink-50 border border-pink-100 shadow-sm dark:bg-[#DA5F8E]/15 dark:border-[#DA5F8E]/30'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#05086e] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                    }`}
                  >
                    <span>{model}</span>
                    <span className={`text-[11px] font-normal ${activeModel === model ? 'text-pink-300 dark:text-[#DA5F8E]/70' : 'text-gray-400 dark:text-gray-500'}`}>
                      ปีการศึกษา {data.year}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap items-end gap-x-3 gap-y-1 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#05086e] dark:text-[#93a5ff] font-prompt">{currentData.model}</h1>
              <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-prompt mb-1">ปีการศึกษา {currentData.year}</span>
            </div>
            <div className="w-16 h-1 bg-[#DA5F8E]" />
            <p className="text-gray-400 dark:text-gray-500 font-prompt text-sm mt-3">
              นักเรียนทั้งหมด {currentData.students.length} คน
            </p>
          </div>

          {/* Cards Grid */}
          {currentData.students.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
              {currentData.students.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-gray-300 dark:text-gray-600">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="font-prompt text-lg">ยังไม่มีข้อมูลนักเรียนในรุ่นนี้</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
