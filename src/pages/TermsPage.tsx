import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">服务条款</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              欢迎使用知了助手平台。请仔细阅读以下条款，使用我们的服务即表示您同意这些条款。
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. 服务说明</h2>
            <p className="mb-6">
              知了助手提供智能对话、社群互动、本地服务等功能。我们保留随时修改、中断或终止服务的权利。
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. 用户责任</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">遵守相关法律法规</li>
              <li className="mb-2">保护账号安全</li>
              <li className="mb-2">对自己的行为负责</li>
              <li className="mb-2">尊重其他用户权益</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. 隐私保护</h2>
            <p className="mb-6">
              我们重视用户隐私保护，具体政策请参见隐私政策说明。
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. 知识产权</h2>
            <p className="mb-6">
              平台上的内容均受知识产权保护，未经许可不得擅自使用。
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. 免责声明</h2>
            <p className="mb-6">
              对于因不可抗力或非本平台原因造成的服务中断或信息丢失，本平台不承担责任。
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage; 