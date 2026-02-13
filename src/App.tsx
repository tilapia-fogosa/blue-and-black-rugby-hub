
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Gallery from "./pages/Gallery";
// import Events from "./pages/Events";
// import History from "./pages/History";
// import Athletes from "./pages/Athletes";
// import Sponsors from "./pages/Sponsors";
// import Shop from "./pages/Shop";
// import Join from "./pages/Join";
import CopaPeVermelho from "./pages/CopaPeVermelho";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AthleteRegistration from "./pages/AthleteRegistration";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default redirect to Copa Pé Vermelho */}
          <Route path="/" element={<Navigate to="/copa-pe-vermelho" replace />} />

          {/* Active Routes */}
          <Route path="/copa-pe-vermelho" element={<CopaPeVermelho />} />
          <Route path="/cadastro-atleta" element={<AthleteRegistration />} />

          {/* Authentication Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* Temporarily Disabled Routes
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="events" element={<Events />} />
            <Route path="history" element={<History />} />
            <Route path="athletes" element={<Athletes />} />
            <Route path="sponsors" element={<Sponsors />} />
            <Route path="shop" element={<Shop />} />
            <Route path="join" element={<Join />} />
          </Route>
          */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
