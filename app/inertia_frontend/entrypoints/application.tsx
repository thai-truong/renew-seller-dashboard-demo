import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import '../../globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

createInertiaApp({
  resolve: (name: string) => {
    const pages = import.meta.glob('../Pages/**/*.tsx', { eager: true })
    return pages[`../Pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App {...props} />
      </ThemeProvider>
    )
  },
});
