'use client'

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

interface GoogleAuthProps {
  onSuccess?: () => void;
  text?: string;
  variant?: 'signin' | 'signup';
}

export default function GoogleAuth({ onSuccess, text, variant = 'signin' }: GoogleAuthProps) {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '763555633110-h9t2u2lhejbehbgrihe4iucn4ektslt6.apps.googleusercontent.com';

  const handleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Google credential response:', credentialResponse);
      
      if (!credentialResponse.credential) {
        throw new Error('No credential received from Google');
      }

      // Decode the JWT token
      const base64Url = credentialResponse.credential.split('.')[1];
      if (!base64Url) {
        throw new Error('Invalid JWT token format');
      }
      
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      
      const googleData = JSON.parse(jsonPayload);
      console.log('Decoded Google data:', googleData);

      // Login with Google data
      const success = await loginWithGoogle(googleData);
      if (success) {
        onSuccess?.();
        // Don't redirect immediately - let AuthProvider handle billing setup first
        // router.push('/'); // Removed immediate redirect
      } else {
        alert(`${variant === 'signup' ? 'Sign-up' : 'Sign-in'} failed. Please try again.`);
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      alert(`${variant === 'signup' ? 'Sign-up' : 'Sign-in'} failed: ${(error as Error).message}`);
    }
  };

  const handleError = () => {
    console.error('Google authentication failed');
    alert(`${variant === 'signup' ? 'Sign-up' : 'Sign-in'} failed. Please try again.`);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        text={text as any || (variant === 'signup' ? 'signup_with' : 'signin_with')}
        shape="rectangular"
        theme="outline"
        size="large"
        width="100%"
        useOneTap={false}
      />
    </GoogleOAuthProvider>
  );
}
