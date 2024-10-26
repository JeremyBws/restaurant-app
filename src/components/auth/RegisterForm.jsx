'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const RegisterForm = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères');
      return;
    }

    setLoading(true);
    
    try {
      await register(formData.email, formData.password, formData.name);
      if (onClose) onClose();
    } catch (err) {
      setError('Erreur lors de l&apos;inscription. Veuillez réessayer.');
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-sm w-full">
      <h2 className="text-2xl font-bold mb-6">Inscription</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="confirmPassword" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 rounded text-emerald-600"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            J&apos;accepte les{' '}
            <a href="#" className="text-emerald-600 hover:underline">
              conditions d&apos;utilisation
            </a>
            {' '}et la{' '}
            <a href="#" className="text-emerald-600 hover:underline">
              politique de confidentialité
            </a>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium
            ${loading 
              ? 'bg-emerald-400 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
        >
          {loading ? 'Inscription...' : 'S&apos;inscrire'}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Ou continuer avec
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Google
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Facebook
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Déjà un compte ?{' '}
        <button 
          onClick={onSwitchToLogin}
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Se connecter
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;