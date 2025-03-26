
import React, { useState } from 'react';
import { Search, ShoppingBag, Compass, Phone, Package, Film, Clock, Heart, Building, Briefcase, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '../providers/ThemeProvider';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  featured?: boolean;
}

const SERVICES: Service[] = [
  { id: '1', name: '智能订餐', description: '一句话完成附近美食订餐', icon: <ShoppingBag />, category: 'daily', featured: true },
  { id: '2', name: '交通出行', description: '快速预约出租车和查询公交路线', icon: <Compass />, category: 'travel' },
  { id: '3', name: '通讯助手', description: '智能拨打电话和管理通讯录', icon: <Phone />, category: 'daily' },
  { id: '4', name: '快递查询', description: '轻松追踪和管理包裹', icon: <Package />, category: 'daily' },
  { id: '5', name: '影院购票', description: '查询场次和购买电影票', icon: <Film />, category: 'entertainment', featured: true },
  { id: '6', name: '日程提醒', description: '智能管理日程和提醒待办事项', icon: <Clock />, category: 'work' },
  { id: '7', name: '健康顾问', description: '提供健康建议和医疗咨询', icon: <Heart />, category: 'health' },
  { id: '8', name: '酒店预订', description: '快速查找和预订酒店', icon: <Building />, category: 'travel', featured: true },
  { id: '9', name: '职业规划', description: '个性化职业发展建议', icon: <Briefcase />, category: 'work' },
];

const ServicesPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredServices = SERVICES.filter(service => service.featured);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">本地生活服务</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              通过简单的对话，即可完成各种本地生活服务，让您的生活更加便捷
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="搜索服务..." 
                className={`pl-10 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {featuredServices.length > 0 && searchQuery === '' && activeCategory === 'all' && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4">推荐服务</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredServices.map((service) => (
                  <Card key={service.id} className={`overflow-hidden hover:shadow-md transition-shadow ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-slate-700' : 'bg-zhiliao-100'}`}>
                          <span className={theme === 'dark' ? 'text-zhiliao-400' : 'text-zhiliao-600'}>{service.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full gap-1">
                        立即使用
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div>
            <Tabs defaultValue="all" onValueChange={setActiveCategory}>
              <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="daily">日常生活</TabsTrigger>
                <TabsTrigger value="travel">出行住宿</TabsTrigger>
                <TabsTrigger value="entertainment">休闲娱乐</TabsTrigger>
                <TabsTrigger value="work">工作学习</TabsTrigger>
                <TabsTrigger value="health">健康医疗</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <Card key={service.id} className={`overflow-hidden hover:shadow-md transition-shadow ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-slate-700' : 'bg-zhiliao-100'}`}>
                            <span className={theme === 'dark' ? 'text-zhiliao-400' : 'text-zhiliao-600'}>{service.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-bold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full gap-1">
                          立即使用
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
