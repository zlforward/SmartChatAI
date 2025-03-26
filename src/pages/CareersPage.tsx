import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Briefcase, Users, Heart, Globe, 
  Lightbulb, Target, Shield, Clock,
  ArrowRight, MapPin, GraduationCap, BriefcaseIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  requirements: string[];
  responsibilities: string[];
}

interface CompanyCulture {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CareersPage: React.FC = () => {
  const { theme } = useTheme();
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const companyCultures: CompanyCulture[] = [
    {
      icon: <Users className="h-8 w-8 text-zhiliao-600" />,
      title: '团队协作',
      description: '我们相信团队的力量，鼓励开放沟通和知识分享。'
    },
    {
      icon: <Heart className="h-8 w-8 text-zhiliao-600" />,
      title: '以人为本',
      description: '关注员工成长，提供广阔的发展空间和机会。'
    },
    {
      icon: <Globe className="h-8 w-8 text-zhiliao-600" />,
      title: '全球视野',
      description: '连接世界各地的优秀人才，打造国际化团队。'
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-zhiliao-600" />,
      title: '创新驱动',
      description: '鼓励创新思维，支持尝试新技术和新方法。'
    }
  ];

  const jobPositions: JobPosition[] = [
    {
      id: 'frontend',
      title: '高级前端工程师',
      department: '技术部',
      location: '北京',
      type: '全职',
      requirements: [
        '5年以上前端开发经验',
        '精通 React、TypeScript、Next.js',
        '熟悉前端工程化和性能优化',
        '良好的团队协作能力'
      ],
      responsibilities: [
        '负责产品前端架构设计和开发',
        '优化前端性能和用户体验',
        '参与技术方案设计和评审',
        '指导初级工程师成长'
      ]
    },
    {
      id: 'backend',
      title: '后端开发工程师',
      department: '技术部',
      location: '北京',
      type: '全职',
      requirements: [
        '3年以上后端开发经验',
        '精通 Node.js、Python、Go 等语言',
        '熟悉微服务架构和云原生技术',
        '良好的问题解决能力'
      ],
      responsibilities: [
        '设计和开发后端服务',
        '优化系统性能和可扩展性',
        '编写技术文档和单元测试',
        '参与系统架构设计'
      ]
    },
    {
      id: 'product',
      title: '产品经理',
      department: '产品部',
      location: '北京',
      type: '全职',
      requirements: [
        '3年以上产品经理经验',
        '熟悉产品设计和用户研究方法',
        '良好的数据分析能力',
        '出色的沟通协调能力'
      ],
      responsibilities: [
        '负责产品规划和功能设计',
        '进行用户研究和需求分析',
        '制定产品路线图和迭代计划',
        '协调各方资源推进产品落地'
      ]
    },
    {
      id: 'design',
      title: 'UI/UX 设计师',
      department: '设计部',
      location: '北京',
      type: '全职',
      requirements: [
        '3年以上设计经验',
        '精通 Figma、Sketch 等设计工具',
        '熟悉设计系统和交互设计',
        '良好的审美和创意能力'
      ],
      responsibilities: [
        '负责产品界面和交互设计',
        '建立和维护设计系统',
        '进行用户研究和可用性测试',
        '参与产品设计评审'
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* 页面标题 */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">加入我们</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            与优秀的人一起，创造非凡的产品。
            我们期待有才华、有激情的你加入知了团队。
          </p>
        </section>

        {/* 公司文化 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">公司文化</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyCultures.map((culture, index) => (
              <Card key={index} className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {culture.icon}
                  </div>
                  <CardTitle className="text-center">{culture.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    {culture.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 工作环境 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">工作环境</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-6 w-6 text-zhiliao-600 mr-2" />
                  学习成长
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 定期技术分享和培训</li>
                  <li>• 导师制度和职业规划</li>
                  <li>• 学习资源库和知识库</li>
                  <li>• 参加行业会议和活动</li>
                </ul>
              </CardContent>
            </Card>
            <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BriefcaseIcon className="h-6 w-6 text-zhiliao-600 mr-2" />
                  工作福利
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 具有竞争力的薪资</li>
                  <li>• 五险一金和补充医疗</li>
                  <li>• 年终奖金和期权激励</li>
                  <li>• 带薪年假和法定假期</li>
                </ul>
              </CardContent>
            </Card>
            <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-6 w-6 text-zhiliao-600 mr-2" />
                  生活关怀
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 免费工作餐和下午茶</li>
                  <li>• 健身房和运动场地</li>
                  <li>• 团建活动和节日福利</li>
                  <li>• 弹性工作制</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 职位列表 */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">开放职位</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobPositions.map((position) => (
              <Card 
                key={position.id}
                className={`cursor-pointer transition-colors ${
                  selectedPosition === position.id
                    ? 'bg-zhiliao-50 dark:bg-slate-800 border-zhiliao-600'
                    : theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 hover:border-zhiliao-600'
                    : 'hover:border-zhiliao-600'
                }`}
                onClick={() => setSelectedPosition(
                  selectedPosition === position.id ? null : position.id
                )}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {position.department}
                        <MapPin className="h-4 w-4 mx-2" />
                        {position.location}
                        <Badge variant="outline" className="ml-2">
                          {position.type}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 transition-transform ${
                      selectedPosition === position.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </CardHeader>
                {selectedPosition === position.id && (
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">岗位要求</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          {position.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">工作职责</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          {position.responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full bg-zhiliao-600 hover:bg-zhiliao-700">
                        申请职位
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CareersPage; 