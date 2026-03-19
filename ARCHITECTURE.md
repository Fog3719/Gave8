# 设计师作品集网站 - 现代化架构设计文档

## 1. 项目目录结构

```
mywebsite/
├── src/                          # 源代码目录
│   ├── components/               # 可复用组件
│   │   ├── ui/                   # 基础UI组件
│   │   │   ├── Button.ts
│   │   │   ├── Card.ts
│   │   │   ├── Tag.ts
│   │   │   └── index.ts
│   │   ├── layout/               # 布局组件
│   │   │   ├── Header.ts
│   │   │   ├── Footer.ts
│   │   │   └── Navigation.ts
│   │   ├── sections/             # 页面区块组件
│   │   │   ├── HeroSection.ts
│   │   │   ├── ProjectsSection.ts
│   │   │   └── AboutSection.ts
│   │   ├── project/              # 项目展示相关组件
│   │   │   ├── ProjectCard.ts
│   │   │   └── ProjectGrid.ts
│   │   └── effects/              # 视觉效果组件
│   │       ├── AmbientBackground.ts
│   │       └── ScrollAnimation.ts
│   ├── pages/                    # 页面
│   │   ├── home.ts
│   │   └── project-detail.ts
│   ├── data/                     # 数据管理
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── types.ts
│   ├── utils/                    # 工具函数
│   │   ├── dom.ts
│   │   ├── lazy-load.ts
│   │   └── image-optimizer.ts
│   ├── styles/                   # 样式系统
│   │   ├── tailwind.css
│   │   ├── variables.css
│   │   └── components.css
│   └── main.ts                   # 应用入口
├── public/                       # 静态资源
│   ├── images/
│   │   ├── projects/
│   │   │   ├── thumbnail/        # 缩略图 400x300
│   │   │   ├── medium/           # 中等图 800x600
│   │   │   └── full/             # 原图
│   │   └── avatar/
│   └── fonts/
├── content/                      # 内容文件 JSON/Markdown
│   ├── projects/
│   └── site.json
├── config/                       # 配置文件
│   ├── tailwind.config.js
│   └── vite.config.ts
├── scripts/                      # 构建脚本
│   └── optimize-images.js
└── package.json
```

## 2. 组件拆分策略

### 2.1 原子化设计方法

采用 Atomic Design 方法论：Atoms -> Molecules -> Organisms -> Templates -> Pages

#### Atoms (原子组件)

**Button.ts** - 可复用按钮组件
```typescript
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: string | HTMLElement;
  onClick?: () => void;
  disabled?: boolean;
}

export class Button {
  private element: HTMLButtonElement;

  constructor(props: ButtonProps) {
    this.element = document.createElement('button');
    this.render(props);
  }

  private render(props: ButtonProps): void {
    const baseClasses = 'rounded-md font-medium transition-all duration-300';
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-700 text-white hover:bg-gray-800',
      ghost: 'bg-transparent border border-white/40 text-white/50 hover:bg-black hover:text-white'
    };
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    this.element.className = `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`;
    
    if (typeof props.children === 'string') {
      this.element.textContent = props.children;
    } else {
      this.element.appendChild(props.children);
    }

    if (props.onClick) {
      this.element.addEventListener('click', props.onClick);
    }
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }
}
```

**Tag.ts** - 标签组件
```typescript
export interface TagProps {
  text: string;
  variant?: 'default' | 'gradient';
}

export class Tag {
  private element: HTMLSpanElement;

  constructor(props: TagProps) {
    this.element = document.createElement('span');
    this.render(props);
  }

  private render(props: TagProps): void {
    const baseClasses = 'text-xs font-bold';
    const variantClasses = {
      default: 'text-cyan-400',
      gradient: 'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'
    };

    this.element.className = `${baseClasses} ${variantClasses[props.variant || 'gradient']}`;
    this.element.textContent = props.text;
  }

  getElement(): HTMLSpanElement {
    return this.element;
  }
}
```

#### Molecules (分子组件) - ProjectCard.ts

