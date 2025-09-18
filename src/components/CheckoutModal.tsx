import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Home, MessageCircle } from 'lucide-react';
import { CartItem, OrderData } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onSubmitOrder: (orderData: OrderData) => void;
}

export const CheckoutModal = ({ isOpen, onClose, items, onSubmitOrder }: CheckoutModalProps) => {
  const [step, setStep] = useState<'orderType' | 'customerInfo' | 'summary'>('orderType');
  const [orderType, setOrderType] = useState<'dine-in' | 'delivery' | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    tableNumber: '',
    whatsappNumber: '',
    address: '',
    references: '',
    comments: ''
  });

  const { toast } = useToast();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = () => {
    if (!orderType || !formData.customerName) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const orderData: OrderData = {
      items,
      customerName: formData.customerName,
      orderType,
      tableNumber: orderType === 'dine-in' ? formData.tableNumber : undefined,
      whatsappNumber: orderType === 'delivery' ? formData.whatsappNumber : undefined,
      address: orderType === 'delivery' ? formData.address : undefined,
      references: formData.references,
      comments: formData.comments,
      total
    };

    onSubmitOrder(orderData);
  };

  const generateWhatsAppMessage = () => {
    const itemsList = items.map(item => 
      `• ${item.name} x${item.quantity} - $${item.price * item.quantity}`
    ).join('\n');

    const orderDetails = orderType === 'dine-in' 
      ? `📍 *Para consumir en el restaurante*\n🪑 Mesa: ${formData.tableNumber}`
      : `🏠 *Envío a domicilio*\n📱 WhatsApp: ${formData.whatsappNumber}\n📍 Dirección: ${formData.address}${formData.references ? `\n🗺️ Referencias: ${formData.references}` : ''}`;

    return `🍽️ *NUEVO PEDIDO - Sabores Digital*

👤 *Cliente:* ${formData.customerName}

${orderDetails}

📋 *Productos:*
${itemsList}

💰 *Total: $${total} MXN*

${formData.comments ? `💬 *Comentarios:* ${formData.comments}` : ''}

¡Gracias por tu pedido! 🙌`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold">
                  {step === 'orderType' && 'Tipo de Pedido'}
                  {step === 'customerInfo' && 'Datos del Cliente'}
                  {step === 'summary' && 'Resumen del Pedido'}
                </h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X size={20} />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                
                {/* Step 1: Order Type */}
                {step === 'orderType' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-muted-foreground">¿Cómo prefieres recibir tu pedido?</p>
                    
                    <div className="space-y-3">
                      <Button
                        variant={orderType === 'dine-in' ? 'default' : 'outline'}
                        onClick={() => setOrderType('dine-in')}
                        className="w-full justify-start h-auto p-4 text-left"
                      >
                        <MapPin className="mr-3 flex-shrink-0" size={20} />
                        <div>
                          <div className="font-medium">Para Comer Aquí</div>
                          <div className="text-sm text-muted-foreground">Consumir en el restaurante</div>
                        </div>
                      </Button>

                      <Button
                        variant={orderType === 'delivery' ? 'default' : 'outline'}
                        onClick={() => setOrderType('delivery')}
                        className="w-full justify-start h-auto p-4 text-left"
                      >
                        <Home className="mr-3 flex-shrink-0" size={20} />
                        <div>
                          <div className="font-medium">Enviar a Domicilio</div>
                          <div className="text-sm text-muted-foreground">Entrega en tu dirección</div>
                        </div>
                      </Button>
                    </div>

                    <Button
                      onClick={() => setStep('customerInfo')}
                      disabled={!orderType}
                      className="w-full h-12 btn-primary text-base font-semibold"
                    >
                      Continuar
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Customer Info */}
                {step === 'customerInfo' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="customerName">Nombre completo *</Label>
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    {orderType === 'dine-in' && (
                      <div>
                        <Label htmlFor="tableNumber">Número de mesa *</Label>
                        <Input
                          id="tableNumber"
                          value={formData.tableNumber}
                          onChange={(e) => setFormData({...formData, tableNumber: e.target.value})}
                          placeholder="Ej: 5"
                          type="number"
                        />
                      </div>
                    )}

                    {orderType === 'delivery' && (
                      <>
                        <div>
                          <Label htmlFor="whatsappNumber">Número de WhatsApp *</Label>
                          <Input
                            id="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                            placeholder="Ej: 5512345678"
                            type="tel"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Dirección completa *</Label>
                          <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            placeholder="Calle, número, colonia, ciudad"
                          />
                        </div>
                        <div>
                          <Label htmlFor="references">Referencias (opcional)</Label>
                          <Input
                            id="references"
                            value={formData.references}
                            onChange={(e) => setFormData({...formData, references: e.target.value})}
                            placeholder="Ej: Casa azul, portón negro"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <Label htmlFor="comments">Comentarios adicionales (opcional)</Label>
                      <Textarea
                        id="comments"
                        value={formData.comments}
                        onChange={(e) => setFormData({...formData, comments: e.target.value})}
                        placeholder="Instrucciones especiales, alergias, etc."
                      />
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                      <Button variant="outline" onClick={() => setStep('orderType')} className="flex-1 h-11">
                        Atrás
                      </Button>
                      <Button onClick={() => setStep('summary')} className="flex-1 h-11 btn-primary">
                        Continuar
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Summary */}
                {step === 'summary' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <h3 className="font-medium">Datos del pedido:</h3>
                      <p><strong>Cliente:</strong> {formData.customerName}</p>
                      <p><strong>Tipo:</strong> {orderType === 'dine-in' ? 'Para comer aquí' : 'Envío a domicilio'}</p>
                      {orderType === 'dine-in' && <p><strong>Mesa:</strong> {formData.tableNumber}</p>}
                      {orderType === 'delivery' && (
                        <>
                          <p><strong>WhatsApp:</strong> {formData.whatsappNumber}</p>
                          <p><strong>Dirección:</strong> {formData.address}</p>
                        </>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Productos:</h3>
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span className="text-primary">${total}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                      <Button variant="outline" onClick={() => setStep('customerInfo')} className="flex-1 h-11">
                        Atrás
                      </Button>
                      <Button 
                        onClick={handleSubmit} 
                        className="flex-1 h-11 btn-primary"
                      >
                        <MessageCircle className="mr-2" size={16} />
                        <span className="hidden sm:inline">Enviar por WhatsApp</span>
                        <span className="sm:hidden">Enviar</span>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};