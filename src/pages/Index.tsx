import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductCard } from '@/components/ProductCard';
import { CheckoutModal } from '@/components/CheckoutModal';
import { PRODUCTS } from '@/data/products';
import { Product, CartItem, Category, OrderData } from '@/types/menu';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('hamburguesas');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { toast } = useToast();

  // Filter products by active category
  const filteredProducts = useMemo(() => 
    PRODUCTS.filter(product => product.category === activeCategory),
    [activeCategory]
  );

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: CartItem = { ...product, quantity: 1 };
        return [...prev, newItem];
      }
    });

    toast({
      title: "¡Agregado al carrito!",
      description: `${product.name} ha sido agregado a tu pedido`,
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido removido de tu carrito",
    });
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega algunos productos antes de realizar el pedido",
        variant: "destructive"
      });
      return;
    }
    setIsCheckoutOpen(true);
  };

  // Submit order to WhatsApp
  const handleSubmitOrder = (orderData: OrderData) => {
    const itemsList = orderData.items.map(item => 
      `• ${item.name} x${item.quantity} - $${item.price * item.quantity}`
    ).join('\n');

    const orderDetails = orderData.orderType === 'dine-in' 
      ? `📍 *Para consumir en el restaurante*\n🪑 Mesa: ${orderData.tableNumber}`
      : `🏠 *Envío a domicilio*\n📱 WhatsApp: ${orderData.whatsappNumber}\n📍 Dirección: ${orderData.address}${orderData.references ? `\n🗺️ Referencias: ${orderData.references}` : ''}`;

    const message = `🍽️ *NUEVO PEDIDO - Sabores Digital*

👤 *Cliente:* ${orderData.customerName}

${orderDetails}

📋 *Productos:*
${itemsList}

💰 *Total: $${orderData.total} MXN*

${orderData.comments ? `💬 *Comentarios:* ${orderData.comments}` : ''}

¡Gracias por tu pedido! 🙌`;

    const whatsappUrl = `https://wa.me/529614045971?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and close modal
    setCartItems([]);
    setIsCheckoutOpen(false);
    
    toast({
      title: "¡Pedido enviado!",
      description: "Tu pedido ha sido enviado por WhatsApp. Te contactaremos pronto.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Header */}
      <Header
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 pb-20 sm:pb-8">
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            ¡Bienvenido a nuestro menú!
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Descubre nuestros deliciosos platillos preparados con los mejores ingredientes. 
            Selecciona tus favoritos y realiza tu pedido fácilmente.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No hay productos disponibles en esta categoría
            </p>
          </motion.div>
        )}
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
};

export default Index;