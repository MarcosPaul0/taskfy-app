export const BUTTON_VARIANT = {
  filled: `
    bg-emerald-500 border-emerald-500 text-gray-50
    hover:bg-emerald-400 hover:border-emerald-400
  `,
  filledDanger: `
    bg-red-500 border-red-500 text-gray-50
    hover:bg-red-400 hover:border-red-400
  `,
  outlined: `
    text-emerald-500 border-emerald-500
    hover:bg-emerald-500 hover:text-gray-50
  `,
  outlinedDanger: `
    text-red-500 border-red-500
    hover:bg-red-500 hover:text-gray-50
  `,
} as const;
