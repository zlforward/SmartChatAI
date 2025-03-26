import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  User, Lock, Eye, EyeOff, 
  Phone, Mail, CheckCircle2, XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const RegisterPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const [countdown, setCountdown] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      // Calculate password strength
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[a-z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      setPasswordStrength(strength);
    }
  };

  const handleSendCode = () => {
    if (!formData.phone || countdown > 0) return;
    // Simulate sending code
    setCountdown(60);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement registration logic here
    console.log('Register with:', formData);
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-md mx-auto">
          <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">注册</CardTitle>
              <CardDescription>创建一个新的知聊账号</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
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
                  <Label htmlFor="email">电子邮箱</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="请输入电子邮箱" 
                      className={`pl-10 ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
                      value={formData.email}
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
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleSendCode}
                      disabled={!formData.phone || countdown > 0}
                    >
                      {countdown > 0 ? `${countdown}秒` : '获取验证码'}
                    </Button>
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
                      placeholder="请设置密码" 
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
                  <Progress value={passwordStrength} className="h-1" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>密码强度</span>
                    <span>{passwordStrength}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">确认密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="请再次输入密码" 
                      className={`pl-10 ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    密码长度至少8个字符
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    包含大小写字母和数字
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <XCircle className="h-4 w-4 mr-2 text-red-500" />
                    避免使用常见密码
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="agreement" className="rounded border-gray-300" required />
                  <Label htmlFor="agreement" className="text-sm">
                    我已阅读并同意
                    <Link to="/terms" className="text-zhiliao-600 hover:underline ml-1">
                      服务条款
                    </Link>
                    和
                    <Link to="/privacy" className="text-zhiliao-600 hover:underline ml-1">
                      隐私政策
                    </Link>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!formData.username || !formData.phone || !formData.email || 
                           !formData.verificationCode || !formData.password || 
                           !formData.confirmPassword || formData.password !== formData.confirmPassword}
                >
                  注册
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">已有账号？</span>{' '}
                <Link to="/login" className="text-zhiliao-600 hover:underline font-medium">
                  立即登录
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

export default RegisterPage;
