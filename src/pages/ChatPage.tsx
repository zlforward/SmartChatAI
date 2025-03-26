
import React, { useState } from 'react';
import { Send, Paperclip, Mic, Image } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { useTheme } from '../providers/ThemeProvider';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是知了，你的AI助手。有什么可以帮到你的吗？',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '我理解你的需求，让我来帮助你解决这个问题。',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'} shadow-lg rounded-2xl overflow-hidden`}>
            {/* Chat Header */}
            <div className={`p-4 ${theme === 'dark' ? 'bg-slate-700' : 'bg-zhiliao-50'} flex items-center gap-4`}>
              <Avatar className="h-10 w-10">
                <img src="/lovable-uploads/56fd07c0-da09-4377-9a6d-4041e1dedf45.png" alt="知了数字人" />
              </Avatar>
              <div>
                <h2 className="font-bold">知了 AI 助手</h2>
                <p className="text-sm text-muted-foreground">在线中</p>
              </div>
            </div>
            
            {/* Chat Messages */}
            <CardContent className={`h-[600px] overflow-y-auto p-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? theme === 'dark' 
                            ? 'bg-zhiliao-600 text-white' 
                            : 'bg-zhiliao-500 text-white'
                          : theme === 'dark'
                            ? 'bg-slate-700 text-white'
                            : 'bg-gray-100 text-slate-900'
                      }`}
                    >
                      <p>{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 inline-block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            
            {/* Chat Input */}
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-gray-100'}`}>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Image className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Mic className="h-5 w-5" />
                </Button>
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="输入消息..."
                  className={`flex-grow ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
