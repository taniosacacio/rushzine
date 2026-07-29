import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function FAQAccordion({ faqs, qLabel, aLabel }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div 
            key={i} 
            style={{ 
              background: isOpen ? 'rgba(30, 30, 40, 0.8)' : 'rgba(255, 255, 255, 0.03)', 
              borderRadius: '12px', 
              border: `1px solid ${isOpen ? 'rgba(146, 183, 117, 0.4)' : 'rgba(255, 255, 255, 0.05)'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.3)' : 'none'
            }}
          >
            <button
              onClick={() => toggleOpen(i)}
              style={{
                width: '100%',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                outline: 'none'
              }}
            >
              <h4 style={{ 
                fontSize: '1.05rem', 
                margin: 0, 
                fontFamily: "'Montserrat', sans-serif", 
                display: 'flex', 
                gap: '10px', 
                alignItems: 'center',
                color: isOpen ? '#92B775' : '#ddd',
                transition: 'color 0.3s ease',
                fontWeight: isOpen ? '700' : '500'
              }}>
                <span style={{ color: isOpen ? '#fff' : '#888', fontWeight: 'bold' }}>{qLabel}</span> 
                {item.q}
              </h4>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ flexShrink: 0, marginLeft: '15px' }}
              >
                <ChevronDown size={20} color={isOpen ? '#92B775' : '#888'} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div style={{ 
                    padding: '0 20px 20px 20px', 
                    color: '#bbb', 
                    fontSize: '0.95rem', 
                    lineHeight: '1.7', 
                    fontFamily: "'Montserrat', sans-serif", 
                    display: 'flex', 
                    gap: '10px' 
                  }}>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>{aLabel}</span> 
                    <span>{item.a}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
