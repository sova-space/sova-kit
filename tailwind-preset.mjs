const sovaColor = (token) => `var(${token})`

/**
 * Optional Tailwind bridge for Sova apps.
 *
 * Sova Kit still ships semantic CSS classes as the primary API. Use this preset
 * only in product apps that already use Tailwind and want their local utility
 * classes to share the same Sova CSS variables.
 */
export default {
  theme: {
    extend: {
      colors: {
        sova: {
          bg: sovaColor('--sova-bg'),
          surface: sovaColor('--sova-surface'),
          'surface-soft': sovaColor('--sova-surface-soft'),
          border: sovaColor('--sova-border'),
          text: sovaColor('--sova-text'),
          muted: sovaColor('--sova-muted'),
          faint: sovaColor('--sova-faint'),
          accent: sovaColor('--sova-accent'),
          good: sovaColor('--sova-good'),
          warn: sovaColor('--sova-warn'),
          bad: sovaColor('--sova-bad'),
        },
      },
      borderRadius: {
        'sova-sm': sovaColor('--sova-radius-sm'),
        'sova-md': sovaColor('--sova-radius-md'),
        'sova-lg': sovaColor('--sova-radius-lg'),
      },
      boxShadow: {
        'sova-sm': sovaColor('--sova-shadow-sm'),
        'sova-md': sovaColor('--sova-shadow-md'),
        'sova-soft': sovaColor('--sova-shadow-soft'),
      },
      fontFamily: {
        sova: sovaColor('--sova-font-sans'),
        'sova-display': sovaColor('--sova-font-display'),
        'sova-mono': sovaColor('--sova-font-mono'),
      },
    },
  },
}
