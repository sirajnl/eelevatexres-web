import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export async function protectedAdmin() {
  const session = await getServerSession(authOptions);
  if (!(session?.user as any)?.role || (session?.user as any).role !== 'ADMIN') {
    redirect('/login');
  }
  return { session };
}
