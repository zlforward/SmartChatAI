import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import ZhiliaoLogo from './ZhiliaoLogo';
import { useTheme } from '../providers/ThemeProvider';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? theme === 'dark' 
            ? 'bg-slate-900/80 backdrop-blur-lg shadow-sm' 
            : 'bg-white/80 backdrop-blur-lg shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <ZhiliaoLogo />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground/80 hover:text-zhiliao-600 transition-colors duration-200">
              首页
            </Link>
            <Link to="/chat" className="text-foreground/80 hover:text-zhiliao-600 transition-colors duration-200">
              智能聊天
            </Link>
            <Link to="/groups" className="text-foreground/80 hover:text-zhiliao-600 transition-colors duration-200">
              社群组织
            </Link>
            <Link to="/services" className="text-foreground/80 hover:text-zhiliao-600 transition-colors duration-200">
              本地服务
            </Link>
            <Link to="/media" className="text-foreground/80 hover:text-zhiliao-600 transition-colors duration-200">
              媒体中心
            </Link>
            <Link to="/ai-assistant" className="text-foreground/80 hover:text-zhiliao-600 transition-colors duration-200">
              AI 助手
            </Link>
            <Link to="/digital-human" className="text-foreground/80 hover:text-zhiliao-600 transition-colors duration-200">
              数字人对话
            </Link>
            <Link to="/interactive-game" className="text-foreground/80 hover:text-zhiliao-600 transition-colors duration-200">
              互动影游
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Link to="/login">
              <Button variant="outline" size="sm" className="gap-2 text-zhiliao-500 border-zhiliao-500 hover:bg-zhiliao-50">
                <LogIn className="w-4 h-4" />
                登录
              </Button>
            </Link>
            
            <Link to="/register">
              <Button size="sm" className="gap-2 bg-zhiliao-500 hover:bg-zhiliao-600 text-white">
                <User className="w-4 h-4" />
                立即体验
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <button 
              className="text-foreground focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} animate-fade-in`}>
          <div className="px-4 py-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-foreground/80 hover:text-zhiliao-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              to="/chat" 
              className="block py-2 text-foreground/80 hover:text-zhiliao-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              智能聊天
            </Link>
            <Link 
              to="/groups" 
              className="block py-2 text-foreground/80 hover:text-zhiliao-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              社群组织
            </Link>
            <Link 
              to="/services" 
              className="block py-2 text-foreground/80 hover:text-zhiliao-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              本地服务
            </Link>
            <Link 
              to="/media" 
              className="block py-2 text-foreground/80 hover:text-zhiliao-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              媒体中心
            </Link>
            <Link 
              to="/ai-assistant" 
              className="block py-2 text-foreground/80 hover:text-zhiliao-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI 助手
            </Link>
            <Link 
              to="/digital-human" 
              className="block py-2 text-foreground/80 hover:text-zhiliao-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              数字人对话
            </Link>
            <Link 
              to="/interactive-game" 
              className="block py-2 text-foreground/80 hover:text-zhiliao-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              互动影游
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" className="w-full">
                <Button variant="outline" size="sm" className="w-full gap-2 text-zhiliao-500 border-zhiliao-500 hover:bg-zhiliao-50">
                  <LogIn className="w-4 h-4" />
                  登录
                </Button>
              </Link>
              <Link to="/register" className="w-full">
                <Button size="sm" className="w-full gap-2 bg-zhiliao-500 hover:bg-zhiliao-600 text-white">
                  <User className="w-4 h-4" />
                  立即体验
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
