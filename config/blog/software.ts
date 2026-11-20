const softwareCategory = {
  id: "software",
  title: {
    id: "Pengembangan Software",
    en: "Software Development",
  },
  description: {
    id: "Catatan seputar pengembangan aplikasi dan teknologi software.",
    en: "Notes about application development and software technologies.",
  },
  articles: [
    {
      id: "building-with-tauri",
      title: {
        id: "Membangun Aplikasi dengan Tauri",
        en: "Building Applications with Tauri",
      },
      description: {
        id: "Mengenal pengembangan aplikasi desktop menggunakan Tauri.",
        en: "An introduction to desktop application development with Tauri.",
      },
      date: "2026-11-01",
      content: {
        id: [
          "Tauri adalah framework untuk membangun aplikasi desktop menggunakan teknologi web sebagai antarmuka dan Rust sebagai backend.",
          "Dengan Tauri, developer dapat memanfaatkan Next.js, React, dan berbagai teknologi frontend lainnya untuk membangun aplikasi desktop yang ringan.",
        ],
        en: [
          "Tauri is a framework for building desktop applications using web technologies for the interface and Rust for the backend.",
          "With Tauri, developers can use Next.js, React, and other frontend technologies to build lightweight desktop applications.",
        ],
      },
    },
    {
      id: "frontend-development",
      title: {
        id: "Dasar Pengembangan Frontend",
        en: "Frontend Development Fundamentals",
      },
      description: {
        id: "Memahami dasar-dasar membangun antarmuka aplikasi web.",
        en: "Understanding the fundamentals of building web application interfaces.",
      },
      date: "2026-10-20",
      content: {
        id: [
          "Frontend development berfokus pada bagian aplikasi yang berinteraksi langsung dengan pengguna.",
          "HTML digunakan untuk struktur, CSS untuk tampilan, dan JavaScript untuk interaktivitas. Framework seperti React membantu mengelola antarmuka yang lebih kompleks.",
        ],
        en: [
          "Frontend development focuses on the parts of an application that users interact with directly.",
          "HTML provides structure, CSS handles presentation, and JavaScript adds interactivity. Frameworks like React help manage more complex interfaces.",
        ],
      },
    },
  ],
};

export default softwareCategory;
