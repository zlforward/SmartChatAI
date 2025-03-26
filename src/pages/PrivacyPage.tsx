import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">隐私政策</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              我们重视您的隐私保护。本隐私政策说明我们如何收集、使用和保护您的个人信息。
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. 信息收集</h2>
            <p className="mb-6">
              我们收集的信息包括：
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">基本信息（姓名、电话、邮箱等）</li>
              <li className="mb-2">设备信息</li>
              <li className="mb-2">使用记录</li>
              <li className="mb-2">位置信息（如果您授权）</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. 信息使用</h2>
            <p className="mb-6">
              我们使用收集的信息用于：
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">提供和改进服务</li>
              <li className="mb-2">个性化推荐</li>
              <li className="mb-2">安全防护</li>
              <li className="mb-2">统计分析</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. 信息保护</h2>
            <p className="mb-6">
              我们采用严格的数据安全措施保护您的个人信息，包括加密存储、访问控制等。
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. 信息共享</h2>
            <p className="mb-6">
              除法律规定或获得您的授权外，我们不会向第三方分享您的个人信息。
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. 您的权利</h2>
            <p className="mb-6">
              您有权访问、更正、删除您的个人信息，也可以随时撤回授权同意。
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPage; 