import React, { useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router';

interface VoiceSearchButtonProps {
  onTranscript?: (text: string) => void;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  iconOnly?: boolean;
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  onTranscript,
  className = '',
  size = 'default',
  iconOnly = false,
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error(
        language === 'en'
          ? 'Voice search is not supported in this browser. Please type to search.'
          : language === 'hi'
          ? 'इस ब्राउज़र में वॉयस सर्च समर्थित नहीं है। कृपया टाइप करें।'
          : 'तुमच्या ब्राउझरमध्ये व्हॉइस सर्च उपलब्ध नाही. कृपया टाइप करा.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Set language according to active locale
      if (language === 'mr') {
        recognition.lang = 'mr-IN';
      } else if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onstart = () => {
        setIsListening(true);
        toast.info(
          language === 'en'
            ? '🎙️ Listening... Speak product or crop name now'
            : language === 'hi'
            ? '🎙️ सुन रहे हैं... कृपया उत्पाद या फसल का नाम बोलें'
            : '🎙️ ऐकत आहे... औषधाचे किंवा पिकाचे नाव बोला'
        );
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        if (transcript && transcript.trim()) {
          toast.success(`"${transcript.trim()}"`);
          if (onTranscript) {
            onTranscript(transcript.trim());
          } else {
            navigate(`/products?search=${encodeURIComponent(transcript.trim())}`);
          }
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        console.warn('Speech recognition error:', event.error);
        if (event.error !== 'no-speech') {
          toast.error(
            language === 'en'
              ? 'Could not hear clearly. Please try again.'
              : language === 'hi'
              ? 'आवाज स्पष्ट सुनाई नहीं दी। कृपया पुनः प्रयास करें।'
              : 'आवाज स्पष्ट ऐकू आली नाही. कृपया पुन्हा प्रयत्न करा.'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
      console.error('Speech recognition exception:', err);
    }
  };

  const buttonSizeClasses = {
    sm: 'p-1.5 text-xs',
    default: 'p-2 text-sm',
    lg: 'p-3 text-base',
  }[size];

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={startListening}
        title={
          language === 'en'
            ? 'Voice Search: Speak to search'
            : language === 'hi'
            ? 'बोलकर खोजें'
            : 'बोलून शोधा'
        }
        aria-label="Voice Search"
        className={`relative inline-flex items-center justify-center rounded-lg transition-all ${
          isListening
            ? 'bg-red-500 text-white animate-pulse shadow-md ring-4 ring-red-200'
            : 'text-gray-500 hover:text-green-700 hover:bg-green-50'
        } ${buttonSizeClasses} ${className}`}
      >
        {isListening ? (
          <Mic className="h-5 w-5 animate-bounce" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={startListening}
      className={`inline-flex items-center gap-2 rounded-xl font-bold transition-all ${
        isListening
          ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200'
          : 'bg-green-100 hover:bg-green-200 text-green-800'
      } ${buttonSizeClasses} ${className}`}
    >
      {isListening ? (
        <>
          <Mic className="h-5 w-5 animate-bounce" />
          <span>
            {language === 'en'
              ? 'Listening...'
              : language === 'hi'
              ? 'सुन रहे हैं...'
              : 'ऐकत आहे...'}
          </span>
        </>
      ) : (
        <>
          <Mic className="h-5 w-5 text-green-700" />
          <span>
            {language === 'en'
              ? 'Voice Search'
              : language === 'hi'
              ? 'बोलकर खोजें'
              : 'बोलून शोधा'}
          </span>
        </>
      )}
    </button>
  );
};
