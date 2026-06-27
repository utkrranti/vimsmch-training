const stats = [
  { value: "10+", label: "Vocational Courses", sub: "UGC Approved" },
  { value: "500+", label: "Students Trained", sub: "Since Inception" },
  { value: "20+", label: "Expert Faculty", sub: "Industry Professionals" },
  { value: "450+", label: "Certificates Issued", sub: "Govt. Recognised" },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center py-4 ${i < stats.length - 1 ? "lg:border-r lg:border-[#cdd8de]" : ""}`}
          >
            <p className="text-4xl font-bold text-[#04415f] mb-1">{s.value}</p>
            <p className="text-[#011e2c] font-semibold text-sm">{s.label}</p>
            <p className="text-[#010608]/40 text-xs mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
