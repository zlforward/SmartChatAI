import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, RefreshCw } from 'lucide-react';

interface ErrorPageProps {
  code?: number;
  message?: string;
  description?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = 500,
  message = '服务器错误',
  description = '抱歉，服务器出现了一些问题。请稍后再试。'
}) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-9xl font-bold text-zhiliao-500 mb-4">{code}</h1>
          <h2 className="text-3xl font-semibold mb-4">{message}</h2>
          <p className="text-muted-foreground mb-8">
            {description}
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                返回首页
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回上一页
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新页面
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage; 