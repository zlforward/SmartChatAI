import React from 'react';
import { Crown, Star, Shield, Award, CheckCircle, Gift, ArrowRight, User, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '../providers/ThemeProvider';

const MembershipPage = () => {
  const { theme } = useTheme();

  const membershipTiers = [
    {
      title: '标准会员',
      price: '￥99/月',
      description: '基础智能助手服务',
      features: [
        '无限量AI对话',
        '基础生活服务',
        '社群互动功能',
        '7×24小时在线支持'
      ],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
      buttonText: '立即开通'
    },
    {
      title: '黄金会员',
      price: '￥199/月',
      description: '进阶智能助手服务',
      features: [
        '专属AI助手定制',
        '优先响应服务',
        'VIP社群特权',
        '专业技术支持'
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
      buttonText: '立即升级',
      popular: true
    },
    {
      title: '钻石会员',
      price: '￥399/月',
      description: '尊享智能助手服务',
      features: [
        '多场景AI助手',
        '一对一专属服务',
        '行业解决方案',
        '企业技术支持'
      ],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1470&auto=format&fit=crop",
      buttonText: '联系客服'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">会员专区</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              成为知了会员，享受尊贵特权与专属服务
            </p>
          </div>

          {/* Membership Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {membershipTiers.map((card, index) => (
              <Card key={index} className={`relative overflow-hidden ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''} ${card.popular ? 'ring-2 ring-zhiliao-500' : ''}`}>
                {card.popular && (
                  <Badge className="absolute top-4 right-4 bg-zhiliao-500">最受欢迎</Badge>
                )}
                <div className="h-40 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{card.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </CardHeader>
                <CardContent className="pb-4">
                  <ul className="space-y-2">
                    {card.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{card.buttonText}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Member Exclusive Services */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">会员专属服务</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}>
                <CardContent className="pt-6">
                  <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <Gift className="h-6 w-6 text-zhiliao-500" />
                  </div>
                  <h3 className="font-bold mb-2">专属礼包</h3>
                  <p className="text-sm text-muted-foreground">
                    每月送出精美会员礼包，线上线下均可领取
                  </p>
                </CardContent>
              </Card>
              <Card className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}>
                <CardContent className="pt-6">
                  <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <User className="h-6 w-6 text-zhiliao-500" />
                  </div>
                  <h3 className="font-bold mb-2">专家一对一</h3>
                  <p className="text-sm text-muted-foreground">
                    多领域专家提供一对一咨询服务和建议
                  </p>
                </CardContent>
              </Card>
              <Card className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}>
                <CardContent className="pt-6">
                  <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <Award className="h-6 w-6 text-zhiliao-500" />
                  </div>
                  <h3 className="font-bold mb-2">优先体验</h3>
                  <p className="text-sm text-muted-foreground">
                    新功能抢先体验，参与产品研发建议
                  </p>
                </CardContent>
              </Card>
              <Card className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}>
                <CardContent className="pt-6">
                  <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <Clock className="h-6 w-6 text-zhiliao-500" />
                  </div>
                  <h3 className="font-bold mb-2">专属活动</h3>
                  <p className="text-sm text-muted-foreground">
                    定期举办线上线下会员专属活动
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-r from-zhiliao-700 to-slate-800' : 'bg-gradient-to-r from-zhiliao-500 to-zhiliao-700'}`}>
            <div className="px-6 py-12 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">立即加入知了会员</h2>
              <p className="max-w-2xl mx-auto mb-6">
                解锁所有高级功能，享受专属服务，提升您的知了体验
              </p>
              <Button size="lg" className="bg-white text-zhiliao-600 hover:bg-zhiliao-50">
                立即开通
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MembershipPage;
