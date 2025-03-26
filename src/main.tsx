import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.css';

// 错误边界处理
const handleError = (error: Error) => {
  console.error('应用发生错误:', error);
  // 这里可以添加错误上报逻辑
};

window.onerror = (message, source, lineno, colno, error) => {
  handleError(error || new Error(message as string));
};

window.onunhandledrejection = (event) => {
  handleError(event.reason);
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
