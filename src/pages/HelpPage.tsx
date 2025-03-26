import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Search, MessageSquare, Phone, Mail, 
  ChevronRight, ChevronDown, HelpCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

interface HelpCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  faqs: FAQ[];
}

const HelpPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const helpCategories: HelpCategory[] = [
    {
      title: '账号相关',
      description: '账号注册、登录、安全等问题',
      icon: <HelpCircle className="h-6 w-6" />,
      faqs: [
        {
          question: '如何注册知了账号？',
          answer: '您可以通过手机号码或邮箱注册知了账号。点击首页的"注册"按钮，按照提示填写相关信息即可完成注册。'
        },
        {
          question: '忘记密码怎么办？',
          answer: '在登录页面点击"忘记密码"，通过手机验证码或邮箱验证的方式重置密码。'
        },
        {
          question: '如何修改账号信息？',
          answer: '登录后进入个人中心，点击"编辑资料"即可修改头像、昵称等个人信息。'
        }
      ]
    },
    {
      title: '功能使用',
      description: '平台功能使用指南',
      icon: <MessageSquare className="h-6 w-6" />,
      faqs: [
        {
          question: '如何使用智能助手？',
          answer: '在首页点击"智能助手"卡片，即可开始与AI助手对话。您可以询问各种问题，获取帮助和建议。'
        },
        {
          question: '如何发布动态？',
          answer: '在首页点击"发布"按钮，选择要发布的内容类型（文字、图片、视频等），编辑完成后点击发布即可。'
        },
        {
          question: '如何加入兴趣小组？',
          answer: '在"小组"页面浏览感兴趣的小组，点击"加入"按钮即可成为小组成员。'
        }
      ]
    },
    {
      title: '会员服务',
      description: '会员权益和使用说明',
      icon: <HelpCircle className="h-6 w-6" />,
      faqs: [
        {
          question: '会员有哪些特权？',
          answer: '会员可以享受无限次AI对话、专属客服、高级功能等特权。具体权益可在会员页面查看。'
        },
        {
          question: '如何开通会员？',
          answer: '在"会员"页面选择适合的会员套餐，完成支付即可开通会员服务。'
        },
        {
          question: '会员可以退款吗？',
          answer: '会员服务开通后7天内可申请退款，具体退款规则请查看会员服务协议。'
        }
      ]
    },
    {
      title: '安全与隐私',
      description: '账号安全和隐私保护',
      icon: <HelpCircle className="h-6 w-6" />,
      faqs: [
        {
          question: '如何保护账号安全？',
          answer: '建议您定期更换密码，开启双重认证，不要将账号信息泄露给他人。'
        },
        {
          question: '如何设置隐私保护？',
          answer: '在"设置"页面可以设置个人资料的可见范围，管理好友权限等。'
        },
        {
          question: '遇到账号被盗怎么办？',
          answer: '立即修改密码，联系客服冻结账号，并提供相关证明材料。'
        }
      ]
    }
  ];

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.faqs.some(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">帮助中心</h1>
            <p className="text-muted-foreground">
              在这里您可以找到常见问题的解答，如果还有其他问题，请联系我们的客服团队。
            </p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索问题或关键词..."
              className={`pl-10 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  在线客服
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  工作时间：周一至周日 9:00-22:00
                </p>
                <Button className="w-full">
                  联系客服
                </Button>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  邮件支持
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  发送邮件至：support@zhiliao.com
                </p>
                <Button variant="outline" className="w-full">
                  发送邮件
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {filteredCategories.map((category, index) => (
              <Card key={index} className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category.icon}
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <Accordion type="single" collapsible>
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${faqIndex}`}>
                        <AccordionTrigger>
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpPage; 