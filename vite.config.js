import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer],
      },
    },
  };
  
  if (command === 'build') {
    config.build = {
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 1000,
      
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            router: ['react-router-dom'],
            framer: ['framer-motion'],
            icons: ['react-icons'],
            leaflet: ['leaflet', 'react-leaflet'],
          },
        },
      },
      
      // Optimize minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      
      // Reduce build size
      sourcemap: false,
      
      // Improve build performance
      target: 'esnext',
    };
  }
  
  return config;
});
