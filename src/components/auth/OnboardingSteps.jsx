 'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  MapPin, 
  Tag, 
  Utensils, 
  Check,
  ChevronRight,
  ChevronLeft,
  Upload
} from 'lucide-react';
import useAuthStore from '@/store/authStore';

const steps = [
  {
    id: 'photo',
    title: 'Photo de profil',
    description: 'Ajoutez une photo pour personnaliser votre profil'
  },
  {
    id: 'location',
    title: 'Localisation',
    description: 'Permettez-nous de vous suggérer les meilleurs restaurants près de chez vous'
  },
  {
    id: 'dietary',
    title: 'Préférences alimentaires',
    description: 'Aidez-nous à personnaliser vos recommandations'
  },
  {
    id: 'interests',
    title: 'Centres d\'intérêt',
    description: 'Sélectionnez ce qui vous intéresse le plus'
  }
];

const dietaryPreferences = [
  { id: 'vegetarian', label: 'Végétarien' },
  { id: 'vegan', label: 'Végan' },
  { id: 'halal', label: 'Halal' },
  { id: 'kosher', label: 'Casher' },
  { id: 'gluten-free', label: 'Sans gluten' },
  { id: 'lactose-free', label: 'Sans lactose' }
];

const interests = [
  { id: 'fine-dining', label: 'Gastronomie' },
  { id: 'casual', label: 'Décontracté' },
  { id: 'business', label: 'Business' },
  { id: 'romantic', label: 'Romantique' },
  { id: 'family', label: 'Famille' },
  { id: 'healthy', label: 'Healthy' },
  { id: 'local', label: 'Local' },
  { id: 'travel', label: 'Voyage' }
];

const OnboardingSteps = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    photo: null,
    location: null,
    dietaryPreferences: [],
    interests: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateAuthStore = useAuthStore((state) => state.updateProfile);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocation = async () => {
    setIsLoading(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      setProfileData({
        ...profileData,
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    } catch (error) {
      console.error('Erreur de géolocalisation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePreference = (type, id) => {
    const key = type === 'dietary' ? 'dietaryPreferences' : 'interests';
    const current = profileData[key];
    
    setProfileData({
      ...profileData,
      [key]: current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    });
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'photo':
        return (
          <div className="text-center">
            <div className="mb-6">
              <div className="relative w-32 h-32 mx-auto">
                {profileData.photo ? (
                  <img
                    src={profileData.photo}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                    <Camera size={40} className="text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 p-2 bg-amber-600 rounded-full cursor-pointer hover:bg-amber-700 transition-colors">
                  <Upload size={20} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="text-center">
            <button
              onClick={handleLocation}
              disabled={isLoading}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 
                transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <MapPin size={20} />
              {isLoading ? 'Localisation en cours...' : 'Activer la localisation'}
            </button>
            {profileData.location && (
              <div className="mt-4 text-green-600 flex items-center justify-center gap-2">
                <Check size={20} />
                Localisation activée
              </div>
            )}
          </div>
        );

      case 'dietary':
        return (
          <div className="grid grid-cols-2 gap-3">
            {dietaryPreferences.map((pref) => (
              <button
                key={pref.id}
                onClick={() => togglePreference('dietary', pref.id)}
                className={`p-3 rounded-lg border transition-colors flex items-center gap-2
                  ${profileData.dietaryPreferences.includes(pref.id)
                    ? 'border-amber-600 bg-amber-50 text-amber-600'
                    : 'border-gray-200 hover:border-amber-600'}`}
              >
                <Utensils size={20} />
                {pref.label}
              </button>
            ))}
          </div>
        );

      case 'interests':
        return (
          <div className="grid grid-cols-2 gap-3">
            {interests.map((interest) => (
              <button
                key={interest.id}
                onClick={() => togglePreference('interests', interest.id)}
                className={`p-3 rounded-lg border transition-colors flex items-center gap-2
                  ${profileData.interests.includes(interest.id)
                    ? 'border-amber-600 bg-amber-50 text-amber-600'
                    : 'border-gray-200 hover:border-amber-600'}`}
              >
                <Tag size={20} />
                {interest.label}
              </button>
            ))}
          </div>
        );
    }
  };

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      setIsLoading(true);
      try {
        await updateAuthStore(profileData);
        onComplete?.();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du profil:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep(current => current + 1);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`w-full h-1 rounded-full mx-1 ${
                index <= currentStep ? 'bg-amber-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-right text-sm text-gray-500">
          Étape {currentStep + 1} sur {steps.length}
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="min-h-[200px]">
          {renderStep()}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(current => current - 1)}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-lg flex items-center gap-2
            ${currentStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-amber-600'}`}
        >
          <ChevronLeft size={20} />
          Précédent
        </button>

        <button
          onClick={handleNext}
          disabled={isLoading}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 
            transition-colors flex items-center gap-2"
        >
          {currentStep === steps.length - 1 ? (
            'Terminer'
          ) : (
            <>
              Suivant
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OnboardingSteps;