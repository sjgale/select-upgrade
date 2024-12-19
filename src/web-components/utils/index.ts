import { type Option } from '../types'

export function getPrevIndex(
  currentIndex: number | null,
  options: Option[]
): number {
  if (currentIndex === null) {
    return options.length - 1
  }
  if (currentIndex === 0) {
    return currentIndex
  }
  return currentIndex - 1
}

export function getNextIndex(
  currentIndex: number | null,
  options: Option[]
): number {
  if (currentIndex === null) {
    return 0
  }
  if (currentIndex === options.length - 1) {
    return currentIndex
  }
  return currentIndex + 1
}

export function hasPreselect(preselectIndex: number | null): boolean {
  return typeof preselectIndex === 'number' && preselectIndex > -1
}

export function getRandomNumber(): number {
  return window.crypto.getRandomValues(new Uint32Array(1))[0] as number
}
