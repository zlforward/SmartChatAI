import React from 'react';
import ZhiliaoLogo from './ZhiliaoLogo';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <ZhiliaoLogo className="mb-4" />
            <p className="text-foreground/70 dark:text-foreground/60 mb-6">
              "知了"是一款革命性的AI时代人手一个的全能随身助理社交工具，定位成微信的AI助理版本，可实现在线和离线两种模式的智能服务。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/50 hover:text-zhiliao-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/50 hover:text-zhiliao-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/50 hover:text-zhiliao-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">快速链接</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground">
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                    服务条款
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                    隐私政策
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-foreground">
                    常见问题
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                    联系我们
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-zhiliao-500 mt-0.5" />
                <span className="text-foreground/70">+86 400 888 8888</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-zhiliao-500 mt-0.5" />
                <span className="text-foreground/70">contact@zhiliao.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-zhiliao-500 mt-0.5" />
                <span className="text-foreground/70">智蔚（北京）科技有限公司<br />北京市丰台区丰台科技园3期</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">订阅通讯</h3>
            <p className="text-foreground/70 mb-4">
              订阅我们的通讯，获取最新的产品更新和行业新闻。
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="您的邮箱地址" 
                className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-zhiliao-300 focus:border-zhiliao-300 dark:bg-slate-800 dark:border-slate-700"
              />
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-zhiliao-500 text-white font-medium rounded-lg hover:bg-zhiliao-600 transition-colors duration-300"
              >
                订阅
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} 知了. 保留所有权利。由 智蔚（北京）科技有限公司 提供技术支持。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
