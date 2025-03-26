import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  CreditCard, Wallet, QrCode,
  Check, Lock, Shield,
  ChevronRight, Smartphone,
  Building2, CreditCard as CreditCardIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  enabled: boolean;
}

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const PaymentPage: React.FC = () => {
  const { theme } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState('alipay');
  const [amount, setAmount] = useState('');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'alipay',
      name: '支付宝',
      icon: <Smartphone className="h-6 w-6 text-blue-500" />,
      description: '使用支付宝支付',
      enabled: true
    },
    {
      id: 'wechat',
      name: '微信支付',
      icon: <Smartphone className="h-6 w-6 text-green-500" />,
      description: '使用微信支付',
      enabled: true
    },
    {
      id: 'unionpay',
      name: '银联支付',
      icon: <Building2 className="h-6 w-6 text-blue-600" />,
      description: '使用银联卡支付',
      enabled: true
    },
    {
      id: 'credit',
      name: '信用卡',
      icon: <CreditCardIcon className="h-6 w-6 text-purple-500" />,
      description: '使用信用卡支付',
      enabled: true
    }
  ];

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      amount: 1000,
      description: '充值',
      date: '2024-03-20 14:30',
      status: 'completed'
    },
    {
      id: '2',
      type: 'expense',
      amount: 500,
      description: '购买会员',
      date: '2024-03-19 16:45',
      status: 'completed'
    },
    {
      id: '3',
      type: 'expense',
      amount: 200,
      description: '购买积分',
      date: '2024-03-18 09:15',
      status: 'pending'
    }
  ];

  const handlePayment = () => {
    console.log('处理支付:', {
      method: selectedMethod,
      amount: parseFloat(amount)
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">支付中心</h1>

          <ScrollArea className="h-[calc(100vh-200px)]">
            {/* 账户余额 */}
            <Card className={`mb-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-muted-foreground">账户余额</Label>
                    <h2 className="text-3xl font-bold mt-2">¥2,500.00</h2>
                  </div>
                  <Button>
                    <Wallet className="h-4 w-4 mr-2" />
                    充值
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 支付方式 */}
            <Card className={`mb-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
              <CardHeader>
                <CardTitle>选择支付方式</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedMethod}
                  onValueChange={setSelectedMethod}
                  className="space-y-4"
                >
                  {paymentMethods.map(method => (
                    <div key={method.id} className="flex items-center space-x-4">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center space-x-2 cursor-pointer">
                        {method.icon}
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {method.description}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* 支付金额 */}
            <Card className={`mb-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
              <CardHeader>
                <CardTitle>支付金额</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>输入金额</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ¥
                      </span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="pl-8"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handlePayment}>
                    <Lock className="h-4 w-4 mr-2" />
                    确认支付
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 最近交易 */}
            <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
              <CardHeader>
                <CardTitle>最近交易</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map(transaction => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'income' 
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'income' ? <Wallet className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`font-medium ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}¥{transaction.amount}
                        </span>
                        <Badge
                          variant={
                            transaction.status === 'completed'
                              ? 'default'
                              : transaction.status === 'pending'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {transaction.status === 'completed'
                            ? '已完成'
                            : transaction.status === 'pending'
                            ? '处理中'
                            : '失败'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage; 