import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import './styles/index.css'
import { Provider } from 'react-redux'
import { store } from './shared/store/store'
import { ContextProvider } from './shared/context/context'


const root = createRoot(document.getElementById('app'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
)