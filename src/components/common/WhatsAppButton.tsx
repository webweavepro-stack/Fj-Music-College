import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '2349078616656',
  defaultMessage = 'Hello FJMUSIC College, I would like to inquire about admissions, tuition fees, and music programmes.',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  // Formatted display number
  const formattedDisplay = '+234 907 861 6656';
  const rawNumber = phoneNumber.replace(/[^0-9]/g, '');

  const quickQuestions = [
    'How do I apply for the Diploma in Vocal Performance?',
    'What are the tuition fees and payment plans?',
    'Can I schedule a studio and campus tour?',
    'What are the practical audition requirements?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = encodeURIComponent(textToSend || customMsg || defaultMessage);
    const url = `https://wa.me/${rawNumber}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Expanded Quick-Chat Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-xs animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Card Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center font-bold text-white shadow-inner">
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.044-1.01-.067-.533-.158-1.226-.454-2.112-1.34-1.11-1.11-1.579-2.072-1.748-2.569-.17-.497-.019-.884.208-1.111.16-.16.353-.263.473-.263.12 0 .241.002.348.016.12.016.262-.057.408.293.155.373.53 1.29.577 1.385.047.096.072.207.013.326-.06.12-.132.228-.216.326-.096.108-.182.204-.266.301-.096.108-.204.228-.084.432.12.204.53 1.05 1.137 1.589.782.695 1.442.91 1.646 1.012.204.102.324.084.444-.054.12-.138.515-.6.653-.807.138-.207.276-.174.462-.102.186.072 1.182.557 1.386.66.204.102.342.15.39.234.048.084.048.497-.096.902z" />
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-lime-400 border-2 border-[#075E54] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">
                  FJMUSIC Admissions Desk
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-lime-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400"></span>
                  <span>Online · Typically replies in minutes</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp chat card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Bubble Area */}
          <div className="p-4 bg-stone-100/70 space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs border border-stone-200 max-w-[85%] text-slate-800 space-y-1">
              <p className="font-semibold text-slate-900">
                Welcome to FJMUSIC College! 🎵
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Connect directly with our admissions counsellors and faculty registry on WhatsApp. How can we help you today?
              </p>
              <div className="text-[10px] text-slate-400 font-mono pt-1 text-right">
                Official: {formattedDisplay}
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Tap a question to chat:
              </span>
              <div className="space-y-1">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="w-full text-left p-2 bg-white hover:bg-lime-50 hover:border-lime-300 border border-stone-200 rounded-xl text-[11px] text-slate-700 hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span className="line-clamp-1">{q}</span>
                    <Send className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Direct Input & Launch Button */}
          <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
            />
            <button
              onClick={() => handleSend()}
              className="px-3.5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm transition-colors cursor-pointer"
              title="Start WhatsApp Chat"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
        {/* Hover Tooltip (when closed) */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 bg-slate-950 text-white px-3.5 py-2 rounded-2xl shadow-xl border border-slate-800 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            <div className="text-left">
              <div className="font-heading font-bold text-xs">Chat on WhatsApp</div>
              <div className="text-[10px] text-slate-400 font-mono">{formattedDisplay}</div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Chat on WhatsApp +2340907 861 6656"
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/30 transition-all duration-200 hover:scale-105 cursor-pointer ring-4 ring-white/90"
        >
          {/* Subtle radar pulse effect */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none"></span>

          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9 fill-current text-white drop-shadow-xs"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}

          {/* Active online indicator dot */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-lime-400 border-2 border-white rounded-full"></span>
          )}
        </button>
      </div>
    </div>
  );
};
