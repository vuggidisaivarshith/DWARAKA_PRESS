// ============================================================
// DWARAKA PRESS – Book Data
// ============================================================

const BOOKS = [
  // ===== Dwaraka Kids =====
  {
    id: 1,
    title: "The Little Star's Journey",
    author: "Meena Krishnan",
    category: "kids",
    price: 299,
    originalPrice: 399,
    badge: "Bestseller",
    emoji: "⭐",
    description: "A magical adventure about a little star who falls from the sky and discovers the beauty of the earth below.",
    pages: 48,
    ageGroup: "3–7 years",
    isbn: "978-81-XXXX-001-1"
  },
  {
    id: 2,
    title: "Colour Me: Animals of India",
    author: "Dwaraka Kids Studio",
    category: "kids",
    price: 199,
    originalPrice: null,
    badge: "New",
    emoji: "🐘",
    description: "A delightful colouring book featuring 30 hand-drawn illustrations of animals found across India.",
    pages: 64,
    ageGroup: "4–10 years",
    isbn: "978-81-XXXX-002-8"
  },
  {
    id: 3,
    title: "Grandma's Story Box",
    author: "Lakshmi Venkat",
    category: "kids",
    price: 349,
    originalPrice: 449,
    badge: null,
    emoji: "📦",
    description: "A collection of ten timeless folktales from across India, retold with warmth and wonder.",
    pages: 128,
    ageGroup: "5–10 years",
    isbn: "978-81-XXXX-003-5"
  },

  // ===== Dwaraka Fiction =====
  {
    id: 4,
    title: "The Monsoon Letters",
    author: "Arjun Rao",
    category: "fiction",
    price: 399,
    originalPrice: 499,
    badge: "Featured",
    emoji: "🌧️",
    description: "A sweeping epistolary novel set across three generations of a family in coastal Andhra.",
    pages: 384,
    ageGroup: null,
    isbn: "978-81-XXXX-004-2"
  },
  {
    id: 5,
    title: "Between Two Rivers",
    author: "Nalini Suresh",
    category: "fiction",
    price: 449,
    originalPrice: null,
    badge: "New",
    emoji: "🌊",
    description: "A literary novel exploring love, loss, and belonging in a small town divided by a river and old feuds.",
    pages: 312,
    ageGroup: null,
    isbn: "978-81-XXXX-005-9"
  },
  {
    id: 6,
    title: "The Cartographer's Dream",
    author: "Vikram Anand",
    category: "fiction",
    price: 379,
    originalPrice: 479,
    badge: "Bestseller",
    emoji: "🗺️",
    description: "An ambitious adventure novel following a mapmaker's apprentice through lands that exist only in imagination.",
    pages: 428,
    ageGroup: null,
    isbn: "978-81-XXXX-006-6"
  },

  // ===== Dwaraka Learn =====
  {
    id: 7,
    title: "Mathematics Mastery: Class 10",
    author: "Dr. S. Ramanujan",
    category: "learn",
    price: 549,
    originalPrice: 649,
    badge: "Popular",
    emoji: "📐",
    description: "A comprehensive guide covering the entire Class 10 CBSE mathematics syllabus with solved examples and practice sets.",
    pages: 512,
    ageGroup: "Class 10",
    isbn: "978-81-XXXX-007-3"
  },
  {
    id: 8,
    title: "Science Simplified: Classes 6–8",
    author: "Dr. Priya Nair",
    category: "learn",
    price: 449,
    originalPrice: null,
    badge: "New",
    emoji: "🔬",
    description: "Makes science accessible and fun with real-world experiments, colourful diagrams, and engaging activities.",
    pages: 368,
    ageGroup: "Classes 6–8",
    isbn: "978-81-XXXX-008-0"
  },
  {
    id: 9,
    title: "Competitive English Grammar",
    author: "Shobha Menon",
    category: "learn",
    price: 349,
    originalPrice: 429,
    badge: null,
    emoji: "✏️",
    description: "Essential grammar and vocabulary preparation for competitive examinations with 2,000+ practice questions.",
    pages: 448,
    ageGroup: null,
    isbn: "978-81-XXXX-009-7"
  },

  // ===== Dwaraka Knowledge =====
  {
    id: 10,
    title: "The History of Indian Textiles",
    author: "Prof. Kavitha Raman",
    category: "knowledge",
    price: 699,
    originalPrice: 899,
    badge: "Award Winner",
    emoji: "🧵",
    description: "A richly illustrated reference exploring 5,000 years of India's extraordinary textile heritage.",
    pages: 624,
    ageGroup: null,
    isbn: "978-81-XXXX-010-3"
  },
  {
    id: 11,
    title: "Food, Memory & Identity",
    author: "Rekha Sharma",
    category: "knowledge",
    price: 499,
    originalPrice: 599,
    badge: "Featured",
    emoji: "🍛",
    description: "A cultural journey through Indian food traditions, recipes, and the stories that connect us to what we eat.",
    pages: 328,
    ageGroup: null,
    isbn: "978-81-XXXX-011-0"
  },
  {
    id: 12,
    title: "Climate & the Indian Subcontinent",
    author: "Dr. Rajan Pillai",
    category: "knowledge",
    price: 579,
    originalPrice: null,
    badge: "New",
    emoji: "🌏",
    description: "An authoritative guide to the climate systems, weather patterns, and ecological regions of the Indian subcontinent.",
    pages: 464,
    ageGroup: null,
    isbn: "978-81-XXXX-012-7"
  }
];

// Expose globally
window.BOOKS = BOOKS;
