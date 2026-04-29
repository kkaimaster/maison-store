export default function AnnouncementBar() {
  const messages = [
    'FREE SHIPPING ON ORDERS OVER $150',
    'NEW ARRIVALS: SUMMER ESSENTIALS',
    'FREE RETURNS WITHIN 30 DAYS',
    'COMPLIMENTARY GIFT WRAPPING AVAILABLE',
    'SHOP THE SUMMER SALE — UP TO 30% OFF',
  ];

  const repeated = [...messages, ...messages];

  return (
    <div className="bg-[#1A1A18] text-[#F0EDE6] overflow-hidden py-2.5 z-50 relative">
      <div className="marquee-track">
        {repeated.map((msg, i) => (
          <span key={i} className="flex items-center gap-8 px-8">
            <span className="section-label text-[10px] text-[#C9A96E]">✦</span>
            <span className="section-label text-[10px] text-[#F0EDE6]">{msg}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
