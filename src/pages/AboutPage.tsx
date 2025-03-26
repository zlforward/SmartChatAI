import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">关于我们</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              知了助手是一个创新的智能社交平台，致力于为用户提供优质的AI助手服务和社交体验。
              我们的使命是通过先进的人工智能技术，让每个人都能享受到智能化带来的便利。
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">我们的愿景</h2>
            <p className="mb-6">
              成为全球领先的智能社交服务提供商，打造一个充满活力、互助共享的智能社区。
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">核心价值观</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">用户至上：始终将用户需求放在首位</li>
              <li className="mb-2">创新驱动：持续探索AI技术的创新应用</li>
              <li className="mb-2">品质保证：提供高质量的服务体验</li>
              <li className="mb-2">诚信负责：恪守商业道德，承担社会责任</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">发展历程</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium">2023年</h3>
                <p>知了助手正式上线，推出智能对话、社群互动等核心功能</p>
              </div>
              <div>
                <h3 className="text-xl font-medium">2024年</h3>
                <p>持续优化产品功能，扩展服务范围，提升用户体验</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage; 