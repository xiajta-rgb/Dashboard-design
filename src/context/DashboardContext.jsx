import { createContext, useContext, useCallback } from 'react'

const DashboardContext = createContext(null)

export function DashboardProvider({ openLayoutLib, children }) {
  const openLayout = useCallback(() => {
    openLayoutLib()
  }, [openLayoutLib])

  return (
    <DashboardContext.Provider value={{ openLayoutLib: openLayout }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) return { openLayoutLib: () => {} }
  return ctx
}
