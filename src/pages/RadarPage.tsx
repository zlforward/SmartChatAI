import React, { useState, useEffect } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  MapPin, Users, Filter, 
  MessageSquare, Star, 
  Shield, Globe, 
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NearbyUser {
  id: string;
  name: string;
  avatar: string;
  distance: number;
  interests: string[];
  online: boolean;
  lastActive: string;
  bio: string;
  tags: string[];
}

const RadarPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchRadius, setSearchRadius] = useState(5);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([
    {
      id: '1',
      name: '张明',
      avatar: '/avatars/user1.jpg',
      distance: 0.5,
      interests: ['技术', '音乐', '旅行'],
      online: true,
      lastActive: '刚刚',
      bio: '热爱技术，喜欢分享',
      tags: ['前端开发', 'React', 'TypeScript']
    },
    {
      id: '2',
      name: '李华',
      avatar: '/avatars/user2.jpg',
      distance: 1.2,
      interests: ['设计', '摄影', '美食'],
      online: false,
      lastActive: '10分钟前',
      bio: 'UI设计师，热爱生活',
      tags: ['UI设计', '摄影', '美食']
    },
    {
      id: '3',
      name: '王芳',
      avatar: '/avatars/user3.jpg',
      distance: 2.5,
      interests: ['运动', '健康', '阅读'],
      online: true,
      lastActive: '刚刚',
      bio: '健身爱好者，追求健康生活',
      tags: ['健身', '瑜伽', '健康饮食']
    }
  ]);

  const handleConnect = (userId: string) => {
    console.log('连接用户:', userId);
  };

  const handleMessage = (userId: string) => {
    console.log('发送消息:', userId);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">附近的人</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 搜索设置 */}
          <Card className={`mb-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>搜索半径</Label>
                  <span className="text-sm text-muted-foreground">{searchRadius}公里</span>
                </div>
                <Slider
                  value={[searchRadius]}
                  onValueChange={(value) => setSearchRadius(value[0])}
                  max={50}
                  step={1}
                />
                <div className="flex items-center justify-between">
                  <Label>仅显示在线用户</Label>
                  <Switch
                    checked={showOnlineOnly}
                    onCheckedChange={setShowOnlineOnly}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>排序方式</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="选择排序方式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">距离最近</SelectItem>
                      <SelectItem value="online">在线优先</SelectItem>
                      <SelectItem value="active">活跃度最高</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 用户列表 */}
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-4">
              {nearbyUsers.map(user => (
                <Card key={user.id} className={theme === 'dark' ? 'bg-slate-800' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{user.name}</h3>
                            {user.online && (
                              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                在线
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {user.distance}公里
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {user.bio}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {user.tags.map(tag => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleConnect(user.id)}
                          >
                            <Star className="h-4 w-4 mr-2" />
                            关注
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMessage(user.id)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            私信
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RadarPage; 