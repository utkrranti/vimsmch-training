export default function UGCTopBar() {
  return (
    <div className="bg-[#04415f] border-t-2 border-b-2 border-[#2086b8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-xs text-white">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-semibold">UGC Recognised</span>
          <span className="opacity-50">|</span>
          <span>2(f) &amp; 12(B) Certified</span>
          <span className="opacity-50">|</span>
          <span>Affiliated to [University Name]</span>
          <span className="opacity-50">|</span>
          <span>NAAC Accredited</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#2086b8]">Anti-Ragging Helpline:</span>
          <a
            href="tel:18001805522"
            className="font-bold underline underline-offset-2 hover:text-[#2086b8] transition-colors"
          >
            1800-180-5522
          </a>
          <span className="opacity-50">|</span>
          <a
            href="https://antiragging.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#2086b8] transition-colors"
          >
            antiragging.in
          </a>
        </div>
      </div>
    </div>
  );
}
