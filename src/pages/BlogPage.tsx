import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  BookOpen, Calendar, Clock, Tag,
  ChevronRight, Search, Filter,
  ThumbsUp, MessageSquare, Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const BlogPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    '全部',
    '技术博客',
    '产品设计',
    '用户体验',
    '行业洞察',
    '团队文化'
  ];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '大语言模型在智能助手中的应用实践',
      summary: '深入探讨大语言模型在智能助手开发中的关键技术点和实践经验，包括模型选择、性能优化、安全防护等方面。',
      content: '...',
      date: '2024-03-15',
      readTime: '15分钟',
      category: '技术博客',
      tags: ['AI', '大语言模型', '技术实践'],
      image: '/images/blog/llm-practice.jpg',
      author: {
        name: '李华',
        avatar: '/avatars/author1.jpg',
        role: '技术总监'
      },
      stats: {
        likes: 128,
        comments: 32,
        shares: 16
      }
    },
    {
      id: '2',
      title: '如何设计一个用户友好的AI助手界面',
      summary: '从用户体验的角度出发，分享AI助手界面设计的关键原则和最佳实践，帮助设计师打造更好的产品。',
      content: '...',
      date: '2024-03-10',
      readTime: '12分钟',
      category: '产品设计',
      tags: ['UI设计', '用户体验', '产品设计'],
      image: '/images/blog/ui-design.jpg',
      author: {
        name: '王芳',
        avatar: '/avatars/author2.jpg',
        role: '产品设计师'
      },
      stats: {
        likes: 96,
        comments: 24,
        shares: 12
      }
    },
    {
      id: '3',
      title: 'AI助手在教育领域的应用与挑战',
      summary: '分析AI助手在教育领域的应用场景、优势与挑战，探讨未来发展趋势和机遇。',
      content: '...',
      date: '2024-03-05',
      readTime: '10分钟',
      category: '行业洞察',
      tags: ['教育', 'AI应用', '行业趋势'],
      image: '/images/blog/education.jpg',
      author: {
        name: '张明',
        avatar: '/avatars/author3.jpg',
        role: '产品经理'
      },
      stats: {
        likes: 84,
        comments: 18,
        shares: 8
      }
    },
    {
      id: '4',
      title: '构建高效的技术团队文化',
      summary: '分享知聊技术团队在文化建设方面的经验，包括知识分享、代码审查、团队协作等实践。',
      content: '...',
      date: '2024-02-28',
      readTime: '14分钟',
      category: '团队文化',
      tags: ['团队管理', '技术文化', '团队建设'],
      image: '/images/blog/team-culture.jpg',
      author: {
        name: '刘强',
        avatar: '/avatars/author4.jpg',
        role: '技术主管'
      },
      stats: {
        likes: 72,
        comments: 16,
        shares: 6
      }
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === '全部' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* 页面标题 */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">技术博客</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            分享技术见解，探讨产品设计，洞察行业趋势。
          </p>
        </section>

        {/* 搜索和筛选 */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索博客..."
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

        {/* 博客列表 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-slate-900">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                  <Clock className="h-4 w-4 mx-4" />
                  {post.readTime}
                </div>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{post.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {post.stats.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.stats.comments}
                    </div>
                    <div className="flex items-center">
                      <Share2 className="h-4 w-4 mr-1" />
                      {post.stats.shares}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">
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

export default BlogPage; 