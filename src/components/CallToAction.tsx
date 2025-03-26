
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-zhiliao-600 to-zhiliao-400 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-white max-w-2xl opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              开始您的智能助手之旅，探索全新的社交方式
            </h2>
            <p className="text-white/90 text-lg mb-6">
              立即体验"知了"，感受AI时代的智能助手如何改变您的生活、工作和社交方式。无论是生活服务、情感陪伴还是职业发展，我们都能为您提供专业的支持。
            </p>
            
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span>智能对话，精准理解您的需求</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span>本地生活服务，一句话解决日常任务</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span>心理分析，提供个性化建议</span>
              </li>
            </ul>
          </div>
          
          <div className="glass-card bg-white/20 backdrop-blur p-8 w-full max-w-md rounded-2xl opacity-0 animate-fade-in-delay">
            <h3 className="text-2xl font-bold text-white mb-6">立即注册</h3>
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="请输入您的手机号码" 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div>
                <input 
                  type="password" 
                  placeholder="请设置密码" 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 bg-white text-zhiliao-600 font-medium rounded-lg hover:bg-white/90 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  立即体验 <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-white/70 text-center">
                注册即表示您同意我们的服务条款和隐私政策
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
