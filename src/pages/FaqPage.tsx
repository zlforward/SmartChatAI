import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">常见问题</h1>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>如何注册账号？</AccordionTrigger>
              <AccordionContent>
                点击首页右上角的"立即注册"按钮，填写手机号、验证码和密码即可完成注册。
                我们也支持使用邮箱注册或第三方账号登录。
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>如何使用智能助手？</AccordionTrigger>
              <AccordionContent>
                登录后进入"智能聊天"页面，您可以直接与AI助手对话。
                助手可以回答问题、提供建议、协助工作等。支持文字、语音多种交互方式。
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>如何加入社群？</AccordionTrigger>
              <AccordionContent>
                在"社群组织"页面，您可以浏览和搜索感兴趣的社群。
                点击"加入"按钮即可成为社群成员，参与讨论和活动。
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>会员有哪些特权？</AccordionTrigger>
              <AccordionContent>
                会员可以享受更多高级功能，包括：无限次数使用AI助手、优先客服支持、
                专属社群、个性化推荐等。详情请查看会员中心页面。
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>如何保护账号安全？</AccordionTrigger>
              <AccordionContent>
                建议您：定期更换密码、开启双重认证、不在不信任的设备上登录、
                不泄露验证码给他人。如发现异常，请立即联系客服。
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>遇到问题如何反馈？</AccordionTrigger>
              <AccordionContent>
                您可以通过以下方式反馈问题：
                1. 在APP内的"帮助与反馈"页面提交
                2. 发送邮件至 support@zhiliao.com
                3. 拨打客服热线 400-123-4567
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqPage; 