import { motion } from 'framer-motion';
import { Cart } from './Cart';
import { CartItem } from '@/types/menu';

interface HeaderProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const Header = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
              <span className="text-2xl">🍽️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sabores Digital</h1>
              <p className="text-xs text-muted-foreground">Menú Interactivo</p>
            </div>
          </motion.div>

          {/* Cart */}
          <Cart
            items={cartItems}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            onCheckout={onCheckout}
          />
        </div>
      </div>
    </motion.header>
  );
};