import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  User, Settings, Bell, Lock, 
  CreditCard, Heart, Star, 
  MessageSquare, History, 
  LogOut, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  onClick: () => void;
}

const UserCenterPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems: MenuItem[] = [
    {
      icon: <User className="h-5 w-5" />,
      title: '个人资料',
      description: '修改头像、昵称等个人信息',
      onClick: () => console.log('个人资料')
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: '账号设置',
      description: '管理账号相关设置',
      onClick: () => console.log('账号设置')
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: '消息通知',
      description: '设置消息提醒方式',
      badge: '3',
      onClick: () => console.log('消息通知')
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: '隐私设置',
      description: '管理个人隐私选项',
      onClick: () => console.log('隐私设置')
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: '支付管理',
      description: '管理支付方式和账单',
      onClick: () => console.log('支付管理')
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: '我的收藏',
      description: '查看收藏的内容',
      onClick: () => console.log('我的收藏')
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: '我的关注',
      description: '管理关注的用户和话题',
      onClick: () => console.log('我的关注')
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: '我的评论',
      description: '查看发表的评论',
      onClick: () => console.log('我的评论')
    },
    {
      icon: <History className="h-5 w-5" />,
      title: '浏览历史',
      description: '查看浏览过的内容',
      onClick: () => console.log('浏览历史')
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* 用户信息卡片 */}
          <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/avatars/user.jpg" />
                  <AvatarFallback>用户</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">张明</h1>
                  <p className="text-muted-foreground">高级会员</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 主要内容区域 */}
          <div className="mt-6">
            <Tabs defaultValue="profile" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  个人中心
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Lock className="h-4 w-4 mr-2" />
                  安全中心
                </TabsTrigger>
                <TabsTrigger value="notification">
                  <Bell className="h-4 w-4 mr-2" />
                  消息中心
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems.map((item, index) => (
                    <Card 
                      key={index}
                      className={`cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                        theme === 'dark' ? 'bg-slate-800' : ''
                      }`}
                      onClick={item.onClick}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {item.icon}
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium">{item.title}</h3>
                                {item.badge && (
                                  <Badge variant="secondary">{item.badge}</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-4">
                  <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">登录密码</h3>
                          <p className="text-sm text-muted-foreground">
                            定期更改密码可以提高账号安全性
                          </p>
                        </div>
                        <Button variant="outline">修改密码</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">手机绑定</h3>
                          <p className="text-sm text-muted-foreground">
                            已绑定手机号：138****8888
                          </p>
                        </div>
                        <Button variant="outline">更换手机号</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">邮箱绑定</h3>
                          <p className="text-sm text-muted-foreground">
                            已绑定邮箱：example@email.com
                          </p>
                        </div>
                        <Button variant="outline">更换邮箱</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="notification">
                <div className="space-y-4">
                  <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">系统通知</h3>
                          <p className="text-sm text-muted-foreground">
                            接收系统更新、维护等通知
                          </p>
                        </div>
                        <Button variant="outline">设置</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">互动通知</h3>
                          <p className="text-sm text-muted-foreground">
                            接收评论、点赞等互动通知
                          </p>
                        </div>
                        <Button variant="outline">设置</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* 退出登录按钮 */}
          <div className="mt-8 text-center">
            <Button variant="outline" className="text-red-500 hover:text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              退出登录
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserCenterPage; 