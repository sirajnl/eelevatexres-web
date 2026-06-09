"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();
  const links = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/menu', label: 'Menu' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/reservations', label: 'Reservations' },
    { href: '/admin/users', label: 'Users' },
  ];

  return (
    <nav className="flex flex-col space-y-2 p-4 bg-gray-800 text-white min-w-[180px] h-full">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-2 rounded hover:bg-gray-700 ${pathname === link.href ? 'bg-gray-700' : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
