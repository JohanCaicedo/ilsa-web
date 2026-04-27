import { useState } from 'react';

export default function PayPalDonation() {
    const [selectedAmount, setSelectedAmount] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");

    const handleQuickAmount = (amount: string) => {
        setSelectedAmount(amount);
        setInputValue("");
    };

    const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        setSelectedAmount(val);
    };

    const handleDonate = () => {
        let url = "https://paypal.me/ilsacolombia";
        if (selectedAmount && !isNaN(Number(selectedAmount)) && Number(selectedAmount) > 0) {
            url += `/${selectedAmount}USD`;
        }
        window.open(url, "_blank");
    };

    return (
        <div className="w-full">
            {/* Amount selection */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                {[10, 20, 50].map((amount) => (
                    <button
                        key={amount}
                        type="button"
                        onClick={() => handleQuickAmount(amount.toString())}
                        data-active={selectedAmount === amount.toString() && inputValue === ""}
                        className="amount-btn relative overflow-hidden bg-white/60 hover:bg-white border border-slate-200 rounded-xl py-3 font-semibold text-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-[#0070ba]/50 data-[active=true]:border-[#0070ba] data-[active=true]:bg-blue-50 data-[active=true]:text-[#0070ba] data-[active=true]:shadow-lg data-[active=true]:scale-105"
                    >
                        {amount} USD
                    </button>
                ))}
            </div>

            <div className="relative mb-6 group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold transition-colors duration-300 group-focus-within:text-[#0070ba]">$</span>
                <input
                    type="number"
                    placeholder="Otro valor"
                    min="1"
                    value={inputValue}
                    onChange={handleCustomAmount}
                    className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 pl-8 pr-4 text-slate-700 font-semibold focus:outline-none focus:border-[#0070ba] focus:ring-2 focus:ring-[#0070ba]/30 transition-all duration-300 hover:border-[#0070ba]/50 hover:shadow-md focus:shadow-lg focus:-translate-y-0.5"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm transition-colors duration-300 group-focus-within:text-[#0070ba]">USD</span>
            </div>

            {/* PayPal Button */}
            <button
                onClick={handleDonate}
                className="relative overflow-hidden w-full py-4 bg-[#0070ba] hover:bg-[#003087] text-white font-bold rounded-2xl shadow-xl shadow-[#0070ba]/20 hover:shadow-2xl hover:shadow-[#0070ba]/40 hover:-translate-y-1.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer"
            >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:scale-110 transition-transform"
                >
                    <path
                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                    ></path>
                </svg>
                Donar vía PayPal
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                </svg>
            </button>
        </div>
    );
}
