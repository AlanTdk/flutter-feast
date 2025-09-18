import { motion } from 'framer-motion';
import { Category, CATEGORIES } from '@/types/menu';

interface CategoryNavProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`category-nav flex-shrink-0 whitespace-nowrap ${
            activeCategory === category.id ? 'active' : ''
          }`}
        >
          <span className="text-lg mr-2">{category.icon}</span>
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};