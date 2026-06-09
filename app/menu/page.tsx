import Image from 'next/image';
import MenuItemCard from '@/components/MenuItemCard';

export const dynamic = 'force-dynamic'; // ensure fresh data on each request

async function getMenuItems() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/menu`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch menu');
  }
  return res.json();
}

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">
        Our Menu
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item: any) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
