export const currentTime = () => {
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  const ss = String(now.getSeconds()).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const m = String(now.getMonth() + 1).padStart(2, '0') // Month is zero-based
  const y = now.getFullYear()

  const formattedDate = `${hh}:${mm}:${ss}/${d}:${m}:${y}`
  return formattedDate
}
