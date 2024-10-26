'use client';
import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState(initialView);

  const handleClose = () => {
    onClose();
    // Reset to initial view when closing
    setTimeout(() => setView(initialView), 200);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {view === 'login' ? (
        <LoginForm 
          onClose={handleClose}
          onSwitchToRegister={() => setView('register')}
        />
      ) : (
        <RegisterForm 
          onClose={handleClose}
          onSwitchToLogin={() => setView('login')}
        />
      )}
    </Modal>
  );
};

export default AuthModal;