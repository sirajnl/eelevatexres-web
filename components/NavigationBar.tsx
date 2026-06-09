import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUtensils, FaCalendarAlt, FaTable, FaCreditCard } from 'react-icons/fa';

const navItems = [
  { href: '/', label: 'Home', icon: <FaHome /> },
  { href: '/menu', label: 'Menu', icon: <FaUtensils /> },
  { href: '/reservations', label: 'Reservations', icon: <FaCalendarAlt /> },
  { href: '/tables', label: 'Tables', icon: <FaTable /> },
  { href: '/checkout', label: 'Checkout', icon: <FaCreditCard /> },
];

export default function NavigationBar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-10 bg-white/30 dark:bg-black/30 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <ul className="flex justify-center space-x-4 p-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex flex-col items-center text-sm transition-colors hover:text-primary ${pathname === item.href ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-400'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
