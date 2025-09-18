import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types/menu';
import { Button } from '@/components/ui/button';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const Cart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="relative bg-primary hover:bg-primary-hover text-primary-foreground p-3 rounded-full shadow-lg"
      >
        <ShoppingCart size={24} />
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="cart-badge"
            >
              {itemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-card border-l border-border shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-card/95 backdrop-blur-sm">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">Tu Pedido</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X size={18} />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <AnimatePresence>
                  {items.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <ShoppingCart className="text-muted-foreground" size={24} />
                      </div>
                      <p className="text-muted-foreground">Tu carrito está vacío</p>
                      <p className="text-sm text-muted-foreground mt-1">Agrega productos para continuar</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="bg-muted/20 rounded-xl p-3 border border-border/50"
                        >
                          <div className="flex gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm sm:text-base text-foreground truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                ${item.price} c/u
                              </p>
                              
                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                    className="h-7 w-7 p-0 rounded-full"
                                  >
                                    <Minus size={10} />
                                  </Button>
                                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="h-7 w-7 p-0 rounded-full"
                                  >
                                    <Plus size={10} />
                                  </Button>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-primary text-sm">
                                    ${item.price * item.quantity}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveItem(item.id)}
                                    className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                                  >
                                    <Trash2 size={10} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-border bg-card/95 backdrop-blur-sm">
                  {/* Order Summary */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Productos ({itemCount})</span>
                      <span>${total}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="font-semibold text-base sm:text-lg">Total:</span>
                      <span className="text-xl sm:text-2xl font-bold text-primary">${total}</span>
                    </div>
                  </div>
                  
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        onCheckout();
                      }}
                      className="w-full h-12 text-base font-semibold btn-primary"
                    >
                      <ShoppingCart className="mr-2" size={18} />
                      Realizar Pedido
                    </Button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};