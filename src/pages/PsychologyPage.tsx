
import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Brain, User, ScanFace, Sparkles, BarChart4, Award, 
  ArrowRight, Clock, HelpCircle, CheckCircle2, Share2,
  Download // Added the missing Download icon import
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TestType {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  icon: React.ReactNode;
  time: string;
  questions: number;
  color: string;
  popular?: boolean;
}

const testTypes: TestType[] = [
  {
    id: 'mbti',
    name: '性格类型测试 (MBTI)',
    shortName: 'MBTI',
    description: '基于荣格类型学说的人格类型测试，帮助你了解自己的性格特质',
    icon: <User />,
    time: '15-20分钟',
    questions: 93,
    color: 'from-blue-500 to-indigo-500',
    popular: true,
  },
  {
    id: 'gallup',
    name: '盖洛普优势测试',
    shortName: '盖洛普',
    description: '发现你的天赋优势，了解自己的核心竞争力',
    icon: <Award />,
    time: '30-40分钟',
    questions: 177,
    color: 'from-amber-500 to-red-500',
  },
  {
    id: 'numerology',
    name: '数字命理分析',
    shortName: '数字命理',
    description: '基于出生信息的数字命理解读，探索生命轨迹',
    icon: <Sparkles />,
    time: '5-10分钟',
    questions: 8,
    color: 'from-purple-500 to-fuchsia-500',
  },
];

interface TestResult {
  id: string;
  type: string;
  testType: string;
  date: string;
  description: string;
  imgUrl: string;
  detail?: string;
}

const testResults: TestResult[] = [
  {
    id: '1',
    type: 'INTJ',
    testType: 'mbti',
    date: '2023-10-15',
    description: '策划者 - 具有独创性的思想家，有强烈的内在动力去实现自己的想法和目标',
    imgUrl: '/lovable-uploads/05dcf38e3-7a50-4c68-a8a3-6a8f9f0803e2.png',
    detail: 'INTJ型人格是16种性格类型中最独立和最有主见的类型之一。他们重视智力自主和创造性追求，以独特的视角看待世界。INTJ通常具有战略思维能力，善于制定长期计划并有条不紊地实施。他们重视逻辑和理性分析，常常以系统化的方式解决问题。'
  },
  {
    id: '2',
    type: '执行者',
    testType: 'gallup',
    date: '2023-11-20',
    description: '你擅长将想法转化为行动，有强烈的完成任务的欲望',
    imgUrl: '/lovable-uploads/3794400f-6049-41e6-a921-d110edd3b6c1.png',
    detail: '作为一个执行者，你有将想法转化为行动的能力。当面对一个想法或概念时，你的本能是问："我们应该怎么做？"这种行动导向的思维让你成为团队中的重要资产。你不仅仅停留在计划阶段，而是推动事情向前发展。你热衷于将工作完成，并通过行动获得满足感。'
  },
];

const PsychologyPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('tests');
  const [activeTestType, setActiveTestType] = useState<TestType | null>(null);
  const [activeResult, setActiveResult] = useState<TestResult | null>(null);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">心理测评中心</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              探索自我，发现内在潜能，通过科学的心理测评了解真实的你
            </p>
          </div>

          <Tabs defaultValue="tests" onValueChange={setActiveTab}>
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="tests">
                <Brain className="h-4 w-4 mr-2" />
                心理测试
              </TabsTrigger>
              <TabsTrigger value="results">
                <BarChart4 className="h-4 w-4 mr-2" />
                我的报告
              </TabsTrigger>
              <TabsTrigger value="insights">
                <ScanFace className="h-4 w-4 mr-2" />
                个人洞察
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tests">
              {!activeTestType ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testTypes.map((test) => (
                    <Card 
                      key={test.id} 
                      className={`overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer relative ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'hover:bg-slate-50'}`}
                      onClick={() => setActiveTestType(test)}
                    >
                      {test.popular && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-zhiliao-500 text-white text-xs font-bold px-3 py-1 rounded-bl-md">
                            热门
                          </div>
                        </div>
                      )}
                      <div className={`h-2 bg-gradient-to-r ${test.color}`}></div>
                      <CardHeader>
                        <div className="mb-2">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${test.color} flex items-center justify-center text-white`}>
                            {test.icon}
                          </div>
                        </div>
                        <CardTitle>{test.name}</CardTitle>
                        <CardDescription>{test.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{test.time}</span>
                          </div>
                          <div className="text-muted-foreground">{test.questions}个问题</div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-black/5 dark:bg-white/5 justify-end">
                        <Button variant="ghost" size="sm">
                          开始测试
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <Button 
                    variant="ghost" 
                    className="mb-4" 
                    onClick={() => setActiveTestType(null)}
                  >
                    ← 返回测试列表
                  </Button>
                  
                  <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                    <div className={`h-2 bg-gradient-to-r ${activeTestType.color}`}></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl">{activeTestType.name}</CardTitle>
                          <CardDescription className="mt-2">{activeTestType.description}</CardDescription>
                        </div>
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${activeTestType.color} flex items-center justify-center text-white`}>
                          {activeTestType.icon}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                          <div className="text-sm text-muted-foreground mb-1">测试时长</div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-zhiliao-500" />
                            <span className="font-medium">{activeTestType.time}</span>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                          <div className="text-sm text-muted-foreground mb-1">问题数量</div>
                          <div className="flex items-center">
                            <HelpCircle className="h-5 w-5 mr-2 text-zhiliao-500" />
                            <span className="font-medium">{activeTestType.questions}个问题</span>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                          <div className="text-sm text-muted-foreground mb-1">完成人数</div>
                          <div className="flex items-center">
                            <User className="h-5 w-5 mr-2 text-zhiliao-500" />
                            <span className="font-medium">12,467人</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">关于{activeTestType.shortName || activeTestType.name}</h3>
                        <div className="space-y-2 text-muted-foreground">
                          {activeTestType.id === 'mbti' && (
                            <>
                              <p>
                                MBTI (迈尔斯-布里格斯类型指标) 是一种基于荣格类型学的心理类型学测验，由卡特琳·布里格斯和伊莎贝尔·迈尔斯母女开发。
                              </p>
                              <p>
                                这一测试将人格分为16种不同类型，基于四个维度的偏好：
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>精力来源：外向(E) vs 内向(I)</li>
                                <li>信息收集：感觉(S) vs 直觉(N)</li>
                                <li>决策方式：思考(T) vs 情感(F)</li>
                                <li>生活方式：判断(J) vs 感知(P)</li>
                              </ul>
                              <p>
                                了解您的MBTI类型可以帮助您认识自己的优势和劣势，改善人际关系，以及在职业选择上做出更适合自己的决定。
                              </p>
                            </>
                          )}
                          
                          {activeTestType.id === 'gallup' && (
                            <>
                              <p>
                                盖洛普优势测试（CliftonStrengths）是由唐·克利夫顿博士开发的一种评估工具，旨在帮助人们发现自己的天赋优势。
                              </p>
                              <p>
                                该测试从34种天赋主题中识别出您排名前5的优势，这些优势分为四大领域：
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>执行力：帮助您完成任务的优势</li>
                                <li>影响力：帮助您影响他人的优势</li>
                                <li>关系建立：帮助您建立关系的优势</li>
                                <li>战略思考：帮助您分析和规划的优势</li>
                              </ul>
                              <p>
                                了解并发挥自己的优势，可以帮助您在工作和生活中取得更好的成就和满足感。
                              </p>
                            </>
                          )}
                          
                          {activeTestType.id === 'numerology' && (
                            <>
                              <p>
                                数字命理学是一种古老的学说，认为数字具有特定的能量振动，可以揭示人的个性、命运和生活周期。
                              </p>
                              <p>
                                在数字命理分析中，主要通过以下数字来解读您的生命特质：
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>生命数字：基于出生日期计算，反映核心特质</li>
                                <li>命运数字：基于全名计算，反映人生目标</li>
                                <li>灵魂数字：基于元音字母计算，反映内在欲望</li>
                                <li>个性数字：基于辅音字母计算，反映外在表现</li>
                              </ul>
                              <p>
                                通过数字命理分析，您可以更好地理解自己的性格特点、人生使命和潜在挑战。
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button 
                        className={`w-full sm:w-auto bg-gradient-to-r ${activeTestType.color} hover:opacity-90`}
                        onClick={() => setActiveTab('tests')}
                      >
                        开始测试
                      </Button>
                      {activeTestType.id === 'mbti' && (
                        <Button variant="outline" className="w-full sm:w-auto">
                          查看示例报告
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="results">
              {!activeResult ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testResults.map((result) => (
                    <Card 
                      key={result.id} 
                      className={`overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'hover:bg-slate-50'}`}
                      onClick={() => setActiveResult(result)}
                    >
                      <div className="flex h-full">
                        <div className="w-1/3">
                          <img 
                            src={result.imgUrl} 
                            alt={result.type} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4 flex flex-col">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline">
                                {testTypes.find(t => t.id === result.testType)?.shortName || 
                                 testTypes.find(t => t.id === result.testType)?.name}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{result.date}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{result.type}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                              {result.description}
                            </p>
                          </div>
                          <div className="mt-auto">
                            <Button variant="ghost" size="sm">
                              查看详情
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  <div className="flex items-center justify-center col-span-1 md:col-span-2 py-8">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">想要探索更多？尝试我们的心理测评</p>
                      <Button onClick={() => setActiveTab('tests')}>查看全部测评</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <Button 
                    variant="ghost" 
                    className="mb-4" 
                    onClick={() => setActiveResult(null)}
                  >
                    ← 返回报告列表
                  </Button>
                  
                  <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">
                              {testTypes.find(t => t.id === activeResult.testType)?.shortName || 
                               testTypes.find(t => t.id === activeResult.testType)?.name}
                            </Badge>
                            <Badge variant="secondary">{activeResult.date}</Badge>
                          </div>
                          <CardTitle className="text-3xl">{activeResult.type}</CardTitle>
                          <CardDescription className="text-lg mt-2">
                            {activeResult.description}
                          </CardDescription>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-full overflow-hidden">
                            <img 
                              src={activeResult.imgUrl} 
                              alt={activeResult.type} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">您的特质概览</h3>
                          <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                            <div className="space-y-4">
                              {activeResult.testType === 'mbti' && (
                                <>
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium">内向 (I)</span>
                                      <span className="text-sm">外向 (E)</span>
                                    </div>
                                    <Progress value={82} className="h-2" />
                                    <div className="flex justify-end mt-1">
                                      <span className="text-xs text-muted-foreground">82%</span>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium">直觉 (N)</span>
                                      <span className="text-sm">感觉 (S)</span>
                                    </div>
                                    <Progress value={75} className="h-2" />
                                    <div className="flex justify-end mt-1">
                                      <span className="text-xs text-muted-foreground">75%</span>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium">思考 (T)</span>
                                      <span className="text-sm">情感 (F)</span>
                                    </div>
                                    <Progress value={89} className="h-2" />
                                    <div className="flex justify-end mt-1">
                                      <span className="text-xs text-muted-foreground">89%</span>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium">判断 (J)</span>
                                      <span className="text-sm">感知 (P)</span>
                                    </div>
                                    <Progress value={67} className="h-2" />
                                    <div className="flex justify-end mt-1">
                                      <span className="text-xs text-muted-foreground">67%</span>
                                    </div>
                                  </div>
                                </>
                              )}
                              
                              {activeResult.testType === 'gallup' && (
                                <>
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">您的前五大优势</h4>
                                    <ol className="space-y-3">
                                      <li className="flex items-center gap-2">
                                        <Badge>1</Badge>
                                        <span>执行者 (Activator)</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <Badge>2</Badge>
                                        <span>战略思考 (Strategic)</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <Badge>3</Badge>
                                        <span>成就 (Achiever)</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <Badge>4</Badge>
                                        <span>学习 (Learner)</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <Badge>5</Badge>
                                        <span>分析 (Analytical)</span>
                                      </li>
                                    </ol>
                                  </div>
                                  
                                  <div className="pt-2">
                                    <h4 className="text-sm font-medium mb-2">按领域分布</h4>
                                    <div className="space-y-2">
                                      <div>
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-xs">执行力</span>
                                          <span className="text-xs text-muted-foreground">2/5</span>
                                        </div>
                                        <Progress value={40} className="h-2" />
                                      </div>
                                      <div>
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-xs">影响力</span>
                                          <span className="text-xs text-muted-foreground">0/5</span>
                                        </div>
                                        <Progress value={0} className="h-2" />
                                      </div>
                                      <div>
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-xs">关系建立</span>
                                          <span className="text-xs text-muted-foreground">0/5</span>
                                        </div>
                                        <Progress value={0} className="h-2" />
                                      </div>
                                      <div>
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-xs">战略思考</span>
                                          <span className="text-xs text-muted-foreground">3/5</span>
                                        </div>
                                        <Progress value={60} className="h-2" />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">详细解读</h3>
                          <ScrollArea className="h-80 pr-4">
                            <div className="space-y-4">
                              <p>{activeResult.detail}</p>
                              
                              {activeResult.testType === 'mbti' && (
                                <>
                                  <h4 className="font-medium">INTJ的核心特质</h4>
                                  <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                      <strong>独立思考</strong>：INTJ具有强烈的独立思考能力，重视逻辑和理性分析。
                                    </li>
                                    <li>
                                      <strong>战略规划</strong>：擅长制定长期计划和战略，关注远景并能有条不紊地实施。
                                    </li>
                                    <li>
                                      <strong>创新思维</strong>：对创新和改进有天然的追求，常常寻求更好的解决方案。
                                    </li>
                                    <li>
                                      <strong>高标准</strong>：对自己和他人都有高标准，追求卓越和完美。
                                    </li>
                                    <li>
                                      <strong>内敛自省</strong>：倾向于内向，需要独处时间来充电和思考。
                                    </li>
                                  </ul>
                                  
                                  <h4 className="font-medium">职业建议</h4>
                                  <p>
                                    INTJ型人格在需要战略思维、独立工作和解决复杂问题的职业中表现出色。以下是一些适合INTJ的职业方向：
                                  </p>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>科学研究（物理学家、研究员）</li>
                                    <li>工程和技术（软件工程师、系统架构师）</li>
                                    <li>战略规划（管理顾问、战略分析师）</li>
                                    <li>金融投资（投资分析师、基金经理）</li>
                                    <li>医学专业（外科医生、医学研究员）</li>
                                  </ul>
                                  
                                  <h4 className="font-medium">人际关系</h4>
                                  <p>
                                    在人际关系方面，INTJ可能面临一些挑战，但也有其独特的优势：
                                  </p>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>与志同道合的人建立深厚的关系</li>
                                    <li>重视诚实和直接的沟通</li>
                                    <li>可能需要努力表达情感和共情</li>
                                    <li>珍视智力上的连接和深度交流</li>
                                    <li>可能会避免表面的社交活动</li>
                                  </ul>
                                </>
                              )}
                              
                              {activeResult.testType === 'gallup' && (
                                <>
                                  <h4 className="font-medium">执行者的详细分析</h4>
                                  <p>
                                    作为一个拥有"执行者"优势的人，你能够迅速将想法转化为行动。这是一种催化剂般的存在，当面对计划或概念时，你总是问："我们什么时候开始？"你渴望立即行动，相信只有通过实际行动才能产生真正的进展。
                                  </p>
                                  <p>
                                    这种特质使你成为团队中宝贵的资产，特别是在需要将讨论转化为实际成果的情况下。你有能力打破惯性，推动事情向前发展，这种能力在许多停滞不前的环境中尤为宝贵。
                                  </p>
                                  
                                  <h4 className="font-medium">如何最大化发挥这一优势</h4>
                                  <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                      <strong>寻找启动新项目的机会</strong>：利用你的天然动力来开始新的项目或倡议。
                                    </li>
                                    <li>
                                      <strong>与思考型人士合作</strong>：与那些擅长深思熟虑的人合作，你可以帮助他们将想法转化为行动。
                                    </li>
                                    <li>
                                      <strong>管理你的沟通方式</strong>：意识到你的紧迫感可能会让他人感到压力，调整你的沟通方式以确保有效合作。
                                    </li>
                                    <li>
                                      <strong>设定检查点</strong>：为自己创建定期检查点，以评估行动的效果和需要调整的地方。
                                    </li>
                                  </ul>
                                  
                                  <h4 className="font-medium">可能面临的挑战</h4>
                                  <ul className="list-disc pl-5 space-y-2">
                                    <li>
                                      <strong>过于急躁</strong>：你可能会过于急于行动，有时候在充分考虑之前就开始行动。
                                    </li>
                                    <li>
                                      <strong>与深思熟虑者的冲突</strong>：你可能会与那些需要更多时间思考的人产生摩擦。
                                    </li>
                                    <li>
                                      <strong>不耐烦</strong>：长时间的讨论和计划可能会让你感到沮丧和不耐烦。
                                    </li>
                                  </ul>
                                </>
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Button 
                          variant="outline" 
                          className="w-full sm:w-auto"
                          onClick={() => setActiveTab('tests')}
                        >
                          重新测试
                        </Button>
                        <Button 
                          variant="secondary" 
                          className="w-full sm:w-auto"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          分享结果
                        </Button>
                      </div>
                      <Button 
                        className="w-full sm:w-auto bg-gradient-to-r from-zhiliao-500 to-zhiliao-600"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        下载完整报告
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="insights">
              <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                <CardHeader>
                  <CardTitle>个人洞察</CardTitle>
                  <CardDescription>
                    基于您的测试结果和行为模式，为您提供个性化的洞察和建议
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {testResults.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <ScanFace className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">暂无个人洞察</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        完成至少一项心理测评后，我们将为您生成个性化的洞察和建议
                      </p>
                      <Button onClick={() => setActiveTab('tests')}>
                        前往测评中心
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                        <div className="flex items-start gap-4">
                          <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="text-lg font-medium mb-2">您的核心优势</h3>
                            <p className="text-muted-foreground mb-4">
                              根据您的INTJ性格类型和执行者优势，您的核心优势在于：
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-white'}`}>
                                <h4 className="font-medium mb-2">战略思维能力</h4>
                                <p className="text-sm text-muted-foreground">
                                  您擅长制定长期计划和战略，能够预见未来可能的发展方向并做好准备。
                                </p>
                              </div>
                              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-white'}`}>
                                <h4 className="font-medium mb-2">执行力</h4>
                                <p className="text-sm text-muted-foreground">
                                  您有将想法转化为行动的天赋，能够迅速开始项目并保持动力直至完成。
                                </p>
                              </div>
                              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-white'}`}>
                                <h4 className="font-medium mb-2">独立思考</h4>
                                <p className="text-sm text-muted-foreground">
                                  您有独立思考的能力，不易受他人影响，能够形成自己的见解和判断。
                                </p>
                              </div>
                              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-white'}`}>
                                <h4 className="font-medium mb-2">分析能力</h4>
                                <p className="text-sm text-muted-foreground">
                                  您擅长分析复杂问题，将其分解为可管理的部分，并找出最佳解决方案。
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                        <div className="flex items-start gap-4">
                          <Brain className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="text-lg font-medium mb-2">发展建议</h3>
                            <p className="text-muted-foreground mb-4">
                              基于您的测试结果，以下是一些帮助您个人成长的建议：
                            </p>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-3">
                                <span className="bg-purple-500/10 text-purple-500 p-1 rounded-full mt-0.5">
                                  <ArrowRight className="h-4 w-4" />
                                </span>
                                <div>
                                  <strong>培养情感智能</strong>
                                  <p className="text-sm text-muted-foreground">
                                    作为INTJ，您可能更注重逻辑而忽略情感因素。尝试多倾听他人的感受，培养共情能力。
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="bg-purple-500/10 text-purple-500 p-1 rounded-full mt-0.5">
                                  <ArrowRight className="h-4 w-4" />
                                </span>
                                <div>
                                  <strong>平衡行动与思考</strong>
                                  <p className="text-sm text-muted-foreground">
                                    您的执行者特质可能导致过快行动。有时候，多花一些时间思考和计划可以带来更好的结果。
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="bg-purple-500/10 text-purple-500 p-1 rounded-full mt-0.5">
                                  <ArrowRight className="h-4 w-4" />
                                </span>
                                <div>
                                  <strong>寻求多元观点</strong>
                                  <p className="text-sm text-muted-foreground">
                                    主动寻求与您思维方式不同的人的观点，这可以帮助您获得更全面的视角。
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="bg-purple-500/10 text-purple-500 p-1 rounded-full mt-0.5">
                                  <ArrowRight className="h-4 w-4" />
                                </span>
                                <div>
                                  <strong>提升沟通技巧</strong>
                                  <p className="text-sm text-muted-foreground">
                                    练习用他人能够理解的方式表达您的想法，尤其是在与不同性格类型的人合作时。
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center pt-4">
                        <Button 
                          className="bg-gradient-to-r from-purple-500 to-zhiliao-500"
                          onClick={() => setActiveTab('tests')}
                        >
                          获取更多洞察
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PsychologyPage;
