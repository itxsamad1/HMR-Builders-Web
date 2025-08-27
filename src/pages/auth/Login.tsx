import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/lib/auth';
import { useTranslation } from '@/lib/i18n';
import { Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginProps {
  language: 'en' | 'ur';
}

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const TwoFactorVerification = ({ language, onVerify, onBack }: {
  language: 'en' | 'ur';
  onVerify: (code: string) => void;
  onBack: () => void;
}) => {
  const { t } = useTranslation(language);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    
    setLoading(true);
    try {
      await onVerify(code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto card-premium">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <CardTitle>{t('auth.2fa.title')}</CardTitle>
        <CardDescription>{t('auth.2fa.subtitle')}</CardDescription>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Demo: Use codes <strong>123456</strong> or <strong>000000</strong>
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('auth.2fa.code')}
            </label>
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="text-center text-2xl tracking-widest"
              maxLength={6}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              {t('common.back')}
            </Button>
            <Button
              type="submit"
              variant="premium"
              disabled={code.length !== 6 || loading}
              className="flex-1"
            >
              {loading ? t('common.loading') : t('auth.2fa.verify')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Login({ language }: LoginProps) {
  const { t } = useTranslation(language);
  const { login, verify2FA } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      
      if (result.requiresTwoFactor) {
        setRequiresTwoFactor(true);
      } else {
        toast({
          title: t('common.success'),
          description: 'Welcome back!',
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : 'Login failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactorVerify = async (code: string) => {
    try {
      await verify2FA(code);
      toast({
        title: t('common.success'),
        description: 'Welcome back!',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : '2FA verification failed',
        variant: 'destructive',
      });
    }
  };

  if (requiresTwoFactor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary-light/5 pattern-bg p-4">
        <TwoFactorVerification
          language={language}
          onVerify={handleTwoFactorVerify}
          onBack={() => setRequiresTwoFactor(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary-light/5 pattern-bg p-4">
      <Card className="w-full max-w-md card-premium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t('auth.login.title')}
          </CardTitle>
          <CardDescription>
            {t('auth.login.subtitle')}
          </CardDescription>

          {/* Demo Credentials Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-left">
              <strong>Demo Credentials:</strong><br />
              Admin: admin@hmr.pk / Admin@1234<br />
              Investor: investor@hmr.pk / Investor@1234
            </AlertDescription>
          </Alert>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.login.email')}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@hmr.pk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.login.password')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Admin@1234"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        {t('auth.login.rememberMe')}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="premium"
                className="w-full"
                disabled={loading}
              >
                {loading ? t('common.loading') : t('auth.login.loginButton')}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center space-y-2">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              {t('auth.login.forgotPassword')}
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('auth.login.noAccount')}{' '}
              <Link
                to="/auth/register"
                className="text-primary hover:underline font-medium"
              >
                {t('auth.login.signUpLink')}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}