```typescript
import { Tag } from '../ui/Tag.js';
import { Button } from '../ui/Button.js';

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  date?: string;
  onReadMore?: (id: string) => void;
}

export class ProjectCard {
  private element: HTMLElement;
  private props: ProjectCardProps;

  constructor(props: ProjectCardProps) {
    this.props = props;
    this.element = document.createElement('article');
    this.render();
  }

  private render(): void {
    this.element.className = 'card scroll-animation';

    // Tags
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'flex flex-wrap gap-2';
    this.props.tags.forEach(tagText => {
      const tag = new Tag({ text: tagText, variant: 'gradient' });
      tagsContainer.appendChild(tag.getElement());
    });

    // Image
    const img = document.createElement('img');
    img.className = 'object-cover object-center rounded-lg w-full h-42';
    img.src = this.props.thumbnail;
    img.alt = this.props.title;
    img.loading = 'lazy';

    // Title
    const title = document.createElement('h2');
    title.className = 'text-xl font-semibold';
    title.textContent = this.props.title;

    // Description
    const description = document.createElement('p');
    description.className = 'text-sm text-white/50 overflow-clip line-clamp-3';
    description.textContent = this.props.description;

    // Footer
    const footer = document.createElement('div');
    footer.className = 'flex flex-row items-center justify-between w-full mt-auto';

    if (this.props.date) {
      const date = document.createElement('span');
      date.className = 'text-xs text-white/40';
      date.textContent = this.props.date;
      footer.appendChild(date);
    }

    const readMoreBtn = new Button({
      variant: 'ghost',
      size: 'sm',
      children: 'Read More',
      onClick: () => this.props.onReadMore?.(this.props.id)
    });
    footer.appendChild(readMoreBtn.getElement());

    // Assemble
    this.element.appendChild(tagsContainer);
    this.element.appendChild(img);
    this.element.appendChild(title);
    this.element.appendChild(description);
    this.element.appendChild(footer);

    // Scroll animation
    this.observeScroll();
  }

  private observeScroll(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.element);
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
```

#### Organisms (有机体组件) - ProjectsSection.ts

```typescript
import { ProjectCard, ProjectCardProps } from '../project/ProjectCard.js';
import { projectsData } from '../../data/projects.js';

export class ProjectsSection {
  private element: HTMLElement;
  private projects: ProjectCardProps[];
  private filter: string = 'all';

  constructor(maxProjects?: number) {
    this.element = document.createElement('section');
    this.projects = projectsData.slice(0, maxProjects || projectsData.length);
    this.render();
  }

  private render(): void {
    this.element.className = 'flex flex-col w-full gap-4 items-center lg:mx-auto lg:max-w-custom-1200 my-10';

    // Header
    const header = document.createElement('div');
    header.className = 'flex items-center justify-center flex-col gap-4';

    const title = document.createElement('h1');
    title.className = 'text-4xl lg:text-5xl font-bold md:font-medium px-4';
    title.textContent = 'My Work';

    const subtitle = document.createElement('p');
    subtitle.className = 'font-normal opacity-70 text-base text-center';
    subtitle.textContent = '精选设计作品展示';

    header.appendChild(title);
    header.appendChild(subtitle);

    // Filter
    const filterContainer = this.createFilter();

    // Grid
    const grid = document.createElement('div');
    grid.className = 'projects-grid';
    grid.id = 'projects-grid';
    this.renderProjects(grid);

    // Assemble
    this.element.appendChild(header);
    this.element.appendChild(filterContainer);
    this.element.appendChild(grid);
  }

  private createFilter(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'flex gap-2 flex-wrap justify-center';

    const categories = ['all', 'UX Design', 'UI Design', 'Branding', 'AIGC'];

    categories.forEach(category => {
      const btn = document.createElement('button');
      btn.className = `px-4 py-2 rounded-full text-sm transition-all duration-300 ${
        this.filter === category ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
      }`;
      btn.textContent = category === 'all' ? '全部' : category;
      btn.addEventListener('click', () => this.handleFilter(category));
      container.appendChild(btn);
    });

    return container;
  }

  private handleFilter(category: string): void {
    this.filter = category;
    const grid = this.element.querySelector('#projects-grid');
    if (grid) {
      grid.innerHTML = '';
      this.renderProjects(grid as HTMLElement);
    }
  }

  private renderProjects(container: HTMLElement): void {
    const filtered = this.filter === 'all'
      ? this.projects
      : this.projects.filter(p => p.tags.includes(this.filter));

    filtered.forEach(project => {
      const card = new ProjectCard({
        ...project,
        onReadMore: (id) => this.navigateToProject(id)
      });
      container.appendChild(card.getElement());
    });
  }

  private navigateToProject(id: string): void {
    window.location.href = `/project/${id}`;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
```

## 3. 数据管理方式

### 3.1 TypeScript 类型定义

