// prisma/seed.ts

import bcrypt from 'bcrypt';
import { prisma } from './prisma';
import { Role, StationType, ServiceCategory, BookingStatus, BookingSource, PaymentMethod, PaymentStatus, SocialPlatform, ContentPlatform } from '@/lib/generated/prisma/enums';


async function main() {
  console.log('🌱 Starting seeding process...');

  // --------------------------------------------------------
  // 1. CLEANUP (Hapus data lama)
  // --------------------------------------------------------
  // Urutan hapus: Child -> Parent (agar tidak kena foreign key constraint)
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.storeStation.deleteMany();
  await prisma.blockedDate.deleteMany();
  await prisma.service.deleteMany();
  await prisma.store.deleteMany();
  await prisma.socialMedia.deleteMany();
  await prisma.seoConfig.deleteMany();
  await prisma.content.deleteMany();
  await prisma.promo.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Database cleaned.');

  // --------------------------------------------------------
  // 2. CREATE USERS
  // --------------------------------------------------------
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin Queenza',
      email: 'admin@queenza.com',
      password: hashedPassword,
      role: Role.ADMIN,
      phone: '08123456789',
      image: 'https://i.pravatar.cc/150?img=11',
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: 'Siti Customer',
      email: 'siti@gmail.com',
      password: hashedPassword,
      role: Role.USER,
      phone: '08198765432',
      tier: 'Gold',
      points: 150,
      image: 'https://i.pravatar.cc/150?img=5',
    },
  });

  console.log('👤 Users created.');

  // --------------------------------------------------------
  // 3. CREATE STORES & STATIONS
  // --------------------------------------------------------
  
  // Store 1: Kemang
  const storeKemang = await prisma.store.create({
    data: {
      name: 'Queenza Beauty Kemang',
      address: 'Jl. Kemang Raya No. 88, Jakarta Selatan',
      city: 'Jakarta',
      phone: '021-7890123',
      openTime: '09:00',
      closeTime: '20:00',
      description: 'Cabang pusat dengan fasilitas terlengkap dan VIP Room.',
      image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=600',
      mapUrl: 'https://goo.gl/maps/exampleKemang',
      lateTolerance: 15,
      stations: {
        create: [
          { type: StationType.LASH_BED, quantity: 3 },   
          { type: StationType.NAIL_CHAIR, quantity: 2 }, 
        ],
      },
    },
  });

  // Store 2: Bekasi
  const storeBekasi = await prisma.store.create({
    data: {
      name: 'Queenza Beauty Bekasi',
      address: 'Ruko Grand Galaxy City Blok RGA, Bekasi',
      city: 'Bekasi',
      phone: '021-8899776',
      openTime: '10:00',
      closeTime: '21:00',
      description: 'Cabang Bekasi yang cozy dan instagramable.',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=600',
      mapUrl: 'https://goo.gl/maps/exampleBekasi',
      lateTolerance: 10,
      stations: {
        create: [
          { type: StationType.LASH_BED, quantity: 2 },
          { type: StationType.NAIL_CHAIR, quantity: 1 },
        ],
      },
    },
  });

  console.log('🏪 Stores & Stations created.');

  // --------------------------------------------------------
  // 4. CREATE SERVICES
  // --------------------------------------------------------
  
  // Service Eyelash (Butuh Kasur)
  const serviceRussian = await prisma.service.create({
    data: {
      name: 'Russian Volume 5D',
      category: ServiceCategory.EYELASH,
      price: 450000,
      duration: 90, // menit
      bufferTime: 15, // menit
      requiredStation: StationType.LASH_BED,
      description: 'Tampilan mata cetar badai dengan teknik Russian Volume.',
      image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?q=80&w=600',
    },
  });

  const serviceNails = await prisma.service.create({
    data: {
      name: 'Gel Polish Manicure',
      category: ServiceCategory.NAILS,
      price: 150000,
      duration: 45,
      bufferTime: 10,
      requiredStation: StationType.NAIL_CHAIR,
      description: 'Pewarnaan kuku gel tahan lama.',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',
    },
  });

  console.log('💅 Services created.');

  // --------------------------------------------------------
  // 5. CREATE BOOKING
  // --------------------------------------------------------
  // Buat booking untuk besok jam 10:00
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0); // 10:00

  const endTime = new Date(tomorrow);
  endTime.setMinutes(endTime.getMinutes() + 90 + 15); // Duration + Buffer

  const booking = await prisma.booking.create({
    data: {
      invoiceCode: 'QZ-SEED01',
      bookingDate: tomorrow,
      startTime: tomorrow,
      endTime: endTime,
      status: BookingStatus.CONFIRMED,
      source: BookingSource.ONLINE,
      paymentMethod: PaymentMethod.MIDTRANS,
      paymentStatus: PaymentStatus.PAID,
      totalPrice: 450000,
      // Karena ID integer (autoincrement), kita pakai connect atau ID yang diretrieve
      userId: customer.id,
      storeId: storeKemang.id,
      serviceId: serviceRussian.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Hasilnya bagus banget!",
      isFeatured: true,
      bookingId: booking.id,
      userId: customer.id,
    }
  });

  console.log('📅 Dummy Booking created.');

  // --------------------------------------------------------
  // 6. CMS CONTENT
  // --------------------------------------------------------
  await prisma.seoConfig.create({
    data: {
      pageName: 'home',
      metaTitle: 'Queenza Beauty - Eyelash & Nail Art Terbaik',
      metaDescription: 'Studio kecantikan premium dengan harga terjangkau.',
      keywords: 'eyelash, nail art, salon',
    },
  });

  await prisma.socialMedia.createMany({
    data: [
      { platform: SocialPlatform.INSTAGRAM, url: 'https://instagram.com/queenza.id', username: '@queenza.id' },
      { platform: SocialPlatform.WHATSAPP, url: 'https://wa.me/62812345678', username: '+62 812-3456-78' },
    ],
  });

  await prisma.content.create({
    data: {
      title: 'Tutorial Eyelash Natural',
      videoUrl: 'https://www.tiktok.com/@username/video/1234567890',
      platform: ContentPlatform.TIKTOK,
      thumbnail: 'https://images.unsplash.com/photo-1596704017254-9b1b1b9d9d9d?q=80&w=400',
      isActive: true,
      order: 1,
    }
  });

  await prisma.promo.create({
    data: {
      title: 'Grand Opening Promo',
      description: 'Diskon 20% All Item khusus member baru',
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=800',
      isActive: true,
    },
  });

  await prisma.gallery.createMany({
    data: [
      { imageUrl: 'https://images.unsplash.com/photo-1596704017638-349f70632a68', category: ServiceCategory.EYELASH, caption: "Russian Volume" },
      { imageUrl: 'https://images.unsplash.com/photo-1632922267756-9b71242b1592', category: ServiceCategory.NAILS, caption: "Nail Art" },
    ],
  });

  console.log('✨ CMS Content created.');
  console.log('✅ Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });