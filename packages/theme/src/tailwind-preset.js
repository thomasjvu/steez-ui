export default {
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--color-accent-primary)",
          hover: "var(--color-accent-hover)",
          muted: "var(--color-accent-muted)",
          dark: "var(--color-accent-dark)",
        },
        background: "var(--color-bg-primary)",
        foreground: "var(--color-text-primary)",
        border: {
          DEFAULT: "var(--color-border-default)",
          hover: "var(--color-border-hover)",
          focus: "var(--color-border-focus)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        info: "var(--info)",
      },
      fontFamily: {
        sans: ["var(--font-primary)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
    },
  },
};

