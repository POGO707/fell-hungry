import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, MessageCircle, FileEdit } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
}

// Sub-component to handle individual item state (like note visibility)
const CartItemRow: React.FC<{
  item: CartItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
}> = ({ item, onUpdateQuantity, onRemoveItem, onUpdateNote }) => {
  const [showNote, setShowNote] = useState(!!item.note);

  return (
    <div className="flex flex-col gap-3 pb-6 border-b border-gray-100 last:border-0">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-secondary">{item.name}</h3>
          <p className="text-sm text-gray-500">₹{item.price} each</p>
        </div>
        <div className="font-bold text-primary">₹{item.price * item.quantity}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onUpdateQuantity(item.id, -1)}
            className="p-1 hover:bg-white rounded-md transition-colors shadow-sm"
            disabled={item.quantity <= 1}
          >
            <Minus size={14} className={item.quantity <= 1 ? "text-gray-400" : "text-gray-700"} />
          </button>
          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="p-1 hover:bg-white rounded-md transition-colors shadow-sm"
          >
            <Plus size={14} className="text-gray-700" />
          </button>
        </div>

        <button
          onClick={() => onRemoveItem(item.id)}
          className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1"
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>

      {/* Note Section */}
      {!showNote && !item.note ? (
        <button
          onClick={() => setShowNote(true)}
          className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline self-start mt-1"
        >
          <FileEdit size={12} /> Add Note
        </button>
      ) : (
        <div className="relative mt-1">
          <textarea
            placeholder="Add instructions (e.g. Extra spicy, No onion)..."
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary min-h-[60px] resize-none"
            value={item.note || ''}
            onChange={(e) => onUpdateNote(item.id, e.target.value)}
            autoFocus={!item.note}
          />
           {/* Allow closing if empty to keep UI clean */}
          {!item.note && (
             <button 
                onClick={() => setShowNote(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                title="Cancel note"
             >
                 <X size={14} />
             </button>
          )}
        </div>
      )}
    </div>
  );
};

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onUpdateNote }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Construct WhatsApp message
    let message = `*New Order from Website* %0A%0A`;
    items.forEach(item => {
      message += `• ${item.quantity}x ${item.name} (₹${item.price})`;
      if (item.note) message += ` -- _Note: ${item.note}_`;
      message += `%0A`;
    });
    message += `%0A*Total: ₹${total}*`;
    message += `%0A%0APlease confirm my order.`;

    window.open(`https://wa.me/918240713903?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-2xl font-display font-bold text-secondary">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <div className="bg-gray-100 p-6 rounded-full inline-block mb-4">
                <Trash2 size={40} className="text-gray-400" />
              </div>
              <p className="text-lg">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
                onUpdateNote={onUpdateNote}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
            <div className="flex justify-between items-center text-xl font-bold text-secondary">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <MessageCircle size={24} /> Checkout on WhatsApp
            </button>
            <p className="text-xs text-center text-gray-500">
              You will be redirected to WhatsApp to send your order details.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;