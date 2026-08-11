import { useEffect, useRef, useState } from "react"

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(threshold = 0.1, rootMargin = "0px") {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref: elementRef, isVisible }
}

export function useStaggeredScrollAnimation<T extends HTMLElement = HTMLElement>(itemCount: number, baseDelay = 100) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, i]))
            }, i * baseDelay)
          }
          observer.unobserve(container)
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [itemCount, baseDelay])

  return { containerRef, visibleItems }
}