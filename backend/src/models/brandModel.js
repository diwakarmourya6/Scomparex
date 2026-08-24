/**
 * Brand model — query helpers for the brands table using Prisma.
 */
const { prisma } = require('../config/database');

async function findAll() {
  const brands = await prisma.brand.findMany({
    include: {
      _count: {
        select: { smartphones: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  return brands.map((b) => ({
    id: b.id,
    name: b.name,
    slug: b.slug,
    logo_url: b.logoUrl,
    country: b.country,
    phone_count: b._count.smartphones,
  }));
}

async function findById(id) {
  const brand = await prisma.brand.findUnique({
    where: { id: parseInt(id, 10) },
  });
  return brand ? {
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
    logo_url: brand.logoUrl,
    country: brand.country,
    created_at: brand.createdAt,
  } : null;
}

async function findBySlug(slug) {
  const brand = await prisma.brand.findUnique({
    where: { slug },
  });
  return brand ? {
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
    logo_url: brand.logoUrl,
    country: brand.country,
    created_at: brand.createdAt,
  } : null;
}

async function findByName(name) {
  const brand = await prisma.brand.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
  });
  return brand ? {
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
    logo_url: brand.logoUrl,
    country: brand.country,
    created_at: brand.createdAt,
  } : null;
}

module.exports = { findAll, findById, findBySlug, findByName };
