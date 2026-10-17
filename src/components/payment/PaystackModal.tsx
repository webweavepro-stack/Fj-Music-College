import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { FjMusicLogo } from '../brand/FjMusicLogo';
import { X, CreditCard, ShieldCheck, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface PaystackModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency?: string;
  purpose: 'Application Fee' | 'Tuition Payment' | 'Masterclass Registration' | 'Practice Room Access';
  programmeTitle?: string;
  onSuccess: (paymentRef: string) => void;
}

export const PaystackModal: React.FC<PaystackModalProps> = ({
  isOpen,
  onClose,
  amount,
  currency = 'NGN',
  purpose,
  programmeTitle,
  onSuccess,
}) => {
  const { currentUser, processPayment, settings } = useCollege();
  const [cardNumber, setCardNumber] = useState('4084 0000 0000 1234');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('892');
  const [channel, setChannel] = useState<'card' | 'bank' | 'ussd'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptRef, setReceiptRef] = useState('');

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Paystack transaction verification delay
    setTimeout(async () => {
      const paymentRecord = await processPayment({
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        amount,
        currency,
        purpose,
        programmeTitle,
        channel: 'Paystack',
      });

      setReceiptRef(paymentRecord.reference);
      setIsProcessing(false);
      setIsSuccess(true);
      onSuccess(paymentRecord.reference);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 text-slate-900">
        {/* Paystack Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FjMusicLogo size="sm" theme="dark" variant="mark" />
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                FJMUSIC College Bursary
              </div>
              <div className="text-sm font-semibold text-white">
                Secured by Paystack
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Pill */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Paying For:</div>
            <div className="text-sm font-bold text-slate-800 line-clamp-1">
              {purpose} {programmeTitle ? `· ${programmeTitle}` : ''}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Amount Due</div>
            <div className="text-lg font-black text-slate-900 font-mono">
              {currency} {amount.toLocaleString()}
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-slate-900">
                Payment Successful!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Your transaction has been securely processed and recorded by the college registry.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs font-mono space-y-1">
              <div className="text-slate-500">
                Reference: <span className="text-slate-900 font-bold">{receiptRef}</span>
              </div>
              <div className="text-slate-500">
                Payer: <span className="text-slate-900">{currentUser.name}</span>
              </div>
              <div className="text-slate-500">
                Date: <span className="text-slate-900">{new Date().toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-colors"
            >
              Continue to Portal
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-5">
            {/* Channel Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setChannel('card')}
                className={`py-2 rounded-lg transition-colors ${
                  channel === 'card'
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Card
              </button>
              <button
                type="button"
                onClick={() => setChannel('bank')}
                className={`py-2 rounded-lg transition-colors ${
                  channel === 'bank'
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bank
              </button>
              <button
                type="button"
                onClick={() => setChannel('ussd')}
                className={`py-2 rounded-lg transition-colors ${
                  channel === 'ussd'
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                USSD
              </button>
            </div>

            {channel === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      placeholder="4084 0000 0000 1234"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-slate-900 focus:outline-none pr-10"
                    />
                    <CreditCard className="w-5 h-5 text-slate-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                      placeholder="123"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {channel === 'bank' && (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
                <p className="font-semibold">Direct College Bursary Account:</p>
                <div className="space-y-1 font-mono text-[11px]">
                  <div>Bank: {settings.bankDetails.bankName}</div>
                  <div>Account: {settings.bankDetails.accountNumber}</div>
                  <div>Name: {settings.bankDetails.accountName}</div>
                </div>
                <p className="text-[11px] text-amber-800">
                  Transfers are automatically matched with your reference number.
                </p>
              </div>
            )}

            {channel === 'ussd' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <p className="font-semibold">Dial from your registered mobile phone:</p>
                <div className="font-mono text-base font-bold text-slate-900 bg-white p-2.5 rounded-lg border border-slate-300 text-center">
                  *737*50*15000*814#
                </div>
              </div>
            )}

            {/* Test Mode Notice */}
            {settings.paystackTestMode && (
              <div className="flex items-center gap-2 p-2.5 bg-lime-50 rounded-lg border border-lime-200 text-[11px] text-lime-900">
                <ShieldCheck className="w-4 h-4 text-lime-700 shrink-0" />
                <span>
                  <strong>Paystack Test Mode Active:</strong> Safe demo environment. Real credit cards will not be charged.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying with Paystack...</span>
                </>
              ) : (
                <>
                  <span>Pay {currency} {amount.toLocaleString()}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
