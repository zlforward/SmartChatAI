import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Calendar, Clock, Tag, Share2,
  Facebook, Twitter, Linkedin, Link
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface NewsDetail {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  category: string;
  tags: string[];
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  relatedNews: {
    id: string;
    title: string;
    image: string;
    date: string;
  }[];
}

const NewsDetailPage: React.FC = () => {
  const { theme } = useTheme();

  // 模拟新闻数据
  const newsDetail: NewsDetail = {
    id: '1',
    title: '知了智能助手2.0版本正式发布：全新升级，带来更智能的对话体验',
    content: `
      知了科技今日正式发布智能助手2.0版本，这是继去年1.0版本发布后的重大升级。新版本在原有功能基础上进行了全面优化和扩展，为用户带来更智能、更便捷的对话体验。

      ## 核心升级

      ### 1. 多语言支持
      新版本支持中英文双语对话，并计划在未来支持更多语言。用户可以在不同语言之间自由切换，满足国际化需求。

      ### 2. 语音交互
      新增语音识别和语音合成功能，用户可以通过语音与智能助手进行对话，让交互更加自然和便捷。

      ### 3. 图像识别
      集成先进的计算机视觉技术，支持图片识别和分析功能。用户可以上传图片，智能助手能够理解图片内容并作出相应回应。

      ### 4. 上下文理解
      优化了对话上下文的理解能力，智能助手能够更好地把握对话脉络，提供更连贯、更准确的回答。

      ### 5. 个性化推荐
      基于用户的使用习惯和偏好，提供个性化的内容推荐和服务建议，让每个用户都能获得最适合自己的体验。

      ## 技术突破

      在技术层面，2.0版本采用了最新的大语言模型，显著提升了对话质量和响应速度。同时，我们优化了模型部署架构，降低了服务器负载，提高了系统稳定性。

      ## 用户反馈

      在内部测试阶段，2.0版本获得了用户的广泛好评。测试用户表示，新版本的对话体验更加自然流畅，功能更加丰富实用。

      ## 未来展望

      知了科技将继续投入大量资源进行产品研发和技术创新，为用户带来更多惊喜。我们计划在未来几个月内推出更多新功能，包括：

      - 多模态交互支持
      - 知识图谱集成
      - 情感分析能力
      - 任务规划功能
      - 协作模式支持

      敬请期待！
    `,
    date: '2024-03-15',
    time: '14:30',
    category: '产品更新',
    tags: ['产品更新', 'AI', '用户体验', '技术创新'],
    image: '/images/news/assistant-2.0.jpg',
    author: {
      name: '张明',
      avatar: '/avatars/author.jpg',
      role: '产品总监'
    },
    relatedNews: [
      {
        id: '2',
        title: '知了完成新一轮融资，加速产品研发',
        image: '/images/news/funding.jpg',
        date: '2024-03-10'
      },
      {
        id: '3',
        title: '知了技术团队分享：大语言模型应用实践',
        image: '/images/news/tech-share.jpg',
        date: '2024-03-05'
      },
      {
        id: '4',
        title: 'AI助手在教育领域的应用前景',
        image: '/images/news/education.jpg',
        date: '2024-02-28'
      }
    ]
  };

  const handleShare = (platform: string) => {
    // 实现分享功能
    console.log(`分享到 ${platform}`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* 新闻头部 */}
        <section className="mb-12">
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
            <img
              src={newsDetail.image}
              alt={newsDetail.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <Badge variant="secondary" className="mb-4 bg-white/90 text-slate-900">
                {newsDetail.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4 text-white">
                {newsDetail.title}
              </h1>
              <div className="flex items-center text-white/80 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {newsDetail.date}
                <Clock className="h-4 w-4 mx-4" />
                {newsDetail.time}
              </div>
            </div>
          </div>

          {/* 作者信息 */}
          <div className="flex items-center mb-8">
            <img
              src={newsDetail.author.avatar}
              alt={newsDetail.author.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold">{newsDetail.author.name}</h3>
              <p className="text-sm text-muted-foreground">{newsDetail.author.role}</p>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {newsDetail.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* 分享按钮 */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              分享
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleShare('facebook')}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('twitter')}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('linkedin')}>
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('link')}>
                <Link className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="mb-8" />
        </section>

        {/* 新闻内容 */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {newsDetail.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </section>

        <Separator className="mb-12" />

        {/* 相关新闻 */}
        <section>
          <h2 className="text-2xl font-bold mb-6">相关新闻</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsDetail.relatedNews.map((news) => (
              <div key={news.id} className="group cursor-pointer">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-zhiliao-600">
                  {news.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {news.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default NewsDetailPage; 