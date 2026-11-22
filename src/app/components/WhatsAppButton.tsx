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

import { FarmerQuickHelpFloat } from './FarmerQuickHelpFloat';

export const FloatingWhatsAppButton: React.FC = () => {
  return <FarmerQuickHelpFloat />;
};

