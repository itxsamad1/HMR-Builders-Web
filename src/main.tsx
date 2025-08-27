import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize MSW in development
if (import.meta.env.DEV) {
  import('./lib/msw/browser').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass',
    }).then(() => {
      console.log('🔧 MSW Ready - Mock API running');
      
      // Initialize database with seed data
      import('./lib/db').then(module => {
        module.initializeDatabase().then(() => {
          console.log('📊 HMR Database initialized');
          console.log('👤 Demo Users:');
          console.log('  Admin: admin@hmr.pk / Admin@1234 (2FA: 123456)');
          console.log('  Investor: investor@hmr.pk / Investor@1234');
        });
      });
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
