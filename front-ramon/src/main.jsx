import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { PedidosProvider } from './context/PedidosProvider'
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PedidosProvider>
      <RouterProvider router={router} />
    </PedidosProvider>
  </React.StrictMode>,
)
