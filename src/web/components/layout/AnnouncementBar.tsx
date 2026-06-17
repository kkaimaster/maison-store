export default function AnnouncementBar() {
  const messages = [
    'FREE SHIPPING OVER $150',
    'NEW EDIT: REFINED ESSENTIALS',
    '30 DAY RETURNS',
    'COMPLIMENTARY WRAP',
    'PRIVATE STYLING',
  ];

  return (
    <div className="bg-[#11100e] text-[#fffaf0] overflow-hidden z-50 relative border-b border-white/12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-9 flex items-center justify-center md:justify-between gap-6">
        {messages.map((msg, i) => (
          <span key={msg} className={i > 0 ? 'hidden md:flex items-center gap-3' : 'flex items-center gap-3'}>
            <span className="section-label text-[10px] text-[#c8b99a]">+</span>
            <span className="section-label text-[10px] text-[#fffaf0] whitespace-nowrap">{msg}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
