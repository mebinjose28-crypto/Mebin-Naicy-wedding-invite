import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

import { wedding } from '@/config/wedding'

const PREF_KEY = 'naicy-mebin:music'
const TIME_KEY = 'naicy-mebin:music-time'

type MusicState = {
  /** False when no track is configured or the file failed to load. */
  available: boolean
  playing: boolean
  /** Called from the "Open Invitation" tap — respects a guest's earlier "off" choice. */
  start: () => void
  toggle: () => void
}

const MusicContext = createContext<MusicState>({
  available: false,
  playing: false,
  start: () => {},
  toggle: () => {},
})

export const useMusic = () => useContext(MusicContext)

function readPref() {
  try {
    return localStorage.getItem(PREF_KEY)
  } catch {
    return null
  }
}

function writePref(value: 'on' | 'off') {
  try {
    localStorage.setItem(PREF_KEY, value)
  } catch {
    /* storage unavailable (private mode) — preference just isn't kept */
  }
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const { src, volume } = wedding.music
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const resumeOnReturn = useRef(false)
  const fadeTimer = useRef<number | undefined>(undefined)
  const [available, setAvailable] = useState(Boolean(src))
  const [playing, setPlaying] = useState(false)

  // One audio element for the life of the page, so scrolling never restarts it.
  useEffect(() => {
    if (!src) return
    const audio = new Audio()
    audio.src = src
    audio.loop = true
    audio.preload = 'none'
    audio.volume = volume
    audioRef.current = audio

    const onPlay = () => setPlaying(true)
    const onPause = () => {
      setPlaying(false)
      try {
        sessionStorage.setItem(TIME_KEY, String(audio.currentTime))
      } catch {
        /* ignore */
      }
    }
    const onError = () => {
      setAvailable(false)
      setPlaying(false)
    }
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)

    const onVisibility = () => {
      if (document.hidden) {
        resumeOnReturn.current = !audio.paused
        audio.pause()
      } else if (resumeOnReturn.current) {
        resumeOnReturn.current = false
        audio.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      audio.pause()
      audioRef.current = null
    }
  }, [src, volume])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    try {
      const saved = Number(sessionStorage.getItem(TIME_KEY))
      if (saved > 0 && audio.currentTime === 0) audio.currentTime = saved
    } catch {
      /* ignore */
    }
    // Gentle fade-in. iOS ignores programmatic volume, which is fine.
    window.clearInterval(fadeTimer.current)
    audio.volume = 0
    let step = 0
    fadeTimer.current = window.setInterval(() => {
      step += 1
      audio.volume = Math.min(volume, (volume * step) / 20)
      if (step >= 20) window.clearInterval(fadeTimer.current)
    }, 100)
    audio.play().catch(() => {
      window.clearInterval(fadeTimer.current)
      audio.volume = volume
      setPlaying(false)
    })
  }, [volume])

  const start = useCallback(() => {
    if (readPref() === 'off') return
    play()
  }, [play])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      writePref('on')
      play()
    } else {
      writePref('off')
      window.clearInterval(fadeTimer.current)
      audio.pause()
    }
  }, [play])

  return (
    <MusicContext.Provider value={{ available, playing, start, toggle }}>
      {children}
    </MusicContext.Provider>
  )
}
