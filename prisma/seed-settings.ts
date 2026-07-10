import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const settings = [
  // About — mission
  { key: "about.mission", value: "Dr. Vithalrao Vikhe Patil Foundation's Vocational Training Centre offers affordable, quality, employment-oriented paramedical education through one-year certificate programmes with extensive hands-on clinical training at Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital, Ahilyanagar. Our mission is to bridge the gap between healthcare services and skilled human resources by preparing competent, compassionate healthcare personnel capable of supporting doctors, nurses, and other healthcare professionals in delivering quality patient care." },
  { key: "about.established", value: "2026" },

  // Anti-Ragging
  { key: "antiragging.helpline", value: "1800-180-5522" },
  { key: "antiragging.email", value: "helpline@antiragging.in" },
  { key: "antiragging.portalUrl", value: "https://antiragging.in" },
];

async function main() {
  console.log("Seeding settings...");

  const keepKeys = settings.map((s) => s.key);
  const stale = await prisma.setting.findMany({ where: { key: { notIn: keepKeys } } });
  for (const s of stale) {
    await prisma.setting.delete({ where: { id: s.id } });
    console.log(`  - Removed outdated setting: ${s.key}`);
  }

  for (const s of settings) {
    const existing = await prisma.setting.findUnique({ where: { key: s.key } });
    if (!existing) {
      await prisma.setting.create({ data: s });
      console.log(`  ✓ ${s.key}`);
    } else {
      await prisma.setting.update({ where: { key: s.key }, data: { value: s.value } });
      console.log(`  ~ ${s.key} (updated)`);
    }
  }
  console.log("\nSettings seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
