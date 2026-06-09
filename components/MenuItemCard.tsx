import Image from 'next/image';
import { FC } from 'react';

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  available?: boolean;
  category: { name: string };
};

const MenuItemCard: FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white/30 backdrop-blur-md hover:scale-105 transition-transform duration-300">
      {item.image && (
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
          {item.name}
        </h2>
        {item.description && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${'${item.price.toFixed(2)}'}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}> 
            {item.available ? 'Available' : 'Sold Out'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
