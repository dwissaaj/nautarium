import nlpCategory from "./nlp";
import softwareCategory from "./software";

export const blogConfig = {
  heading: {
    id: "Blog",
    en: "Blog",
  },

  description: {
    id: "Kumpulan tulisan, catatan, dan eksplorasi seputar teknologi, data, dan kreativitas.",
    en: "A collection of articles, notes, and explorations about technology, data, and creativity.",
  },

  collection: {
    id: "Koleksi Saya",
    en: "My Collection",
  },

  openFolder: {
    id: "Buka folder",
    en: "Open folder",
  },

  closeFolder: {
    id: "Tutup folder",
    en: "Close folder",
  },

  articles: {
    id: "Artikel",
    en: "Articles",
  },

  empty: {
    id: "Belum ada artikel dalam kategori ini.",
    en: "There are no articles in this category yet.",
  },

  categories: [
    nlpCategory,
    softwareCategory,
  ],
};
