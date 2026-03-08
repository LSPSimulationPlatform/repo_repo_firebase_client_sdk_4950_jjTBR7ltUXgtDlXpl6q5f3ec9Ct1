// Importing React Query components for data fetching and caching
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importing React Router components for routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing pages for routing
import Home from "./pages/Home";

// Create a new React Query client instance
// This is used to manage queries, caching, and background fetching
const queryClient = new QueryClient();

// Defining the main App component
const App = () => (
  // Wrap the entire app with QueryClientProvider to provide React Query context
  <QueryClientProvider client={queryClient}>

    {/* BrowserRouter enables routing using HTML5 history API */}
    <BrowserRouter>

      {/* Routes defines the routing paths and associated components */}
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

// Exporting App component as the default export
export default App;