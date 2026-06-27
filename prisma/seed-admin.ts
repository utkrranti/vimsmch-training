import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "utkrranti@gmail.com";
  const password = "Admin@1234";
  const hash = await bcrypt.hash(password, 12);

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (!existing) {
    await prisma.adminUser.create({
      data: { email, password: hash, name: "Utkrranti Admin", role: "SUPER_ADMIN" },
    });
    console.log(`✓ Admin created: ${email} / ${password}`);
  } else {
    console.log(`~ Admin already exists: ${email}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
