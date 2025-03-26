import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ThumbsUp, MessageSquare, MoreVertical,
  Send, Smile, Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Comment {
  id: string;
  content: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  likes: number;
  replies: number;
  isLiked: boolean;
}

interface BlogCommentProps {
  blogId: string;
}

const BlogComment: React.FC<BlogCommentProps> = ({ blogId }) => {
  const { theme } = useTheme();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 模拟评论数据
  const comments: Comment[] = [
    {
      id: '1',
      content: '文章写得很好，对大语言模型的应用实践有很深入的见解。特别是关于提示词工程的部分，提供了很多实用的建议。',
      date: '2024-03-16 10:30',
      author: {
        name: '张明',
        avatar: '/avatars/user1.jpg',
        role: '高级工程师'
      },
      likes: 12,
      replies: 3,
      isLiked: false
    },
    {
      id: '2',
      content: '关于性能优化部分，建议可以补充一些具体的优化指标和效果数据，这样会更有说服力。',
      date: '2024-03-16 11:15',
      author: {
        name: '王芳',
        avatar: '/avatars/user2.jpg',
        role: '技术主管'
      },
      likes: 8,
      replies: 2,
      isLiked: false
    },
    {
      id: '3',
      content: '安全防护部分写得非常全面，特别是关于数据隐私和内容安全的考虑。期待后续能分享更多实践经验。',
      date: '2024-03-16 14:20',
      author: {
        name: '李强',
        avatar: '/avatars/user3.jpg',
        role: '安全专家'
      },
      likes: 15,
      replies: 4,
      isLiked: false
    }
  ];

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    try {
      // TODO: 调用评论API
      console.log('提交评论:', comment);
      setComment('');
    } catch (error) {
      console.error('提交评论失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (commentId: string) => {
    // TODO: 调用点赞API
    console.log('点赞评论:', commentId);
  };

  const handleReply = (commentId: string) => {
    // TODO: 实现回复功能
    console.log('回复评论:', commentId);
  };

  const handleReport = (commentId: string) => {
    // TODO: 实现举报功能
    console.log('举报评论:', commentId);
  };

  return (
    <div className="space-y-8">
      {/* 评论输入框 */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src="/avatars/current-user.jpg" />
            <AvatarFallback>用户</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="写下你的评论..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4 mr-1" />
                  表情
                </Button>
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4 mr-1" />
                  图片
                </Button>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !comment.trim()}
              >
                {isSubmitting ? '发送中...' : '发送'}
                <Send className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">评论 ({comments.length})</h3>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {comment.author.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {comment.date}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleReply(comment.id)}>
                            回复
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReport(comment.id)}>
                            举报
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(comment.id)}
                      className={comment.isLiked ? 'text-red-500' : ''}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {comment.replies}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default BlogComment; 