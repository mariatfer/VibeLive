export function formatViewerCount(count?: number | null): string {
  if (typeof count !== 'number' || isNaN(count)) {
    return '0'
  }

  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1) + 'M'
  } else if (count >= 1_000) {
    return (count / 1_000).toFixed(1) + 'K'
  }
  return count.toString()
}

export function formatStreamDuration(
  startedAt?: string,
  now: number = Date.now(),
): string {
  if (!startedAt) return '00:00:00'
  const start = new Date(startedAt)
  if (isNaN(start.getTime())) return '00:00:00'

  const diff = now - start.getTime()
  const totalSeconds = Math.floor(diff / 1000)

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}
