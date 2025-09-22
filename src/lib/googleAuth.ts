export const initializeGoogleAuth = (clientId: string, callback: (response: any) => void) => {
  if (typeof window === 'undefined' || !window.google) {
    throw new Error('Google OAuth not available');
  }

  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: callback,
  });
};

export const triggerGoogleAuth = () => {
  if (typeof window === 'undefined' || !window.google) {
    throw new Error('Google OAuth not available');
  }

  window.google.accounts.id.prompt();
};

export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
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
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Failed to decode JWT token: ' + error);
  }
};
