import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { useTranslation } from '@/lib/i18n';
import { Menu, Globe, User, LogOut, Settings, DollarSign, Building2 } from 'lucide-react';

interface HeaderProps {
  language: 'en' | 'ur';
  onLanguageChange: (lang: 'en' | 'ur') => void;
}

export const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const { t } = useTranslation(language);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const publicNavItems = [
    { href: '/', label: t('nav.home') },
    { href: '/how-it-works', label: t('nav.howItWorks') },
    { href: '/offerings', label: t('nav.offerings') },
    { href: '/yields', label: t('nav.yields') },
    { href: '/safety', label: t('nav.safety') },
    { href: '/learn', label: t('nav.learn') },
    { href: '/about', label: t('nav.about') },
  ];

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user?.email}
            </p>
            <Badge variant="secondary" className="w-fit text-xs">
              {user?.role}
            </Badge>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          <User className="mr-2 h-4 w-4" />
          {t('nav.dashboard')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <Settings className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          {t('nav.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/src/assets/hmr-logo.jpg" 
            alt="HMR Logo" 
            className="h-8 w-8 rounded-lg object-cover"
            onError={(e) => {
              // Fallback to Building2 icon if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center hidden">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">
            HMR<span className="text-primary">.pk</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-8 space-x-6">
          {publicNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4 mr-1" />
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onLanguageChange('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange('ur')}>
                اردو
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Actions */}
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate('/auth/login')}>
                {t('nav.login')}
              </Button>
              <Button variant="hero" onClick={() => navigate('/auth/register')}>
                {t('nav.signup')}
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="px-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-6">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {!isAuthenticated && (
                  <div className="pt-4 space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/auth/login');
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t('nav.login')}
                    </Button>
                    <Button 
                      variant="hero" 
                      className="w-full"
                      onClick={() => {
                        navigate('/auth/register');
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t('nav.signup')}
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};