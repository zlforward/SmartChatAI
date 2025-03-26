import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Moon, Sun, Bell, Globe, 
  Shield, Eye, EyeOff,
  Save, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'system',
      title: '系统通知',
      description: '接收系统更新、维护等通知',
      enabled: true
    },
    {
      id: 'security',
      title: '安全通知',
      description: '接收账号安全相关通知',
      enabled: true
    },
    {
      id: 'marketing',
      title: '营销通知',
      description: '接收产品推广、活动等通知',
      enabled: false
    },
    {
      id: 'community',
      title: '社区通知',
      description: '接收社区互动相关通知',
      enabled: true
    }
  ]);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === key 
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">设置</h1>

          <ScrollArea className="h-[calc(100vh-200px)]">
            {/* 外观设置 */}
            <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
              <CardHeader>
                <CardTitle>外观设置</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>深色模式</Label>
                    <p className="text-sm text-muted-foreground">
                      切换深色/浅色主题
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeChange('light')}
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeChange('dark')}
                    >
                      <Moon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 通知设置 */}
            <Card className={`mt-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map(notification => (
                    <div key={notification.id} className="flex items-center justify-between">
                      <div>
                        <Label>{notification.title}</Label>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <Switch
                        checked={notification.enabled}
                        onCheckedChange={() => handleNotificationChange(notification.id as keyof typeof notifications)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 语言设置 */}
            <Card className={`mt-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
              <CardHeader>
                <CardTitle>语言设置</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>界面语言</Label>
                    <p className="text-sm text-muted-foreground">
                      选择您偏好的界面语言
                    </p>
                  </div>
                  <Button variant="outline">
                    <Globe className="h-4 w-4 mr-2" />
                    简体中文
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 隐私设置 */}
            <Card className={`mt-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
              <CardHeader>
                <CardTitle>隐私设置</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>在线状态</Label>
                      <p className="text-sm text-muted-foreground">
                        是否显示您的在线状态
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>阅读状态</Label>
                      <p className="text-sm text-muted-foreground">
                        是否显示消息已读状态
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 安全设置 */}
            <Card className={`mt-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
              <CardHeader>
                <CardTitle>安全设置</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>当前密码</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="请输入当前密码"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>新密码</Label>
                    <Input
                      type="password"
                      placeholder="请输入新密码"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>确认新密码</Label>
                    <Input
                      type="password"
                      placeholder="请再次输入新密码"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      取消
                    </Button>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      保存
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 账号设置 */}
            <Card className={`mt-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
              <CardHeader>
                <CardTitle>账号设置</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>账号注销</Label>
                      <p className="text-sm text-muted-foreground">
                        永久删除您的账号和相关数据
                      </p>
                    </div>
                    <Button variant="destructive">
                      注销账号
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage; 