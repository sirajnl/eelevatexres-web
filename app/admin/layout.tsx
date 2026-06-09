import AdminNav from '@/components/AdminNav';
import { protectedAdmin } from './guard';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await protectedAdmin({});

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <AdminNav />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
