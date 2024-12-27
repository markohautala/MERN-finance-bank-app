import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '@/state/api';  // import the api object called api.ts

// Configuring the Redux store
export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },  // Add the API reducer to the store
  middleware: (getDefault) => getDefault().concat(api.middleware),  // Adding the middleware for API handling
});

// Setting up listeners for API calls
setupListeners(store.dispatch);

// Rendering the application
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>  {/* Provide the Redux store to the app */}
    <App />  {/* The main App component */}
  </Provider>,
)
