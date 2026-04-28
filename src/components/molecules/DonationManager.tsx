import { useState, useEffect } from 'react';

declare global {
    interface Window {
        ePayco: any;
    }
}

type Region = 'colombia' | 'international';

export default function DonationManager() {
    const [region, setRegion] = useState<Region>('colombia');
    const [selectedAmount, setSelectedAmount] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");

    // Configuration depending on region
    const config = {
        colombia: {
            quickAmounts: [20000, 50000, 100000],
            currency: 'COP',
            symbol: '$',
            buttonLabel: 'Donar vía ePayco (PSE, Tarjetas)',
            buttonColor: 'bg-[#ff5a00] hover:bg-[#e04f00]', // ePayco orange
            buttonShadow: 'shadow-[#ff5a00]/20 hover:shadow-[#ff5a00]/40'
        },
        international: {
            quickAmounts: [10, 20, 50],
            currency: 'USD',
            symbol: '$',
            buttonLabel: 'Donar vía PayPal',
            buttonColor: 'bg-[#0070ba] hover:bg-[#003087]',
            buttonShadow: 'shadow-[#0070ba]/20 hover:shadow-[#0070ba]/40'
        }
    };

    const activeConfig = config[region];

    // Reset amounts when changing region
    useEffect(() => {
        setSelectedAmount("");
        setInputValue("");
    }, [region]);

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
        if (!selectedAmount || isNaN(Number(selectedAmount)) || Number(selectedAmount) <= 0) {
            alert("Por favor ingresa un monto válido.");
            return;
        }

        if (region === 'colombia') {
            // ePayco Integration
            if (typeof window.ePayco === 'undefined') {
                alert("El sistema de pagos ePayco no se ha cargado. Por favor recarga la página.");
                return;
            }

            const handler = window.ePayco.checkout.configure({
                // @ts-ignore
                key: import.meta.env.PUBLIC_EPAYCO_KEY,
                test: false // Cambiar a true si deseas realizar pruebas sin dinero real
            });

            handler.open({
                name: "Donación Institucional ILSA",
                description: "Aporte para investigación sociojurídica y acceso a la justicia",
                invoice: "DON-" + Date.now(),
                currency: "cop",
                amount: selectedAmount,
                tax_base: "0",
                tax: "0",
                country: "co",
                lang: "es",
                external: "false",
                // Redirige de vuelta a la página tras pagar
                response: window.location.href,
                confirmation: window.location.href,
                methodsDisable: [] // Habilita todos los métodos (PSE, TC, Nequi, Daviplata)
            });

        } else {
            // PayPal Integration
            const url = `https://paypal.me/ilsacolombia/${selectedAmount}USD`;
            window.open(url, "_blank");
        }
    };

    return (
        <div className="w-full">
            {/* Region Selector (Segmented Control) */}
            <div className="relative flex p-1.5 bg-slate-900/5 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] w-full max-w-md mx-auto mb-10">
                <div 
                    className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-white/90 backdrop-blur-sm rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] transition-all duration-500 ease-out border border-white/60 ${
                        region === 'colombia' ? 'left-1.5' : 'left-[calc(50%+4px)]'
                    }`}
                ></div>
                
                <button
                    onClick={() => setRegion('colombia')}
                    className={`relative z-10 flex-1 py-2.5 px-2 sm:py-3.5 sm:px-4 rounded-xl font-bold text-xs sm:text-base transition-colors duration-500 flex items-center justify-center gap-1 sm:gap-2 ${
                        region === 'colombia'
                            ? 'text-slate-800'
                            : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <span className="text-lg sm:text-xl drop-shadow-sm">🇨🇴</span>
                    <span className="truncate">Colombia</span>
                </button>
                <button
                    onClick={() => setRegion('international')}
                    className={`relative z-10 flex-1 py-2.5 px-2 sm:py-3.5 sm:px-4 rounded-xl font-bold text-xs sm:text-base transition-colors duration-500 flex items-center justify-center gap-1 sm:gap-2 ${
                        region === 'international'
                            ? 'text-slate-800'
                            : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <span className="text-lg sm:text-xl drop-shadow-sm">🌍</span>
                    <span className="truncate">Internacional</span>
                </button>
            </div>

            {/* Amount selection */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5">
                {activeConfig.quickAmounts.map((amount) => (
                    <button
                        key={amount}
                        type="button"
                        onClick={() => handleQuickAmount(amount.toString())}
                        data-active={selectedAmount === amount.toString() && inputValue === ""}
                        className="group relative overflow-hidden bg-white/30 hover:bg-white/70 backdrop-blur-md border border-white/60 rounded-xl sm:rounded-2xl py-3 sm:py-4 font-bold text-slate-700 transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.12)] data-[active=true]:border-slate-800 data-[active=true]:bg-slate-800/95 data-[active=true]:text-white data-[active=true]:shadow-[0_15px_35px_-5px_rgba(15,23,42,0.4)] data-[active=true]:scale-105"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-1.5 text-xs sm:text-base leading-none">
                            <span className="truncate">{activeConfig.symbol}{region === 'colombia' ? amount.toLocaleString('es-CO') : amount}</span>
                            <span className="text-[10px] sm:text-xs font-semibold opacity-70 tracking-wider hidden sm:inline">{activeConfig.currency}</span>
                        </span>
                    </button>
                ))}
            </div>

            {/* Custom Input */}
            <div className="relative mb-10 group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500/70 font-black text-lg transition-colors duration-500 group-focus-within:text-slate-800">
                    {activeConfig.symbol}
                </span>
                <input
                    type="number"
                    placeholder="Elegir otro valor"
                    min="1"
                    value={inputValue}
                    onChange={handleCustomAmount}
                    className="w-full bg-white/40 backdrop-blur-xl border border-white/70 rounded-2xl py-4 sm:py-5 pl-12 pr-16 text-slate-800 font-bold text-lg sm:text-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] focus:outline-none focus:bg-white/90 focus:border-slate-400 focus:ring-4 focus:ring-slate-400/20 transition-all duration-500 hover:bg-white/60 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] focus:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] focus:-translate-y-1 placeholder:font-semibold placeholder:text-slate-400"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 bg-slate-100 text-slate-500 font-bold text-xs px-2.5 py-1 rounded-md transition-colors duration-500 group-focus-within:bg-slate-800 group-focus-within:text-white">
                    {activeConfig.currency}
                </span>
            </div>

            {/* Action Button */}
            <button
                onClick={handleDonate}
                className={`relative overflow-hidden w-full py-5 text-white font-black text-lg rounded-2xl shadow-[0_15px_30px_-10px_currentColor] hover:shadow-[0_25px_50px_-15px_currentColor] hover:-translate-y-2 active:translate-y-1 active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center gap-3 group cursor-pointer ${activeConfig.buttonColor}`}
            >
                {/* Animated Shine Effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite] ease-in-out"></div>
                
                {/* Glowing Aura Behind Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {region === 'international' && (
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
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                )}
                
                {activeConfig.buttonLabel}
                
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
