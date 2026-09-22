/** `?debugWorld=1` in the URL enables the lightweight on-screen debug overlay. */
export function useDebugFlag(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('debugWorld') === '1'
}
