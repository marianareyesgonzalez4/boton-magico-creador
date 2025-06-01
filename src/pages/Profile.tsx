
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast({
      title: "Perfil actualizado",
      description: "Tu información ha sido guardada correctamente.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-choco-cream via-white to-choco-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
        <div className="container-custom max-w-4xl">
          <div className="mb-8">
            <Link 
              to="/" 
              className="text-choco-brown hover:text-choco-green dark:text-gray-300 dark:hover:text-choco-gold inline-flex items-center group transition-all"
            >
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Volver al inicio</span>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-choco-gold/20 dark:border-gray-700 overflow-hidden">
            {/* Header del perfil */}
            <div className="bg-gradient-to-r from-choco-green to-choco-blue dark:from-gray-700 dark:to-gray-600 p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 bg-white/20 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 h-8 w-8 bg-choco-gold hover:bg-choco-gold/80 rounded-full flex items-center justify-center transition-colors">
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{user?.name || 'Usuario'}</h1>
                  <p className="text-white/80">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Contenido del perfil */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-choco-brown dark:text-white">
                  Información Personal
                </h2>
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="bg-choco-green hover:bg-choco-blue text-white"
                  >
                    Editar Perfil
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      className="dark:border-gray-600 dark:text-gray-300"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleSave}
                      className="bg-choco-green hover:bg-choco-blue text-white"
                    >
                      Guardar
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-choco-brown dark:text-gray-300 font-medium">
                    <User className="h-4 w-4 inline mr-2" />
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`border-choco-gold/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                      !isEditing ? 'bg-gray-50 dark:bg-gray-600' : ''
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-choco-brown dark:text-gray-300 font-medium">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`border-choco-gold/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                      !isEditing ? 'bg-gray-50 dark:bg-gray-600' : ''
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-choco-brown dark:text-gray-300 font-medium">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Número de teléfono"
                    className={`border-choco-gold/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                      !isEditing ? 'bg-gray-50 dark:bg-gray-600' : ''
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-choco-brown dark:text-gray-300 font-medium">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Dirección
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Dirección completa"
                    className={`border-choco-gold/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                      !isEditing ? 'bg-gray-50 dark:bg-gray-600' : ''
                    }`}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 p-4 bg-choco-cream/30 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-sm text-choco-brown/70 dark:text-gray-300">
                    💡 Recuerda que cambiar tu correo electrónico puede requerir verificación adicional.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Profile;
