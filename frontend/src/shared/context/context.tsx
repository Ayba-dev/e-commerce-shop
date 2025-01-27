import React, { createContext } from 'react'


type IContext = {
  theme: 'dark' | 'light',
  toggleTheme: () => void,

}
export const CustomContext = createContext<IContext>({
  theme: 'dark',
  toggleTheme: () => null,
})
export const ContextProvider = ({ children }: { children: React.ReactNode }) => {

  const storedTheme = localStorage.getItem('theme')
  const currentTheme = storedTheme ? storedTheme as 'dark' | 'light' : 'light'
  const [theme, setTheme] = React.useState<'dark' | 'light'>(currentTheme)


  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem('theme', newTheme)

      return newTheme
    })
  }


  return (
    <CustomContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background`}>
        {children}
      </main>
    </CustomContext.Provider>
  )
}