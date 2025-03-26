import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  User, Lock, Eye, EyeOff, 
  Phone, Mail, QrCode
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const LoginPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'phone' | 'qrcode'>('password');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
    verificationCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password login logic here
    console.log('Password login:', { username: formData.username, password: formData.password });
    navigate('/');
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement phone login logic here
    console.log('Phone login:', { phone: formData.phone, code: formData.verificationCode });
    navigate('/');
  };

  const handleQrCodeLogin = () => {
    // Implement QR code login logic here
    console.log('QR code login');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-md mx-auto">
          <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">登录</CardTitle>
              <CardDescription>欢迎回来，请登录您的账号</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="password" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="password">密码登录</TabsTrigger>
                  <TabsTrigger value="phone">手机登录</TabsTrigger>
                  <TabsTrigger value="qrcode">扫码登录</TabsTrigger>
                </TabsList>
                
                <TabsContent value="password">
                  <form onSubmit={handlePasswordLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">用户名</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          id="username"
                          name="username"
                          type="text"
                          placeholder="请输入用户名" 
                          className={`pl-10 ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">密码</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="请输入密码" 
                          className={`pl-10 ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="remember" className="rounded border-gray-300" />
                        <Label htmlFor="remember" className="text-sm">记住我</Label>
                      </div>
                      <Link to="/reset-password" className="text-sm text-zhiliao-600 hover:underline">
                        忘记密码？
                      </Link>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      登录
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="phone">
                  <form onSubmit={handlePhoneLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">手机号码</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="请输入手机号码" 
                          className={`pl-10 ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="verification-code">验证码</Label>
                      <div className="flex gap-4">
                        <div className="relative flex-grow">
                          <Input 
                            id="verification-code"
                            name="verificationCode"
                            type="text"
                            placeholder="请输入验证码" 
                            className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}
                            value={formData.verificationCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <Button type="button" variant="outline">
                          获取验证码
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      登录
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="qrcode">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-48 h-48 bg-white p-4 rounded-lg">
                      <QrCode className="w-full h-full" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      请使用知聊APP扫描二维码登录
                    </p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={handleQrCodeLogin}
                    >
                      刷新二维码
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className={`px-2 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} text-muted-foreground`}>
                      其他登录方式
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    微信登录
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    邮箱登录
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">还没有账号？</span>{' '}
                <Link to="/register" className="text-zhiliao-600 hover:underline font-medium">
                  立即注册
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
