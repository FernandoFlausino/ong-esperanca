import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'html',

    build: {
        outDir: '../dist',
        emptyOutDir: true,

        rollupOptions: {
            input: {
                index: resolve(import.meta.dirname, 'html/index.html'),
                inicio: resolve(import.meta.dirname, 'html/inicio.html'),
                projetos: resolve(import.meta.dirname, 'html/projetos.html'),
                cadastro: resolve(import.meta.dirname, 'html/cadastro.html'),
                componentes: resolve(import.meta.dirname, 'html/componentes.html')
            }
        }
    }
});