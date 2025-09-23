import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../shared/components/ui/Card/Card';
import SwipeableCard from '../shared/components/ui/SwipeableCard/SwipeableCard';

// Example card data
interface CardItem {
  id: number;
  title: string;
  description: string;
  status?: string;
}

const ExampleCardUsagePage: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [cards, setCards] = useState<CardItem[]>([
    { id: 1, title: 'Card 1', description: 'Swipe left to reveal actions' },
    { id: 2, title: 'Meeting with Client', description: 'Tomorrow at 10:00 AM', status: 'Confirmed' },
    { id: 3, title: 'Super Responsive Card', description: 'Even a small swipe reveals actions' },
    { id: 4, title: 'Another Card', description: 'This will reposition when others are deleted' },
  ]);

  // Delete a card by ID
  const handleDelete = (id: number) => {
    setCards(prev => prev.filter(card => card.id !== id));
    setNotifications(prev => [`Card ${id} deleted!`, ...prev.slice(0, 4)]);
  };

  // Copy a card (duplicate it)
  const handleCopy = (card: CardItem) => {
    const newCard = { ...card, id: Date.now() }; // Create a new ID
    setCards(prev => [...prev, newCard]);
    setNotifications(prev => [`Card ${card.id} copied!`, ...prev.slice(0, 4)]);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Card Components Examples</h1>
      
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((msg, i) => (
            <div 
              key={i} 
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg"
            >
              {msg}
            </div>
          ))}
        </div>
      )}
      
      {/* Basic Card Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Basic Card Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Default Card */}
          <Card>
            <h3 className="font-bold text-lg">Default Card</h3>
            <p className="text-gray-600">Centered content with default padding</p>
          </Card>
          
          {/* Card with left-aligned content */}
          <Card align="start" className="bg-blue-50">
            <h3 className="font-bold text-lg">Left-Aligned Card</h3>
            <p className="text-gray-600">Content aligned to the left</p>
          </Card>
          
          {/* Card with custom padding */}
          <Card padding="p-6" className="bg-green-50">
            <h3 className="font-bold text-lg">Custom Padding</h3>
            <p className="text-gray-600">This card has more padding (p-6)</p>
          </Card>
          
          {/* Card with onClick handler */}
          <Card 
            onClick={() => setNotifications(prev => ['Card clicked!', ...prev.slice(0, 4)])} 
            className="bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors"
          >
            <h3 className="font-bold text-lg">Clickable Card</h3>
            <p className="text-gray-600">Click me!</p>
          </Card>
        </div>
      </section>
      
      {/* Swipeable Card Examples */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Swipeable Card Examples</h2>
        <p className="text-gray-600 mb-4">Swipe cards slightly to the left to reveal action buttons - with smooth gap-filling animation!</p>
        
        <div className="space-y-4">
          <motion.div layout className="space-y-4">
            {cards.map(card => (
              <motion.div 
                key={card.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  layout: { type: "spring", stiffness: 400, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <SwipeableCard 
                  onDelete={() => handleDelete(card.id)} 
                  onCopy={() => handleCopy(card)} 
                  className="bg-white p-4 shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{card.title}</h3>
                      <p className="text-gray-600">{card.description}</p>
                    </div>
                    {card.status && (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                        {card.status}
                      </span>
                    )}
                  </div>
                </SwipeableCard>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-4">
            <button
              onClick={() => {
                const newCard = {
                  id: Date.now(),
                  title: `New Card ${cards.length + 1}`,
                  description: 'Swipe left to see actions'
                };
                setCards(prev => [...prev, newCard]);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add New Card
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExampleCardUsagePage;
