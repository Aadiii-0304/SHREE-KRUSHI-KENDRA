import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  fullWidth?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '917219437160',
  message = 'नमस्ते, मुझे कृषि उत्पादों के बारे में जानकारी चाहिए।',
  className = '',
  size = 'default',
  fullWidth = false,
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      size={size}
      className={`whatsapp-green text-white hover:whatsapp-green shadow-lg ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <MessageCircle className="h-5 w-5 mr-2" />
      WhatsApp पर बात करें
    </Button>
  );
};

export const FloatingWhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-6">
      <button
        onClick={() => {
          const message = encodeURIComponent('नमस्ते, मुझे कृषि उत्पादों के बारे में जानकारी चाहिए।');
          window.open(`https://wa.me/917219437160?text=${message}`, '_blank');
        }}
        className="whatsapp-green text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 pr-6"
        aria-label="WhatsApp पर संपर्क करें"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="font-semibold text-base hidden sm:inline">Expert से बात करें</span>
      </button>
    </div>
  );
};

