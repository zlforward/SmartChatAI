import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-zhiliao-500" />
        <p className="text-lg text-muted-foreground">加载中...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 