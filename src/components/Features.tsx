
import React from 'react';
import { Clock, MessageCircle, Globe, Brain, Heart, Shield, Star, Users } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-zhiliao-500" />,
      title: "24小时全天候联系",
      description: "无论何时何地，您的智能助手都在您身边，随时准备为您服务，满足您的即时需求。"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-zhiliao-500" />,
      title: "智能对话系统",
      description: "基于先进的自然语言处理技术，理解您的意图，提供精准的回答和建议。"
    },
    {
      icon: <Globe className="h-8 w-8 text-zhiliao-500" />,
      title: "本地生活服务",
      description: "通过简单的语音或文字指令，快速完成订票、点餐、打车等日常任务。"
    },
    {
      icon: <Brain className="h-8 w-8 text-zhiliao-500" />,
      title: "心理分析大模型",
      description: "深度理解您的性格特点和行为模式，提供个性化的心理健康建议。"
    },
    {
      icon: <Users className="h-8 w-8 text-zhiliao-500" />,
      title: "人脉匹配服务",
      description: "基于您的兴趣和需求，为您推荐合适的职业伙伴、朋友或创业伙伴。"
    },
    {
      icon: <Star className="h-8 w-8 text-zhiliao-500" />,
      title: "成功预测模型",
      description: "分析您的决策和行为，预测不同选择的成功概率，帮助您做出更明智的决策。"
    },
    {
      icon: <Shield className="h-8 w-8 text-zhiliao-500" />,
      title: "数据安全保障",
      description: "采用先进的加密技术和严格的隐私政策，确保您的个人数据安全。"
    },
    {
      icon: <Heart className="h-8 w-8 text-zhiliao-500" />,
      title: "情感陪伴",
      description: "理解您的情绪变化，提供温暖的陪伴和支持，成为您的数字伙伴。"
    }
  ];

  return (
    <section id="features" className="section-padding bg-white relative">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in-delay">
          <span className="inline-block py-1 px-3 rounded-full bg-zhiliao-100 text-zhiliao-700 text-sm font-medium mb-4">
            功能特点
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            全方位智能助手，优化您的<span className="text-gradient">生活体验</span>
          </h2>
          <p className="text-foreground/75 text-lg">
            我们的AI助手不仅是一个聊天工具，更是您生活中不可或缺的智能伙伴，随时随地满足您的各种需求。
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card opacity-0"
              style={{ 
                animation: `fade-in 0.5s ease-out ${0.1 + index * 0.1}s forwards` 
              }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/75">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Diagonal Background */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-zhiliao-50 -skew-y-2 transform origin-top-right -z-10"></div>
    </section>
  );
};

export default Features;
