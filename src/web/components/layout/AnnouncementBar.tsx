export default function AnnouncementBar() {
  const messages = [
    'FREE SHIPPING ON ORDERS OVER $150',
    'CURRENT SEASON: REFINED ESSENTIALS',
    'FREE RETURNS WITHIN 30 DAYS',
    'COMPLIMENTARY GIFT WRAPPING AVAILABLE',
    'PRIVATE STYLING BY APPOINTMENT',
  ];

  return (
    <div className="bg-[#1A1A18] text-[#F0EDE6] overflow-hidden z-50 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-9 flex items-center justify-center md:justify-between gap-6">
        {messages.map((msg, i) => (
          <span key={msg} className={i > 0 ? 'hidden md:flex items-center gap-3' : 'flex items-center gap-3'}>
            <span className="section-label text-[10px] text-[#C9A96E]">✦</span>
            <span className="section-label text-[10px] text-[#F0EDE6] whitespace-nowrap">{msg}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
