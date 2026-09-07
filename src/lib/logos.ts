const logoFiles = import.meta.glob('/LOGO/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const sorted = Object.entries(logoFiles).sort(([a], [b]) => a.localeCompare(b))

export const logoDark = sorted[0]?.[1] ?? ''
export const logoGhost = sorted[1]?.[1] ?? ''