```typescript
// src/data/types.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  thumbnail: string;
  images?: string[];
  tags: string[];
  category: 'ux' | 'ui' | 'branding' | 'aigc';
  date: string;
  client?: string;
  role?: string;
  duration?: string;
  tools?: string[];
  link?: string;
  featured?: boolean;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  author: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
    email: string;
    social: {
      github?: string;
      linkedin?: string;
      dribbble?: string;
    };
  };
}
```

### 3.2 数据存储方案

**方案A：TypeScript 数据文件（推荐）**

```typescript
// src/data/projects.ts
import { Project } from './types.js';

export const projectsData: Project[] = [
  {
    id: 'cad-integration',
    title: 'CAD 2.0 - Chipuller Integration Platform',
    description: '提供从网表生成、原理图设计到3D布局和布线数据的一站式解决方案。',
    thumbnail: '/images/projects/cad2-thumb.jpg',
    tags: ['UX Design', 'Product Design', 'B2B'],
    category: 'ux',
    date: '2024-01',
    featured: true
  },
  // ... more projects
];

// 辅助函数
export const getFeaturedProjects = () => projectsData.filter(p => p.featured);
export const getProjectById = (id: string) => projectsData.find(p => p.id === id);
export const getProjectsByCategory = (category: string) => 
  projectsData.filter(p => p.category === category);
```

**方案B：JSON 文件**

```json
// content/projects/cad-integration.json
{
  "id": "cad-integration",
  "title": "CAD 2.0 - Chipuller Integration Platform",
  "description": "提供从网表生成、原理图设计到3D布局和布线数据的一站式解决方案。",
  "thumbnail": "/images/projects/cad2-thumb.jpg",
  "tags": ["UX Design", "Product Design"],
  "category": "ux",
  "date": "2024-01",
  "featured": true
}
```

## 4. 样式架构

### 4.1 Tailwind 配置

```javascript
// config/tailwind.config.js
module.exports = {
  content: ['./src/**/*.{ts,js}', './**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        accent: {
          cyan: '#4A86B4',
          blue: '#265999',
          light: '#1781C2',
          bright: '#0CBCEB',
          purple: '#caa4ea',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Vampiro One', 'cursive'],
      },
      maxWidth: {
        'custom-1200': '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
```

### 4.2 CSS 变量系统

```css
/* src/styles/variables.css */
:root {
  /* 颜色系统 */
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text-primary: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.7);
  --color-border: rgba(255, 255, 255, 0.2);

  /* 强调色 */
  --color-accent-cyan: #4A86B4;
  --color-accent-blue: #265999;
  --color-accent-bright: #0CBCEB;
  --color-accent-purple: #caa4ea;

  /* 间距 */
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* 圆角 */
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* 过渡 */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
}
```

### 4.3 组件样式

```css
/* src/styles/components.css */
@layer components {
  .card {
    @apply bg-black/40 rounded-2xl shadow-lg p-4
           transition-all duration-300 ease-in-out
           border border-white/20
           hover:shadow-xl hover:bg-black/80;
  }

  .tag {
    @apply text-xs font-bold bg-clip-text text-transparent
           bg-gradient-to-r from-blue-500 to-purple-500;
  }

  .scroll-animation {
    @apply opacity-0 -translate-y-12
           transition-all duration-500 ease-out;
    will-change: opacity, transform;
  }

  .scroll-animation.active {
    @apply opacity-100 translate-y-0;
  }

  .projects-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6;
  }
}
```

### 4.4 Tailwind 入口

```css
/* src/styles/tailwind.css */
@import 'variables.css';
@import 'components.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans text-white bg-slate-900 antialiased;
  }
}

@layer utilities {
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

## 5. 图片/资源优化方案

### 5.1 图片处理脚本

```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  inputDir: './public/images/projects',
  outputDir: './dist/images/projects',
  sizes: [
    { suffix: 'thumb', width: 400, quality: 80 },
    { suffix: 'medium', width: 800, quality: 85 },
    { suffix: 'large', width: 1200, quality: 90 },
  ],
  formats: ['webp', 'jpeg'],
};

async function optimizeImage(inputPath, filename) {
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);

  for (const size of CONFIG.sizes) {
    for (const format of CONFIG.formats) {
      const outputDir = path.join(CONFIG.outputDir, size.suffix);
      await fs.mkdir(outputDir, { recursive: true });

      const outputPath = path.join(outputDir, `${basename}.${format}`);

      let pipeline = sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        });

      if (format === 'webp') {
        pipeline = pipeline.webp({ quality: size.quality });
      } else {
        pipeline = pipeline.jpeg({ quality: size.quality, progressive: true });
      }

      await pipeline.toFile(outputPath);
      console.log(`Generated: ${outputPath}`);
    }
  }
}

