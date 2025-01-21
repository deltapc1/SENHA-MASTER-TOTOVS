import React, { useEffect, useState } from 'react';
import { Calendar, Copy, CheckCircle2 } from 'lucide-react';

function App() {
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculatePassword();
  }, []);

  const calculatePassword = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear().toString().slice(-2);
    
    const day2 = parseInt(day.toString(), 10);
    const month2 = parseInt(month.toString(), 10);
    const year2 = parseInt(year.toString(), 10);
    
    const passwordNum = (year2 + month2 + day2) * 7;
    const lastTwoDigits = passwordNum.toString().slice(-2);
    
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = month.toString().padStart(2, '0');
    
    setPassword(`${lastTwoDigits} ${year} ${monthStr} ${dayStr}`);
    setDate(`${dayStr}/${monthStr}/${today.getFullYear()}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#000913] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-48 -right-48 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -bottom-48 -left-48 animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              SENHA MASTER
            </h1>
            <div className="flex items-center justify-center gap-2 bg-white/5 rounded-full py-2 px-4 w-fit mx-auto backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-green-400" />
              <p className="text-gray-300">{date}</p>
            </div>
          </div>

          {/* Password Display */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between gap-3 mb-6">
                <h2 className="text-xl font-semibold text-green-400">Senha do Dia</h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-full py-2 px-4 transition-all duration-300"
                >
                  {copied ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-blue-400" />
                  )}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <div className="bg-black/30 rounded-xl p-6 text-center backdrop-blur-sm">
                <p className="text-4xl font-mono tracking-wider bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  {password}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Desenvolvido por FABIO JESUINO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;