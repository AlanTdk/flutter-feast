import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Product } from '@/types/menu';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="menu-card group cursor-pointer overflow-hidden touch-manipulation"
      onClick={() => onAddToCart(product)}
    >
      {/* Product Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden rounded-lg mb-3 sm:mb-4">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="space-y-2 sm:space-y-3">
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 sm:gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-3 sm:px-4 py-2 rounded-lg font-medium shadow-sm text-sm sm:text-base min-h-[44px] touch-manipulation"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Agregar</span>
            <span className="sm:hidden">+</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};