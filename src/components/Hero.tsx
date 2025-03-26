
import React, { useEffect, useRef } from 'react';
import { MessageCircle, Clock, Globe, Brain } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;

      const elements = heroElement.querySelectorAll('.parallax-element');
      elements.forEach((el: Element) => {
        const htmlElement = el as HTMLElement;
        const speed = parseFloat(htmlElement.getAttribute('data-speed') || '1');
        const rotateX = y * 10 * speed;
        const rotateY = -x * 10 * speed;
        const translateZ = 50 * speed;

        htmlElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-gradient-to-b from-white to-zhiliao-50">
      {/* Background Circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-zhiliao-200 to-zhiliao-300 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-zhiliao-300 to-zhiliao-400 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Hero Content */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left opacity-0 animate-fade-in-slow">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-zhiliao-100 text-zhiliao-700 text-sm font-medium mb-6">
                AI时代随身助理社交平台
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                今天你<span className="text-gradient">知了</span>了吗？
              </h1>
              <p className="text-lg text-foreground/75 mb-8 max-w-lg mx-auto lg:mx-0">
                定制化AI助理，为您提供24小时全天候服务，满足您的个人需求，提高您的生活质量和工作效率。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="button-primary">
                立即体验
              </button>
              <button className="button-secondary">
                了解更多
              </button>
            </div>
            
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-foreground/75">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-zhiliao-500" />
                <span>智能对话</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-zhiliao-500" />
                <span>24小时在线</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-zhiliao-500" />
                <span>本地生活服务</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-zhiliao-500" />
                <span>心理分析</span>
              </div>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="w-full lg:w-1/2 opacity-0 animate-fade-in-delay">
            <div className="relative mx-auto max-w-md">
              {/* Main Character */}
              <div className="parallax-element" data-speed="1">
                <img 
                  src="/lovable-uploads/4b52d5b8-3359-4ad1-aed3-127f979b2490.png" 
                  alt="智能助手形象" 
                  className="w-full h-auto relative z-10 drop-shadow-2xl"
                />
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 glass-card flex items-center justify-center parallax-element" data-speed="1.5">
                <Clock className="h-8 w-8 text-zhiliao-500" />
              </div>
              
              <div className="absolute top-1/4 -right-8 w-20 h-20 glass-card flex items-center justify-center parallax-element" data-speed="1.8">
                <MessageCircle className="h-10 w-10 text-zhiliao-500" />
              </div>
              
              <div className="absolute bottom-1/4 -left-12 w-24 h-24 glass-card flex items-center justify-center parallax-element" data-speed="2">
                <Globe className="h-12 w-12 text-zhiliao-500" />
              </div>
              
              <div className="absolute -bottom-6 right-0 w-16 h-16 glass-card flex items-center justify-center parallax-element" data-speed="1.2">
                <Brain className="h-8 w-8 text-zhiliao-500" />
              </div>
              
              {/* Animated Circles */}
              <div className="animated-circle w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="animated-circle w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '0.5s' }}></div>
              <div className="animated-circle w-64 h-64 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#FFFFFF" 
            fillOpacity="1" 
            d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,58.7C960,43,1056,21,1152,21.3C1248,21,1344,43,1392,53.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
