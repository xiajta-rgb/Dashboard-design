import { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [accentColor, setAccentColor] = useState('violet')

  const themes = {
    dark: {
      name: '深色主题',
      background: '#09090b',
      surface: '#0c0c0e',
      card: '#141417',
      border: 'rgba(255,255,255,0.06)',
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255,255,255,0.7)',
        muted: 'rgba(255,255,255,0.5)',
      },
    },
    light: {
      name: '浅色主题',
      background: '#ffffff',
      surface: '#f9fafb',
      card: '#ffffff',
      border: 'rgba(0,0,0,0.06)',
      text: {
        primary: '#111827',
        secondary: 'rgba(17,24,39,0.7)',
        muted: 'rgba(17,24,39,0.5)',
      },
    },
    blue: {
      name: '蓝色主题',
      accent: '#3b82f6',
      background: '#0c1929',
      surface: '#1e3a5f',
      card: '#1e40af',
    },
    emerald: {
      name: '翡翠主题',
      accent: '#10b981',
      background: '#022c22',
      surface: '#064e3b',
      card: '#047857',
    },
  }

  const accentColors = {
    violet: { name: '紫罗兰', value: '#8b5cf6', gradient: 'from-violet-500 to-purple-500' },
    blue: { name: '天空蓝', value: '#3b82f6', gradient: 'from-blue-500 to-cyan-500' },
    emerald: { name: '翡翠绿', value: '#10b981', gradient: 'from-emerald-500 to-teal-500' },
    amber: { name: '琥珀色', value: '#f59e0b', gradient: 'from-amber-500 to-orange-500' },
    rose: { name: '玫瑰粉', value: '#f43f5e', gradient: 'from-rose-500 to-pink-500' },
    cyan: { name: '青色', value: '#06b6d4', gradient: 'from-cyan-500 to-sky-500' },
  }

  const value = {
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    themes,
    accentColors,
    currentAccent: accentColors[accentColor],
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
