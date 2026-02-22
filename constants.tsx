import { PromptModel, InspirationItem, TutorialArticle } from './types';

export const PROMPT_MODELS = [
  {
    id: PromptModel.GENERAL,
    title: 'General Image Prompt',
    description: 'Natural language description of the image',
    isPremium: false
  },
  {
    id: PromptModel.STRUCTURED,
    title: 'Structured Prompt',
    description: 'Splits into Subject, Environment & Visual Style for remixing',
    isPremium: true
  },
  {
    id: PromptModel.GRAPHIC_DESIGN,
    title: 'Graphic Design',
    description: 'Replicates professional design aesthetics, typography, and layout',
    isPremium: true
  },
  {
    id: PromptModel.JSON,
    title: 'JSON Prompt',
    description: 'Translates visuals into machine-native JSON code',
    isPremium: true
  },
  {
    id: PromptModel.FLUX,
    title: 'Flux Prompt',
    description: 'Optimized for Flux AI models, concise natural language',
    isPremium: false
  },
  {
    id: PromptModel.MIDJOURNEY,
    title: 'Midjourney',
    description: 'Tailored for Midjourney generation with specific flags',
    isPremium: false
  },
  {
    id: PromptModel.STABLE_DIFFUSION,
    title: 'Stable Diffusion',
    description: 'Formatted for Stable Diffusion models with keyword weighting',
    isPremium: false
  },
  {
    id: PromptModel.GEMINI_PROMPT,
    title: 'Gemini Prompt',
    description: 'Ultra-realistic character identity & structured studio parameters',
    isPremium: false, // Changed from true to false - free for everyone
    isSpecial: true 
  }
];

export const INSPIRATION_GALLERY: InspirationItem[] = [
  {
    id: '1',
    category: 'Manga',
    imageUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=1000',
    prompt: 'A black and white manga panel showing a young shonen character with spiky hair and a determined expression, wearing a tattered jacket and scarf. He is drawing a katana that glows with magical energy, facing a large, shadowy spirit monster (yokai) in a destroyed Japanese village street at night. The panel is full of action, speed lines, cross-hatching shading, and kanji sound effects like "ドォォォン" (DOOON) and "ザッ" (ZA!). The style is classic shonen manga illustration.'
  },
  {
    id: '2',
    category: 'Japanese Ukiyo-e',
    imageUrl: 'https://picsum.photos/seed/ukiyoe/600/800',
    prompt: 'Edo period woodblock print style, flat colors, bold outlines, Mount Fuji in background, traditional Japanese waves, vibrant blues and oranges.'
  },
  {
    id: '3',
    category: 'Watercolor Illustration',
    imageUrl: 'https://picsum.photos/seed/watercolor/600/800',
    prompt: 'Soft bleeding edges, translucent layers of paint, paper texture visible, dreamy atmosphere, field of wildflowers, ethereal lighting.'
  },
  {
    id: '4',
    category: 'Anime',
    imageUrl: 'https://picsum.photos/seed/anime1/600/800',
    prompt: 'Modern digital anime style, Makoto Shinkai lighting, vibrant clouds, cinematic depth of field, high detail.'
  },
  {
    id: '5',
    category: 'Anime',
    imageUrl: 'https://picsum.photos/seed/anime2/600/800',
    prompt: 'Cyberpunk anime aesthetic, neon glow, rainy streets, detailed techwear, Studio Ghibli inspired color palette.'
  },
  {
    id: '6',
    category: '3D Animation',
    imageUrl: 'https://picsum.photos/seed/3d/600/800',
    prompt: 'Pixar-style 3D render, subsurface scattering on skin, highly detailed textures, whimsical lighting, expressive character design.'
  }
];

export const TUTORIALS: TutorialArticle[] = [
  {
    id: '1',
    title: 'Mastering the Art of Prompt Engineering',
    excerpt: 'Learn the secrets behind crafting perfect prompts that yield breathtaking AI art every single time.',
    imageUrl: 'https://picsum.photos/seed/tut1/800/400',
    date: 'March 15, 2026'
  },
  {
    id: '2',
    title: 'From Image to Prompt: A Deep Dive',
    excerpt: 'Understanding how Promptifie decomposes visual data into actionable text instructions for Midjourney.',
    imageUrl: 'https://picsum.photos/seed/tut2/800/400',
    date: 'April 2, 2026'
  },
  {
    id: '3',
    title: 'The Rise of Flux.1: Why Models Matter',
    excerpt: 'Comparing different AI models and why choosing the right prompt format is crucial for your workflow.',
    imageUrl: 'https://picsum.photos/seed/tut3/800/400',
    date: 'May 10, 2026'
  }
];