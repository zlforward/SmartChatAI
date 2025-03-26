import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Calendar, Clock, Tag, ChevronRight,
  ThumbsUp, MessageSquare, Share2, Bookmark,
  Facebook, Twitter, Linkedin, Link
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import BlogComment from '../components/BlogComment';

interface BlogDetail {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  relatedPosts: {
    id: string;
    title: string;
    image: string;
    date: string;
  }[];
}

const BlogDetailPage: React.FC = () => {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 模拟博客数据
  const blogDetail: BlogDetail = {
    id: '1',
    title: '大语言模型在智能助手中的应用实践',
    content: `
# 引言

大语言模型（LLM）作为人工智能领域的重要突破，正在深刻改变着智能助手的发展方向。本文将深入探讨我们在知了智能助手开发过程中，对大语言模型的应用实践和经验总结。

## 模型选择与评估

在选择大语言模型时，我们主要考虑以下几个方面：

1. 性能表现
   - 响应速度
   - 准确性
   - 稳定性

2. 成本效益
   - API 调用成本
   - 资源消耗
   - 扩展性

3. 安全合规
   - 数据隐私
   - 内容安全
   - 合规要求

## 关键技术实现

### 1. 提示词工程

提示词工程是提升模型效果的关键。我们采用以下策略：

- 结构化提示词模板
- 上下文管理
- 动态参数注入

### 2. 性能优化

为了提供流畅的用户体验，我们实现了多项优化：

- 流式响应
- 缓存机制
- 并发控制

### 3. 安全防护

安全始终是我们的首要考虑：

- 输入验证
- 输出过滤
- 访问控制

## 实践经验

在实践过程中，我们总结了一些重要经验：

1. 持续优化
   - 收集用户反馈
   - 分析使用数据
   - 迭代改进

2. 团队协作
   - 跨团队沟通
   - 知识共享
   - 最佳实践

3. 成本控制
   - 资源监控
   - 用量分析
   - 优化策略

## 未来展望

展望未来，我们将继续探索：

- 多模态能力
- 个性化定制
- 场景化应用

# 结语

大语言模型为智能助手带来了新的机遇和挑战。通过持续实践和优化，我们相信能够为用户提供更好的服务体验。
    `,
    date: '2024-03-15',
    time: '14:30',
    readTime: '15分钟',
    category: '技术博客',
    tags: ['AI', '大语言模型', '技术实践'],
    image: '/images/blog/llm-practice.jpg',
    author: {
      name: '李华',
      avatar: '/avatars/author1.jpg',
      role: '技术总监',
      bio: '10年AI领域开发经验，专注于大语言模型应用和智能助手开发。'
    },
    stats: {
      likes: 128,
      comments: 32,
      shares: 16,
      views: 256
    },
    relatedPosts: [
      {
        id: '2',
        title: '如何设计一个用户友好的AI助手界面',
        image: '/images/blog/ui-design.jpg',
        date: '2024-03-10'
      },
      {
        id: '3',
        title: 'AI助手在教育领域的应用与挑战',
        image: '/images/blog/education.jpg',
        date: '2024-03-05'
      },
      {
        id: '4',
        title: '构建高效的技术团队文化',
        image: '/images/blog/team-culture.jpg',
        date: '2024-02-28'
      }
    ]
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: 调用点赞API
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: 调用收藏API
  };

  const handleShare = (platform: string) => {
    // TODO: 实现分享功能
    console.log(`分享到 ${platform}`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* 博客头部 */}
        <section className="relative mb-12">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img
              src={blogDetail.image}
              alt={blogDetail.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center text-white/80 text-sm mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {blogDetail.date}
                <Clock className="h-4 w-4 mx-4" />
                {blogDetail.time}
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{blogDetail.title}</h1>
              <div className="flex items-center">
                <img
                  src={blogDetail.author.avatar}
                  alt={blogDetail.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-white font-medium">{blogDetail.author.name}</p>
                  <p className="text-white/80 text-sm">{blogDetail.author.role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 标签和分享 */}
        <section className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {blogDetail.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={isLiked ? 'text-red-500' : ''}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {blogDetail.stats.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              {blogDetail.stats.comments}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={isBookmarked ? 'text-yellow-500' : ''}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <div className="relative group">
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2 hidden group-hover:block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleShare('linkedin')}
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleShare('link')}
                >
                  <Link className="h-4 w-4 mr-2" />
                  复制链接
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 作者信息 */}
        <section className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <img
              src={blogDetail.author.avatar}
              alt={blogDetail.author.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold mb-1">{blogDetail.author.name}</h3>
              <p className="text-muted-foreground mb-2">{blogDetail.author.role}</p>
              <p className="text-sm text-muted-foreground">{blogDetail.author.bio}</p>
            </div>
          </div>
        </section>

        {/* 博客内容 */}
        <section className="prose dark:prose-invert max-w-none mb-12">
          <div className="whitespace-pre-wrap">{blogDetail.content}</div>
        </section>

        <Separator className="my-8" />

        {/* 评论区域 */}
        <section className="mb-12">
          <BlogComment blogId={blogDetail.id} />
        </section>

        <Separator className="my-8" />

        {/* 相关文章 */}
        <section>
          <h2 className="text-2xl font-bold mb-6">相关文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogDetail.relatedPosts.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage; 