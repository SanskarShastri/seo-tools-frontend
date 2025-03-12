'use client';

import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const AuthModals = () => {
  const {
    isLoginModalOpen,
    isRegisterModalOpen,
    closeLoginModal,
    closeRegisterModal,
    switchToLogin,
    switchToRegister,
  } = useAuth();

  return (
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSwitchToRegister={switchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default AuthModals; 