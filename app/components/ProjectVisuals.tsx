import { Icon } from "./Icons";

export function OperationsVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[#08162b] shadow-2xl ${compact ? "p-4" : "p-5 md:p-7"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(47,122,255,0.24),transparent_38%)]" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d203d]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400"/><span className="h-2.5 w-2.5 rounded-full bg-amber-300"/><span className="h-2.5 w-2.5 rounded-full bg-emerald-400"/></div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-200">Operations center</span>
        </div>
        <div className="grid grid-cols-[72px_1fr] md:grid-cols-[110px_1fr]">
          <div className="border-r border-white/10 bg-[#09182d] p-3">
            {["chart","truck","ticket","portal","users"].map((name, index) => (
              <div key={name} className={`mb-2 flex h-9 items-center gap-2 rounded-lg px-2 text-[9px] ${index === 0 ? "bg-blue-500 text-white" : "text-slate-400"}`}>
                <Icon name={name as "chart"} className="h-3.5 w-3.5"/><span className="hidden md:inline">{["Overview","Fleet","eTickets","Portal","Users"][index]}</span>
              </div>
            ))}
          </div>
          <div className="p-3 md:p-5">
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {[['42','Active trucks'],['18','Open loads'],['96%','Complete']].map(([value,label]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-lg font-extrabold text-white md:text-2xl">{value}</div><div className="mt-1 text-[8px] uppercase tracking-wider text-slate-400 md:text-[10px]">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-[1.35fr_.65fr] gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="mb-4 flex items-center justify-between"><span className="text-[10px] font-bold text-white">Delivery activity</span><span className="h-2 w-2 rounded-full bg-emerald-400"/></div>
                <div className="flex h-20 items-end gap-1.5 md:h-28">
                  {[42,63,48,76,58,88,70,92,66,82,95,78].map((height,index)=><span key={index} className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400" style={{height:`${height}%`}}/>) }
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="text-[10px] font-bold text-white">Live status</div>
                <div className="mt-4 space-y-3">
                  {["Loading","In transit","Delivered"].map((label,index)=><div key={label}><div className="flex justify-between text-[8px] text-slate-400"><span>{label}</span><span>{[8,13,27][index]}</span></div><div className="mt-1 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-blue-500" style={{width:`${[35,58,86][index]}%`}}/></div></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MaterioryVisual() {
  const swatches = ["#d1a778", "#7a9b76", "#b58da8", "#8aa7c6", "#c7a45c", "#a57662"];
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#dfe9f4] bg-[#f8fbff] p-5 shadow-[0_24px_70px_rgba(23,62,103,0.12)] md:p-7">
      <div className="rounded-2xl border border-[#dde7f1] bg-white p-4 md:p-5">
        <div className="flex items-center justify-between border-b border-[#edf2f7] pb-4"><div><p className="text-xs font-bold text-[#243a52]">Materiory</p><p className="text-[9px] uppercase tracking-[0.18em] text-[#7890a7]">Creative inventory</p></div><div className="rounded-lg bg-[#243a52] px-3 py-2 text-[9px] font-bold text-white">Add material</div></div>
        <div className="mt-4 grid grid-cols-3 gap-2 md:gap-3">{[['248','Materials'],['19','Projects'],['7','Wishlist']].map(([v,l])=><div key={l} className="rounded-xl bg-[#f5f8fb] p-3"><div className="text-lg font-extrabold text-[#243a52]">{v}</div><div className="text-[8px] uppercase tracking-wider text-[#7890a7]">{l}</div></div>)}</div>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">{swatches.map((color,index)=><div key={color} className="overflow-hidden rounded-xl border border-[#edf2f7]"><div className="h-16 md:h-20" style={{background:`linear-gradient(145deg,${color},#f7f1ea)`}}/><div className="p-2"><div className="h-1.5 w-3/4 rounded bg-[#dce5ed]"/><div className="mt-2 h-1.5 w-1/2 rounded bg-[#edf2f7]"/></div></div>)}</div>
      </div>
    </div>
  );
}

export function WebsiteVisual() {
  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#eaf2ff,#f8fbff)] p-5 shadow-[0_24px_70px_rgba(23,62,103,0.12)] md:p-7">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-300/40 blur-3xl" />
      <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-white bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#edf2f7] px-4 py-3"><div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-red-300"/><span className="h-2 w-2 rounded-full bg-amber-300"/><span className="h-2 w-2 rounded-full bg-emerald-300"/></div><div className="h-2 w-28 rounded-full bg-[#edf2f7]"/></div>
        <div className="grid min-h-[260px] grid-cols-[1.1fr_.9fr]">
          <div className="p-6 md:p-8"><div className="h-2 w-20 rounded bg-blue-500"/><div className="mt-5 h-5 w-full rounded bg-[#132d4a]"/><div className="mt-2 h-5 w-4/5 rounded bg-[#132d4a]"/><div className="mt-5 space-y-2"><div className="h-2 w-full rounded bg-[#dce6f0]"/><div className="h-2 w-5/6 rounded bg-[#dce6f0]"/><div className="h-2 w-3/4 rounded bg-[#dce6f0]"/></div><div className="mt-7 h-9 w-32 rounded-lg bg-blue-600"/></div>
          <div className="relative m-4 overflow-hidden rounded-xl bg-[#0b2442]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,.8),transparent_35%)]"/><div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur"><div className="h-2 w-3/4 rounded bg-white/70"/><div className="mt-2 h-2 w-1/2 rounded bg-white/30"/></div></div>
        </div>
      </div>
    </div>
  );
}
