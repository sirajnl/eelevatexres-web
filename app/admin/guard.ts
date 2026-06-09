import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export async function protectedAdmin(context: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    redirect('/login');
  }
  return { session };
}
