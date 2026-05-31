import { Product, AdminSettings } from './types';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'obsidian-truffle',
    name: 'The Obsidian Truffle',
    description: 'Single grass-fed Wagyu patty, shaved black truffles, truffle aioli, aged cave-aged gruyère, charred caramelized onions, on an organic toasted charcoal brioche bun.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    category: 'Signature'
  },
  {
    id: 'golden-ember-double',
    name: 'The Golden Ember Double',
    description: 'Dual dry-aged heirloom Wagyu beef patties, gold-infused hot maple glaze, double melted English cheddar, crispy applewood smoked beef bacon, charred jalapeño confit.',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600',
    category: 'Elite'
  },
  {
    id: 'fire-glazed-crisp',
    name: 'The Fire-Glazed Crisp',
    description: 'Buttermilk soaked organic chicken breast, hand-battered and spiced, finished with hot honey glaze, artisan dill pickles, shredded cabbage slaw, roasted garlic spread.',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=600',
    category: 'Poultry'
  },
  {
    id: 'umami-forest',
    name: 'The Umami Forest',
    description: 'Balsamic-marinated wild portobello, melted smoked gouda cheese, organic wild baby rocket, fire-roasted sweet bell peppers, heavy garlic and rosemary spread.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=600',
    category: 'Vegetarian'
  },
  {
    id: 'sovereign-crown',
    name: 'The Sovereign Crown',
    description: 'Triple flame-grilled Wagyu patties, hand-poured roasted marrow butter, mature white sharp cheddar, luxury white truffle glaze, black pepper bacon jam.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    category: 'Elite'
  }
];

export const DEFAULT_SETTINGS: AdminSettings = {
  whatsappNumber: '03144460158',
  heroVideoUrl: 'https://res.cloudinary.com/dchquihjt/video/upload/v1780153516/273900320_gucvfo.mp4?_s=public-apps',
  secondaryVideoUrl: 'https://res.cloudinary.com/dchquihjt/video/upload/v1780153623/983732204_jpbzfx.mp4?_s=public-apps'
};

export const REVIEWS = [
  {
    id: 'r1',
    name: 'Julian Vance',
    role: 'Michelin Critic',
    text: 'Each bite is an sensory explosion of fire and oak. Easily the most premium burger I have ever tasted in the country.',
    stars: 5
  },
  {
    id: 'r2',
    name: 'Elena Rostova',
    role: 'Food & Wine Editor',
    text: 'The Obsidian Truffle is sheer culinary artistry. The dark theme, the smoke, the premium craftsmanship—it is a $1000 experience.',
    stars: 5
  },
  {
    id: 'r3',
    name: 'Marcus Sterling',
    role: 'Luxury Lifestyle Influencer',
    text: 'A gorgeous dining masterclass. Ordering on WhatsApp is incredibly fast, and they serve elite cuts with gold-class delivery.',
    stars: 5
  }
];
