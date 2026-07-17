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
//  Data  ← แก้ไขข้อมูลนักเรียนตรงนี้
// ─────────────────────────────────────────────
const YEARBOOK_DATA: YearbookData[] = [
  {
    model: 'SMAI-05',
    year: '2569',
    students: [
      { id: 1, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 2, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 3, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 4, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 5, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 6, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
    ],
  },
  {
    model: 'SMAI-04',
    year: '2568',
    students: [
      { id: 1, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 2, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 3, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 4, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
    ],
  },
  {
    model: 'SMAI-03',
    year: '2567',
    students: [
      { id: 1, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 2, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 3, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
    ],
  },
  {
    model: 'SMAI-02',
    year: '2566',
    students: [
      { id: 1, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 2, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
    ],
  },
  {
    model: 'SMAI-01',
    year: '2565',
    students: [
      { id: 1, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
      { id: 2, fullName: 'ชื่อ นามสกุล', nickname: 'ชื่อเล่น', instagram: 'username' },
    ],
  },
];

// ─────────────────────────────────────────────
//  Avatar placeholder
// ─────────────────────────────────────────────
function AvatarPlaceholder({ nickname }: { nickname: string }) {
  const initials = nickname.slice(0, 2);
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#05086e]/10 to-[#DA5F8E]/20">
      <span className="font-prompt font-bold text-[#05086e]/50 text-3xl select-none">
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
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Photo */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
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

        {/* IG icon on hover */}
        {student.instagram && (
          <a
            href={`https://instagram.com/${student.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-white/40"
            aria-label={`Instagram ของ ${student.nickname}`}
          >
            <Instagram size={18} />
          </a>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-4">
        <p className="font-prompt font-semibold text-[#05086e] text-sm leading-snug truncate">
          {student.fullName}
        </p>
        <p className="font-prompt text-[#DA5F8E] text-xs mt-0.5 font-medium">
          "{student.nickname}"
        </p>
        {student.instagram && (
          <a
            href={`https://instagram.com/${student.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-xs text-gray-400 hover:text-[#DA5F8E] transition-colors font-prompt"
          >
            <Instagram size={11} />
            @{student.instagram}
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
    <section id="yearbook-section" className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col lg:flex-row gap-8">

        {/* ── Sidebar ── */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="sticky top-28 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-[#05086e] font-bold font-prompt text-base mb-4 pb-3 border-b border-gray-100">
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
                        ? 'text-[#DA5F8E] bg-pink-50 border border-pink-100 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#05086e]'
                    }`}
                  >
                    <span>{model}</span>
                    <span className={`text-[11px] font-normal ${activeModel === model ? 'text-pink-300' : 'text-gray-400'}`}>
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
          <div className="mb-8">
            <div className="flex items-end gap-3 mb-1">
              <h1 className="text-3xl font-bold text-[#05086e] font-prompt">{currentData.model}</h1>
              <span className="text-sm text-gray-400 font-prompt mb-1">ปีการศึกษา {currentData.year}</span>
            </div>
            <div className="w-16 h-1 bg-[#DA5F8E]" />
            <p className="text-gray-400 font-prompt text-sm mt-3">
              นักเรียนทั้งหมด {currentData.students.length} คน
            </p>
          </div>

          {/* Cards Grid */}
          {currentData.students.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
              {currentData.students.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-gray-300">
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
