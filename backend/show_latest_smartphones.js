require('dotenv').config();
const { prisma } = require('./src/config/database.js');

async function main() {
  console.log("📱 Fetching the latest 10 smartphones for each brand...\n");

  // Fetch all brands ordered alphabetically
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' }
  });

  if (brands.length === 0) {
    console.log("No brands found in the database.");
    return;
  }

  for (const brand of brands) {
    // Fetch the latest 10 smartphones for this brand
    // We order by 'createdAt' descending to get the newest ones
    const phones = await prisma.smartphone.findMany({
      where: { brandId: brand.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    if (phones.length === 0) {
      console.log(`\n=== 🏢 ${brand.name} (0 smartphones) ===`);
      console.log("  No smartphones found.");
    } else {
      console.log(`\n=== 🏢 ${brand.name} (${phones.length} smartphones) ===`);
      phones.forEach((p, idx) => {
        console.log(`  ${idx + 1}. ${p.name} (₹${p.price.toLocaleString('en-IN')})`);
      });
    }
  }
}

main()
  .catch((e) => {
    console.error("❌ Error fetching data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("\n✅ Done!");
  });
