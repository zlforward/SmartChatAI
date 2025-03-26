import React, { useState } from 'react';
import { Search, Users, UserPlus, Plus, Calendar, BarChart3, Bell, PanelRight, Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '../providers/ThemeProvider';
import { useToast } from '@/hooks/use-toast';

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
  tags: string[];
  lastActive: string;
}

interface Activity {
  id: string;
  title: string;
  group: string;
  description: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  image: string;
}

const DUMMY_GROUPS: Group[] = [
  {
    id: '1',
    name: '知了爱好者社区',
    description: '讨论知了平台的最新功能和使用技巧',
    members: 1250,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop",
    tags: ['官方', '学习'],
    lastActive: '刚刚',
  },
  {
    id: '2',
    name: 'AI技术交流群',
    description: '探讨人工智能最新发展和应用场景',
    members: 876,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1470&auto=format&fit=crop",
    tags: ['技术', 'AI'],
    lastActive: '10分钟前',
  },
  {
    id: '3',
    name: '城市服务助手',
    description: '分享本地生活服务使用经验和技巧',
    members: 543,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
    tags: ['生活', '服务'],
    lastActive: '1小时前',
  },
  {
    id: '4',
    name: '创业者俱乐部',
    description: '连接创业者，分享资源和经验',
    members: 328,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop',
    tags: ['创业', '商业'],
    lastActive: '2小时前',
  },
  {
    id: '5',
    name: '求职招聘交流群',
    description: '发布和寻找工作机会，职业规划讨论',
    members: 692,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop',
    tags: ['求职', '招聘'],
    lastActive: '3小时前',
  },
  {
    id: '6',
    name: '数字生活方式',
    description: '讨论如何利用数字工具提升生活品质',
    members: 412,
    image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=1470&auto=format&fit=crop',
    tags: ['数字', '生活方式'],
    lastActive: '1天前',
  },
];

const DUMMY_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'AI图像生成技术分享会',
    group: 'AI技术交流群',
    description: '本次活动将邀请行业专家分享最新的AI图像生成技术与应用案例，欢迎对AI图像生成感兴趣的朋友参加。',
    date: '2023-06-15 19:00',
    location: '线上会议',
    participants: 45,
    maxParticipants: 100,
    image: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: '2',
    title: '创业者沙龙：从0到1的创业历程',
    group: '创业者俱乐部',
    description: '分享创业初期的经验教训，从产品定位、团队组建到融资的全过程经验分享。',
    date: '2023-06-18 14:00',
    location: '北京市海淀区创业大厦',
    participants: 28,
    maxParticipants: 50,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop',
  },
  {
    id: '3',
    title: '数字工具效率提升工作坊',
    group: '数字生活方式',
    description: '本次工作坊将介绍一系列提升工作和生活效率的数字工具，并进行实操演示。',
    date: '2023-06-20 19:30',
    location: '线上会议',
    participants: 36,
    maxParticipants: 80,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop',
  },
];

const RADAR_GROUPS = [
  {
    id: '1',
    name: '城市摄影爱好者',
    members: 325,
    distance: '0.5公里',
    active: true,
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: '2',
    name: '本地美食分享',
    members: 452,
    distance: '1.2公里',
    active: true,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: '3',
    name: '周末户外运动',
    members: 186,
    distance: '2.4公里',
    active: false,
    image: 'https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?q=80&w=1470&auto=format&fit=crop',
  },
];

