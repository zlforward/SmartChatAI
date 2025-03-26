
import React from 'react';

interface ZhiliaoLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'icon';
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
}

const ZhiliaoLogo: React.FC<ZhiliaoLogoProps> = ({ 
  size = 'md', 
  variant = 'full',
  className = '',
  theme = 'auto'
}) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    xs: 'text-sm',
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const subtitleSizes = {
    xs: 'text-[8px]',
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base'
  };

  const getColorScheme = () => {
    if (theme === 'light') return 'text-zhiliao-600 bg-white';
    if (theme === 'dark') return 'text-zhiliao-400 bg-slate-800';
    return 'text-zhiliao-600 bg-white dark:text-zhiliao-400 dark:bg-slate-800';
  };

  const logoColorScheme = getColorScheme();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`relative ${sizes[size]}`}>
        {variant === 'icon' ? (
          <img 
            src="/lovable-uploads/d4996f08-c35e-4543-9997-289fd45be96b.png" 
            alt="知了Logo" 
            className="w-full h-full object-contain" 
          />
        ) : (
          <img 
            src="/lovable-uploads/d4996f08-c35e-4543-9997-289fd45be96b.png" 
            alt="知了Logo" 
            className="w-full h-full object-contain" 
          />
        )}
      </div>
      {variant !== 'icon' && (
        <div className="flex flex-col">
          <span className={`font-bold ${logoColorScheme.split(' ')[0]} ${textSizes[size]}`}>
            知了{variant === 'compact' ? '' : ''}
          </span>
          {variant === 'full' && (
            <span className={`${logoColorScheme.split(' ')[0]} opacity-80 ${subtitleSizes[size]}`}>
              智能助手社交平台
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ZhiliaoLogo;
