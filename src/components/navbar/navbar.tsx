'use client';

import React from 'react';
import { Database, Menu, X, ArrowRight } from 'lucide-react';

// ✅ Definisikan props
interface NavbarProps {
  isScrolled?: boolean;
  currentPage?: string;
  onPageChange?: (page: string) => void;
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
  showSystemStatus?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  isScrolled = false,
  currentPage = 'landing',
  onPageChange,
  isMenuOpen = false,
  onMenuToggle,
  showSystemStatus = false,
}) => {
  const navItems = [
    { label: 'Platform', href: '#platform' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Desktop App', href: '#desktop' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`bg-black/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl px-6 py-4 transition-all duration-300 ${
            isScrolled ? 'shadow-2xl shadow-black/50' : 'shadow-xl shadow-black/30'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => onPageChange?.('landing')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DATAQUERY</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/70 hover:text-white font-medium transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA + Mobile Menu Button + System Status */}
            <div className="flex items-center space-x-4">
              {/* System Status */}
              {showSystemStatus && (
                <div className="px-4 py-2 bg-green-600/20 rounded-full border border-green-500/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-sm font-medium">System Online</span>
                  </div>
                </div>
              )}

              {/* Desktop CTA Button */}
              <button
                onClick={() => {
                  onPageChange?.('/database');
                }}
                className="hidden lg:flex bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 items-center space-x-2 shadow-lg"
              >
                <span>Try for free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-6 pt-6 border-t border-gray-700/50">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-white/70 hover:text-white font-medium transition-colors duration-200 py-2"
                    onClick={onMenuToggle}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    onPageChange?.('/database');
                    onMenuToggle?.();
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg mt-4"
                >
                  <span>Try for free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
