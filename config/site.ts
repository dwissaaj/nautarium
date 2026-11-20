export const siteConfig = {
  name: "Nautarium",
  description: "A desktop environment for NLP and data analysis.",

  navGroups: [
    {
      id: "home",
      label: "Home",
      icon: "House",
      enabled: true,
      children: [
        {
          label: "Blog",
          href: "/blog",
          icon: "BookOpen",
          enabled: true,
        },
        {
          label: "Resource",
          href: "/resource",
          icon: "Library",
          enabled: true,
        },
        {
          label: "Ask AI",
          href: "/ask-ai",
          icon: "Sparkles",
          enabled: true,
        },
      ],
    },

    {
      id: "audio",
      label: "Audio",
      icon: "AudioLines",
      enabled: true,
      children: [
        {
          label: "Transcript",
          href: "/audio/transcript",
          icon: "FileAudio",
          enabled: true,
        },
        {
          label: "Analysis",
          href: "/audio/analysis",
          icon: "ChartLine",
          enabled: true,
        },
        {
          label: "Summarization",
          href: "/audio/summarization",
          icon: "AlignLeft",
          enabled: true,
        },
        {
          label: "Report",
          href: "/audio/report",
          icon: "FileChartColumn",
          enabled: true,
        },
      ],
    },

    {
      id: "network",
      label: "Network",
      icon: "Network",
      enabled: false,
      children: [
        {
          label: "Data",
          href: "/network/data",
          icon: "Database",
          enabled: false,
        },
        {
          label: "Centrality",
          href: "/network/centrality",
          icon: "Waypoints",
          enabled: false,
        },
        {
          label: "Graph",
          href: "/network/graph",
          icon: "Workflow",
          enabled: false,
        },
        {
          label: "Report",
          href: "/network/report",
          icon: "FileChartColumn",
          enabled: false,
        },
      ],
    },

    {
      id: "text",
      label: "Text",
      icon: "FileText",
      enabled: false,
      children: [
        {
          label: "Data",
          href: "/text/data",
          icon: "Database",
          enabled: false,
        },
        {
          label: "Sentiment Analysis",
          href: "/text/sentiment",
          icon: "MessageSquareText",
          enabled: false,
        },
        {
          label: "NER",
          href: "/text/ner",
          icon: "Tags",
          enabled: false,
        },
        {
          label: "Keyword Extraction",
          href: "/text/keywords",
          icon: "KeyRound",
          enabled: false,
        },
        {
          label: "Summarization",
          href: "/text/summarization",
          icon: "AlignLeft",
          enabled: false,
        },
        {
          label: "Classification",
          href: "/text/classification",
          icon: "ListChecks",
          enabled: false,
        },
        {
          label: "Report",
          href: "/text/report",
          icon: "FileChartColumn",
          enabled: false,
        },
      ],
    },

    {
      id: "image",
      label: "Image",
      icon: "Image",
      enabled: false,
      children: [
        {
          label: "Data",
          href: "/image/data",
          icon: "Database",
          enabled: false,
        },
        {
          label: "Classification",
          href: "/image/classification",
          icon: "ScanSearch",
          enabled: false,
        },
        {
          label: "Sentiment Analysis",
          href: "/image/sentiment",
          icon: "Brain",
          enabled: false,
        },
        {
          label: "Report",
          href: "/image/report",
          icon: "FileChartColumn",
          enabled: false,
        },
      ],
    },
  ],

  account: {
    settings: {
      label: "Settings",
      href: "/settings",
      icon: "Settings",
    },

    profile: {
      name: "User",
      description: "Account",
      initials: "U",
    },
  },
};