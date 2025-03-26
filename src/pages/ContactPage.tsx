import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ContactPage: React.FC = () => {
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理表单提交
    console.log('提交反馈');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">联系我们</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
              <CardContent className="flex flex-col items-center p-6">
                <Phone className="h-10 w-10 text-zhiliao-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">客服电话</h3>
                <p className="text-center text-muted-foreground">
                  400-123-4567<br />
                  周一至周日 9:00-21:00
                </p>
              </CardContent>
            </Card>
            
            <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
              <CardContent className="flex flex-col items-center p-6">
                <Mail className="h-10 w-10 text-zhiliao-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">电子邮箱</h3>
                <p className="text-center text-muted-foreground">
                  support@zhiliao.com<br />
                  24小时内回复
                </p>
              </CardContent>
            </Card>
            
            <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
              <CardContent className="flex flex-col items-center p-6">
                <MapPin className="h-10 w-10 text-zhiliao-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">公司地址</h3>
                <p className="text-center text-muted-foreground">
                  北京市朝阳区<br />
                  科技园区88号
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">在线反馈</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      placeholder="请输入您的姓名"
                      className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="请输入您的邮箱"
                      className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">主题</Label>
                  <Input
                    id="subject"
                    placeholder="请输入反馈主题"
                    className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">内容</Label>
                  <Textarea
                    id="message"
                    placeholder="请详细描述您的问题或建议"
                    className={`min-h-[150px] ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  提交反馈
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage; 