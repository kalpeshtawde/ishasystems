import React from 'react';
import { Terminal } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'architecture', label: 'Our Stack' },
    { id: 'contact', label: 'Get Started' }
  ];

  return (
    <nav className="bg-[#0B192C] text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <Terminal className="text-[#FF6500] h-6 w-6" />
            <span className="font-bold text-xl tracking-tight">Isha<span className="text-[#FF6500]">Systems</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentTab === item.id ? 'text-[#FF6500] font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => setCurrentTab('contact')}
              className="bg-[#FF6500] hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded transition-all transform hover:-translate-y-0.5"
            >
              Claim $300 Offer
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