const GroupsPage: React.FC = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('groups');
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [activityLocation, setActivityLocation] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateActivity = () => {
    // In a real app, you would save the new activity to your backend
    toast({
      title: "活动已创建",
      description: "您的活动已成功发布",
    });
    setDialogOpen(false);
    // Reset form
    setActivityTitle('');
    setActivityDescription('');
    setActivityDate('');
    setActivityLocation('');
  };

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "已申请加入",
      description: `您已成功申请加入「${groupName}」`,
    });
  };

  const handleJoinActivity = (activityTitle: string) => {
    toast({
      title: "已报名参加",
      description: `您已成功报名参加「${activityTitle}」活动`,
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">社群组织</h1>
              <p className="text-muted-foreground">
                发现并加入志同道合的社群，分享知识和经验
              </p>
            </div>
            <div className="flex gap-2">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Calendar className="h-5 w-5" />
                    发布活动
                  </Button>
                </DialogTrigger>
                <DialogContent className={`sm:max-w-[500px] ${theme === 'dark' ? 'bg-slate-800 text-white' : ''}`}>
                  <DialogHeader>
                    <DialogTitle>创建新活动</DialogTitle>
                    <DialogDescription>
                      填写下方表单发布您的活动信息
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="activity-title" className="text-right">
                        活动标题
                      </label>
                      <Input
                        id="activity-title"
                        value={activityTitle}
                        onChange={(e) => setActivityTitle(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="activity-date" className="text-right">
                        活动时间
                      </label>
                      <Input
                        id="activity-date"
                        value={activityDate}
                        onChange={(e) => setActivityDate(e.target.value)}
                        placeholder="如：2023-06-30 14:00"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="activity-location" className="text-right">
                        活动地点
                      </label>
                      <Input
                        id="activity-location"
                        value={activityLocation}
                        onChange={(e) => setActivityLocation(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <label htmlFor="activity-description" className="text-right pt-2">
                        活动描述
                      </label>
                      <Textarea
                        id="activity-description"
                        value={activityDescription}
                        onChange={(e) => setActivityDescription(e.target.value)}
                        className="col-span-3"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreateActivity}>发布活动</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button className="gap-2" variant="outline">
                <Plus className="h-5 w-5" />
                创建社群
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="搜索社群..." 
                className={`pl-10 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}
              />
            </div>
          </div>

          <Tabs defaultValue="groups" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="groups">社群</TabsTrigger>
              <TabsTrigger value="activities">活动</TabsTrigger>
              <TabsTrigger value="radar">附近雷达</TabsTrigger>
            </TabsList>
            
            <TabsContent value="groups" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DUMMY_GROUPS.map((group) => (
                  <Card key={group.id} className={`overflow-hidden hover:shadow-md transition-shadow ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}>
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={group.image} 
                        alt={group.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{group.name}</CardTitle>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Users className="h-4 w-4 mr-1" />
                          {group.members}
                        </div>
                      </div>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2">
                        {group.tags.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        活跃: {group.lastActive}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleJoinGroup(group.name)}
                      >
                        <UserPlus className="h-4 w-4" />
                        加入
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activities" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DUMMY_ACTIVITIES.map((activity) => (
                  <Card key={activity.id} className={`overflow-hidden hover:shadow-md transition-shadow ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}>
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={activity.image} 
                        alt={activity.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{activity.title}</CardTitle>
                        <Badge variant="outline">{activity.group}</Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center">
                          <PanelRight className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{activity.participants}/{activity.maxParticipants} 人报名</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button 
                        size="sm" 
                        onClick={() => handleJoinActivity(activity.title)}
                      >
                        立即报名
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="radar" className="mt-6">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">附近社群雷达</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-4 w-4" />
                      筛选
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <BarChart3 className="h-4 w-4" />
                      更多
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">发现您附近的活跃社群，认识身边志同道合的朋友</p>
                
                <div className="relative h-60 mb-6 border rounded-lg overflow-hidden">
                  <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-100/80'}`}>
                    {/* Radar effect circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-blue-500/30 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-blue-500/50 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border border-blue-500/70 animate-pulse"></div>
                    
                    {/* User position */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full z-10 animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full z-20"></div>
                    
                    {/* Nearby groups */}
                    <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <img src={RADAR_GROUPS[0].image} alt={RADAR_GROUPS[0].name} />
                      </Avatar>
                    </div>
                    <div className="absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <img src={RADAR_GROUPS[1].image} alt={RADAR_GROUPS[1].name} />
                      </Avatar>
                    </div>
                    <div className="absolute top-[70%] left-[40%] -translate-x-1/2 -translate-y-1/2">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <img src={RADAR_GROUPS[2].image} alt={RADAR_GROUPS[2].name} />
                      </Avatar>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {RADAR_GROUPS.map((group) => (
                    <Card key={group.id} className={`flex items-center p-4 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}>
                      <Avatar className="h-12 w-12 mr-4">
                        <img src={group.image} alt={group.name} />
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{group.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          <span className="mr-2">{group.members}</span>
                          <span>距离: {group.distance}</span>
                        </div>
                        <div className="text-xs mt-1">
                          {group.active ? 
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">活跃中</Badge> : 
                            <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500">休息中</Badge>
                          }
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="ml-2">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GroupsPage;