async function processAllImages() {
  const files = await fs.readdir(CONFIG.inputDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  for (const file of imageFiles) {
    const inputPath = path.join(CONFIG.inputDir, file);
    await optimizeImage(inputPath, file);
  }
}

processAllImages().catch(console.error);
```

### 5.2 响应式图片组件

```typescript
// src/utils/image-optimizer.ts
export function generateSrcSet(baseName: string): string {
  const sizes = ['thumb', 'medium', 'large'];
  const widths = [400, 800, 1200];

  return sizes
    .map((size, i) => `/images/projects/${size}/${baseName}.webp ${widths[i]}w`)
    .join(', ');
}

export function createResponsiveImage(props: {
  src: string;
  alt: string;
  className?: string;
}): HTMLPictureElement {
  const picture = document.createElement('picture');
  const baseName = props.src.replace(/\.[^/.]+$/, '');

  // WebP source
  const webpSource = document.createElement('source');
  webpSource.type = 'image/webp';
  webpSource.srcset = generateSrcSet(baseName);
  webpSource.sizes = '(max-width: 768px) 100vw, 50vw';

  // JPEG fallback
  const jpegSource = document.createElement('source');
  jpegSource.type = 'image/jpeg';
  jpegSource.srcset = generateSrcSet(baseName).replace(/\.webp/g, '.jpg');
  jpegSource.sizes = '(max-width: 768px) 100vw, 50vw';

  // IMG element
  const img = document.createElement('img');
  img.src = `/images/projects/medium/${baseName}.jpg`;
  img.alt = props.alt;
  img.loading = 'lazy';
  img.className = props.className || '';

  picture.appendChild(webpSource);
  picture.appendChild(jpegSource);
  picture.appendChild(img);

  return picture;
}
```

### 5.3 懒加载实现

```typescript
// src/utils/lazy-load.ts
export class LazyLoader {
  private observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { rootMargin: '50px', threshold: 0.01 }
    );
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  private loadElement(element: Element): void {
    if (element instanceof HTMLImageElement) {
      const src = element.dataset.src;
      if (src) {
        element.src = src;
        element.removeAttribute('data-src');
      }
    }
    element.classList.add('loaded');
  }

  observe(selector: string): void {
    document.querySelectorAll(selector).forEach(el => {
      this.observer.observe(el);
    });
  }
}

export const lazyLoader = new LazyLoader();
```

## 6. 构建和部署流程

### 6.1 Vite 配置

```typescript
// config/vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '@components': resolve(__dirname, '../src/components'),
      '@data': resolve(__dirname, '../src/data'),
      '@utils': resolve(__dirname, '../src/utils'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(css)$/i.test(name)) return 'css/[name]-[hash][extname]';
          if (/\.(jpg|jpeg|png|webp)$/i.test(name)) return 'images/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
  },
  css: {
    postcss: './config/postcss.config.js',
  },
});
```

### 6.2 PostCSS 配置

```javascript
// config/postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: { config: './config/tailwind.config.js' },
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {}),
  },
};
```

### 6.3 package.json

```json
{
  "name": "designer-portfolio",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --config config/vite.config.ts",
    "build": "npm run clean && npm run optimize-images && vite build --config config/vite.config.ts",
    "preview": "vite preview --config config/vite.config.ts",
    "clean": "rm -rf dist",
    "optimize-images": "node scripts/optimize-images.js",
    "type-check": "tsc --noEmit",
    "deploy": "npm run build && vercel --prod"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.45",
    "sharp": "^0.33.0",
    "tailwindcss": "^3.4.11",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

### 6.4 CI/CD GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check
      - run: npm run build
      - run: npm run optimize-images
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      - uses: vercel/action-deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 7. 性能优化清单

- [ ] 关键CSS内联
- [ ] 首屏图片预加载
- [ ] 字体预加载
- [ ] 延迟加载非关键JS
- [ ] 图片懒加载
- [ ] 组件懒加载
- [ ] 代码分割
- [ ] Tree shaking
- [ ] 资源压缩
- [ ] CDN 部署

## 8. 迁移路线图

1. **阶段1**：创建目录结构，配置 TypeScript + Vite + Tailwind
2. **阶段2**：提取组件，重构项目卡片和区块
3. **阶段3**：迁移数据，实现数据管理
4. **阶段4**：图片优化，懒加载实现
5. **阶段5**：CI/CD 配置，部署上线
