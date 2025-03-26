import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Newspaper, Calendar, Clock, Tag,
  ChevronRight, Search, Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
}

const NewsPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    '全部',
    '公司动态',
    '产品更新',
    '技术分享',
    '行业资讯',
    '用户故事'
  ];

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: '知了智能助手2.0版本正式发布',
      summary: '全新升级，带来更智能的对话体验。',
      content: '知了智能助手2.0版本在原有功能基础上进行了全面升级，新增了多语言支持、语音交互、图像识别等功能。同时优化了对话体验，提供更智能的上下文理解和个性化推荐。',
      date: '2024-03-15',
      category: '产品更新',
      tags: ['产品更新', 'AI', '用户体验'],
      image: '/images/news/assistant-2.0.jpg'
    },
    {
      id: '2',
      title: '知了完成新一轮融资，加速产品研发',
      summary: '知名投资机构领投，助力知了在AI领域持续创新。',
      content: '知了科技今日宣布完成新一轮融资，由知名投资机构领投。本轮融资将主要用于产品研发、技术升级和市场扩张，进一步巩固知了在AI领域的领先地位。',
      date: '2024-03-10',
      category: '公司动态',
      tags: ['融资', '公司动态', '发展'],
      image: '/images/news/funding.jpg'
    },
    {
      id: '3',
      title: '知了技术团队分享：大语言模型应用实践',
      summary: '深度解析大语言模型在智能助手中的应用。',
      content: '知了技术团队分享了在大语言模型应用过程中的实践经验，包括模型选择、性能优化、安全防护等方面的技术细节，为行业提供了有价值的参考。',
      date: '2024-03-05',
      category: '技术分享',
      tags: ['技术分享', 'AI', '大语言模型'],
      image: '/images/news/tech-share.jpg'
    },
    {
      id: '4',
      title: 'AI助手在教育领域的应用前景',
      summary: '探讨AI技术如何改变传统教育模式，提升学习效率。',
      content: '随着AI技术的快速发展，智能助手在教育领域的应用越来越广泛。本文分析了AI助手在个性化学习、知识问答、作业辅导等方面的应用前景。',
      date: '2024-02-28',
      category: '行业资讯',
      tags: ['教育', 'AI', '行业趋势'],
      image: '/images/news/education.jpg'
    },
    {
      id: '5',
      title: '用户故事：AI助手帮助我提高工作效率',
      summary: '一位企业用户分享使用知了智能助手提升工作效率的经验。',
      content: '某企业高管分享了使用知了智能助手的心得，包括如何利用AI助手处理日常事务、整理会议纪要、分析数据等，显著提升了工作效率。',
      date: '2024-02-20',
      category: '用户故事',
      tags: ['用户故事', '效率提升', '企业应用'],
      image: '/images/news/user-story.jpg'
    }
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === '全部' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* 页面标题 */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">新闻资讯</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            了解知了最新动态，探索AI技术前沿，分享行业见解。
          </p>
        </section>

        {/* 搜索和筛选 */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索新闻..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* 新闻列表 */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Card key={item.id} className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-slate-900">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  {item.date}
                </div>
                <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {item.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" className="w-full">
                  阅读更多
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* 加载更多 */}
        <section className="text-center mt-12">
          <Button variant="outline" size="lg">
            加载更多
          </Button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage; 