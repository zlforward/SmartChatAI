import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Eye, EyeOff, Phone, Lock, ArrowRight, 
  CheckCircle2, XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const ResetPasswordPage: React.FC = () => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSendCode = () => {
    if (!phoneNumber || countdown > 0) return;
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

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement verification logic here
    setStep(2);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    
    // Calculate password strength
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password reset logic here
    console.log('Reset password with:', { phoneNumber, verificationCode, newPassword });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-md mx-auto">
          <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">重置密码</CardTitle>
              <CardDescription>通过手机验证码重置您的密码</CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <form onSubmit={handleVerifyCode}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">手机号码</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          id="phone"
                          type="tel"
                          placeholder="请输入手机号码" 
                          className={`pl-10 ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
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
                            type="text"
                            placeholder="请输入验证码" 
                            className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleSendCode}
                          disabled={!phoneNumber || countdown > 0}
                        >
                          {countdown > 0 ? `${countdown}秒` : '获取验证码'}
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      验证
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">新密码</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="请设置新密码" 
                          className={`pl-10 ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
                          value={newPassword}
                          onChange={handlePasswordChange}
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
                      <Label htmlFor="confirm-password">确认新密码</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="请再次输入新密码" 
                          className={`pl-10 ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
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
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
                    >
                      重置密码
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setStep(1)}
                    >
                      返回上一步
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">想起密码了？</span>{' '}
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

export default ResetPasswordPage; 