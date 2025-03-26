import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import LoadingSpinner from './components/LoadingSpinner';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from './components/ErrorBoundary';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

// 创建 QueryClient 实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// 懒加载路由组件
const Index = React.lazy(() => import('./pages/Index'));
const ChatPage = React.lazy(() => import('./pages/ChatPage'));
const GroupsPage = React.lazy(() => import('./pages/GroupsPage'));
const RadarPage = React.lazy(() => import('./pages/RadarPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const MembershipPage = React.lazy(() => import('./pages/MembershipPage'));
const UserCenterPage = React.lazy(() => import('./pages/UserCenterPage'));
const PsychologyPage = React.lazy(() => import('./pages/PsychologyPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const NewsPage = React.lazy(() => import('./pages/NewsPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const HelpPage = React.lazy(() => import('./pages/HelpPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const MediaPage = React.lazy(() => import('./pages/MediaPage'));
const InteractiveGamePage = React.lazy(() => import('./pages/InteractiveGamePage'));
const DigitalHumanPage = React.lazy(() => import('./pages/DigitalHumanPage'));
const AICreationPage = React.lazy(() => import('./pages/AICreationPage'));

// 获取基础路径
const getBasename = () => {
  if (process.env.DEPLOY_ENV === 'GH_PAGES') {
    return '/SmartChatAI/';
  }
  return '/';
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <HashRouter>
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <LoadingSpinner />
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/groups" element={<GroupsPage />} />
                  <Route path="/radar" element={<RadarPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/membership" element={<MembershipPage />} />
                  <Route path="/user-center" element={<UserCenterPage />} />
                  <Route path="/psychology" element={<PsychologyPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/media" element={<MediaPage />} />
                  <Route path="/interactive-game" element={<InteractiveGamePage />} />
                  <Route path="/digital-human" element={<DigitalHumanPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/faq" element={<FaqPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/ai-creation" element={<AICreationPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </HashRouter>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
