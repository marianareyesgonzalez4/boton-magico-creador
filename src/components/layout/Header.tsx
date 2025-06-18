
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Settings, LogOut, Heart, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Logo from '@/components/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/productos?buscar=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navigationItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/productos' },
    { name: 'Historias', href: '/stories' },
    { name: 'Sobre Nosotros', href: '/about' },
    { name: 'Contacto', href: '/contact' }
  ];

  return (
    <>
      {/* Barra superior con información de contacto */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-700 text-white py-2 px-4 text-xs sm:text-sm">
        <div className="container-custom flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>+57 (4) 123-4567</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>info@tesoroschoco.com</span>
            </div>
          </div>
          <div className="text-center">
            <span className="font-medium">🎓 Proyecto SENA - Ficha 2879645</span>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-200 border-b border-amber-200 dark:border-gray-700">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 py-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <Logo size="lg" showText={true} className="hover:scale-105 transition-transform duration-200" />
            </Link>

            {/* Navegación desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-medium transition-all duration-200 py-2 px-3 rounded-lg relative group ${
                      isActive 
                        ? 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20' 
                        : 'text-gray-700 hover:text-amber-700 dark:text-gray-300 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10'
                    }`}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-700 dark:bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                );
              })}
            </nav>

            {/* Buscador desktop */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Buscar artesanías..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border-2 border-amber-200 dark:border-gray-600 rounded-lg focus:border-amber-500 dark:focus:border-amber-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Acciones */}
            <div className="flex items-center space-x-3">
              {/* Toggle de tema */}
              <ThemeToggle />

              {/* Lista de deseos */}
              <Link to="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 rounded-full bg-amber-50 dark:bg-gray-800 hover:bg-amber-100 dark:hover:bg-gray-700 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-gray-600 transition-all shadow-sm"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              {/* Carrito */}
              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 rounded-full bg-amber-50 dark:bg-gray-800 hover:bg-amber-100 dark:hover:bg-gray-700 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-gray-600 transition-all shadow-sm"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold shadow-lg">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Autenticación */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-amber-50 dark:bg-gray-800 hover:bg-amber-100 dark:hover:bg-gray-700 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-gray-600 transition-all shadow-sm"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700">
                        <User className="mr-2 h-4 w-4" />
                        Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account-management" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700">
                        <Settings className="mr-2 h-4 w-4" />
                        Configuración
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                    <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-500 dark:hover:text-white transition-all shadow-sm font-medium"
                    >
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg dark:bg-amber-500 dark:hover:bg-amber-600 transition-all font-medium"
                    >
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}

              {/* Menú móvil */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700 rounded-full border border-amber-200 dark:border-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Menú móvil expandido */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-amber-200 dark:border-gray-700 py-4 bg-white dark:bg-gray-900 animate-slide-up">
              {/* Buscador móvil */}
              <form onSubmit={handleSearch} className="relative mb-6 px-4">
                <Input
                  type="text"
                  placeholder="Buscar artesanías..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 border-amber-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="absolute right-7 top-1/2 transform -translate-y-1/2 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>

              {/* Navegación móvil */}
              <nav className="space-y-1 px-4">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-3 px-4 rounded-lg font-medium transition-all ${
                        isActive 
                          ? 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20' 
                          : 'text-gray-700 hover:text-amber-700 dark:text-gray-300 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
