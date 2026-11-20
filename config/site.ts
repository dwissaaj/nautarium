export const siteConfig = {
  name: "Nautarium",

  description: {
    id: "Ruang kerja digital untuk NLP dan analisis data.",
    en: "A desktop environment for NLP and data analysis.",
  },

  navGroups: [
    {
      id: "home",
      label: {
        id: "Beranda",
        en: "Home",
      },
      icon: "House",
      enabled: true,
      children: [
        {
          label: {
            id: "Blog",
            en: "Blog",
          },
          href: "/blog",
          icon: "BookOpen",
          enabled: true,
        },
        {
          label: {
            id: "Sumber Daya",
            en: "Resource",
          },
          href: "/resource",
          icon: "Library",
          enabled: true,
        },
        {
          label: {
            id: "Tanya AI",
            en: "Ask AI",
          },
          href: "/ask-ai",
          icon: "Sparkles",
          enabled: true,
        },
      ],
    },
    {
      id: "audio",
      label: {
        id: "Audio",
        en: "Audio",
      },
      icon: "AudioLines",
      enabled: true,
      children: [
        {
          label: {
            id: "Transkripsi",
            en: "Transcript",
          },
          href: "/audio/transcript",
          icon: "FileAudio",
          enabled: true,
        },
        {
          label: {
            id: "Analisis",
            en: "Analysis",
          },
          href: "/audio/analysis",
          icon: "ChartLine",
          enabled: true,
        },
        {
          label: {
            id: "Ringkasan",
            en: "Summarization",
          },
          href: "/audio/summarization",
          icon: "AlignLeft",
          enabled: true,
        },
        {
          label: {
            id: "Laporan",
            en: "Report",
          },
          href: "/audio/report",
          icon: "FileChartColumn",
          enabled: true,
        },
      ],
    },
    {
      id: "network",
      label: {
        id: "Jaringan",
        en: "Network",
      },
      icon: "Network",
      enabled: false,
      children: [
        {
          label: {
            id: "Data",
            en: "Data",
          },
          href: "/network/data",
          icon: "Database",
          enabled: false,
        },
        {
          label: {
            id: "Sentralitas",
            en: "Centrality",
          },
          href: "/network/centrality",
          icon: "Waypoints",
          enabled: false,
        },
        {
          label: {
            id: "Graf",
            en: "Graph",
          },
          href: "/network/graph",
          icon: "Workflow",
          enabled: false,
        },
        {
          label: {
            id: "Laporan",
            en: "Report",
          },
          href: "/network/report",
          icon: "FileChartColumn",
          enabled: false,
        },
      ],
    },
    {
      id: "text",
      label: {
        id: "Teks",
        en: "Text",
      },
      icon: "FileText",
      enabled: false,
      children: [
        {
          label: {
            id: "Data",
            en: "Data",
          },
          href: "/text/data",
          icon: "Database",
          enabled: false,
        },
        {
          label: {
            id: "Analisis Sentimen",
            en: "Sentiment Analysis",
          },
          href: "/text/sentiment",
          icon: "MessageSquareText",
          enabled: false,
        },
        {
          label: {
            id: "Pengenalan Entitas (NER)",
            en: "NER",
          },
          href: "/text/ner",
          icon: "Tags",
          enabled: false,
        },
        {
          label: {
            id: "Ekstraksi Kata Kunci",
            en: "Keyword Extraction",
          },
          href: "/text/keywords",
          icon: "KeyRound",
          enabled: false,
        },
        {
          label: {
            id: "Peringkasan",
            en: "Summarization",
          },
          href: "/text/summarization",
          icon: "AlignLeft",
          enabled: false,
        },
        {
          label: {
            id: "Klasifikasi",
            en: "Classification",
          },
          href: "/text/classification",
          icon: "ListChecks",
          enabled: false,
        },
        {
          label: {
            id: "Laporan",
            en: "Report",
          },
          href: "/text/report",
          icon: "FileChartColumn",
          enabled: false,
        },
      ],
    },
    {
      id: "Vision",
      label: {
        id: "Visi Komputer",
        en: "Vision",
      },
      icon: "ImageUp",
      enabled: false,
      children: [
        {
          label: {
            id: "Data",
            en: "Data",
          },
          href: "/image/data",
          icon: "Database",
          enabled: false,
        },
        {
          label: {
            id: "Klasifikasi",
            en: "Classification",
          },
          href: "/image/classification",
          icon: "ScanSearch",
          enabled: false,
        },
        {
          label: {
            id: "Analisis Sentimen",
            en: "Sentiment Analysis",
          },
          href: "/image/sentiment",
          icon: "Brain",
          enabled: false,
        },
        {
          label: {
            id: "Laporan",
            en: "Report",
          },
          href: "/image/report",
          icon: "FileChartColumn",
          enabled: false,
        },
      ],
    },
  ],

  account: {
    settings: {
      label: {
        id: "Pengaturan",
        en: "Settings",
      },
      href: "/settings",
      icon: "Settings",
    },

    profile: {
      name: "User",
      description: {
        id: "Akun",
        en: "Account",
      },
      initials: "U",
    },
  },
};