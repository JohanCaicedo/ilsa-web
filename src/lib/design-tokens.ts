/**
 * Design Token Configuration
 *
 * This file defines all design tokens used in the ILSA Web project.
 * Tokens are defined in global.css and can be referenced in TypeScript/JS.
 *
 * Usage pattern in CSS:
 *   /* design-token: #4e7cce *\/
 *   color: var(--ilsa-blue);
 *
 * Allowed inline patterns (exceptions):
 *   - Tailwind arbitrary values: bg-[#4e7cce], text-[13px]
 *   - Dynamic values: calc(), var(), theme()
 *   - Utility classes: p-4, m-2, etc.
 */

/**
 * ILSA Brand Colors
 * Primary colors used throughout the application
 */
export const brandColors = {
  ilsaBlue: "var(--ilsa-blue)",
  ilsaBlueLight: "var(--ilsa-blue-light)",
  ilsaBlueDark: "var(--ilsa-blue-dark)",
  ilsaTextDark: "var(--ilsa-text-dark)",
  ilsaTextGray: "var(--ilsa-text-gray)",
  ilsaBgLight: "var(--ilsa-bg-light)",
  ilsaMujeres: "var(--ilsa-mujeres)",
  ilsaMujeresLight: "var(--ilsa-mujeres-light)",
} as const;

/**
 * Glass System Tokens
 * For the Liquid Glass design pattern
 */
export const glassTokens = {
  surface: "var(--glass-surface)",
  border: "var(--glass-border)",
  highlight: "var(--glass-highlight)",
  shadow: "var(--glass-shadow)",
} as const;

/**
 * Theme Colors
 * Light and dark mode colors
 */
export const themeColors = {
  background: "var(--background)",
  foreground: "var(--foreground)",
  card: "var(--card)",
  cardForeground: "var(--card-foreground)",
  popover: "var(--popover)",
  popoverForeground: "var(--popover-foreground)",
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",
  secondary: "var(--secondary)",
  secondaryForeground: "var(--secondary-foreground)",
  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",
  accent: "var(--accent)",
  accentForeground: "var(--accent-foreground)",
  destructive: "var(--destructive)",
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
} as const;

/**
 * Chart Colors
 * For data visualization
 */
export const chartColors = {
  chart1: "var(--chart-1)",
  chart2: "var(--chart-2)",
  chart3: "var(--chart-3)",
  chart4: "var(--chart-4)",
  chart5: "var(--chart-5)",
} as const;

/**
 * Border Radius Tokens
 */
export const radiusTokens = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  "3xl": "var(--radius-3xl)",
  "4xl": "var(--radius-4xl)",
} as const;

/**
 * Hex color values for reference
 * These should NOT be used directly in CSS - use CSS variables instead
 */
export const hexColors = {
  ilsaBlue: "#224395",
  ilsaBlueLight: "#adbee0",
  ilsaBlueDark: "#375a9e",
  ilsaTextDark: "#111827",
  ilsaTextGray: "#4b5563",
  ilsaBgLight: "#f3f4f6",
  ilsaMujeres: "#274067",
  ilsaMujeresLight: "#af9cb5",
} as const;

/**
 * Check if a color value is a valid design token
 */
export function isValidDesignToken(color: string): boolean {
  return color.startsWith("var(--") ||
         color.startsWith("oklch(") ||
         color.startsWith("rgb(") ||
         color.startsWith("rgba(");
}

/**
 * Validate that a style object only uses design tokens
 */
export function validateStyleTokens(style: Record<string, string>): string[] {
  const invalidTokens: string[] = [];

  for (const [key, value] of Object.entries(style)) {
    if (!isValidDesignToken(value)) {
      invalidTokens.push(`${key}: ${value}`);
    }
  }

  return invalidTokens;
}

export default {
  brandColors,
  glassTokens,
  themeColors,
  chartColors,
  radiusTokens,
  hexColors,
  isValidDesignToken,
  validateStyleTokens,
};
