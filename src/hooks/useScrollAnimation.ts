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

export function useStaggeredScrollAnimation<T extends HTMLElement = HTMLElement>(_itemCount = 0, _baseDelay = 50) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(container)
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const visibleItems = {
    has: (_index: number) => isVisible,
    size: isVisible ? 1 : 0,
  }

  return { containerRef, visibleItems, isVisible }
}