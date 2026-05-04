import { useState } from 'react'

export default function PptBigQuotePage() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-8" style={{ color: '#86868b' }}>Big Quote · 大引言</div>
          <blockquote className="relative">
            <div className="absolute -top-8 -left-4 text-[120px] leading-none" style={{ color: '#e5e5e7', fontFamily: "'Georgia', serif" }}>"</div>
            <p className="text-[48px] font-bold leading-[1.2] pl-12 pr-8" style={{ color: '#1d1d1f' }}>
              好的设计是尽可能<span style={{ color: '#0071e3' }}>少</span>的设计
            </p>
            <div className="mt-8 pl-12 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full" style={{ background: '#0071e3' }} />
              <div>
                <div className="text-lg font-bold" style={{ color: '#1d1d1f' }}>Dieter Rams</div>
                <div className="text-sm" style={{ color: '#86868b' }}>德国工业设计师</div>
              </div>
            </div>
          </blockquote>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Big Quote Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
