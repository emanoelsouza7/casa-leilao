import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Search from "./pages/Search.tsx";
import PropertyDetail from "./pages/PropertyDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import Admin from "./pages/Admin.tsx";
import AdminPropertyForm from "./pages/AdminPropertyForm.tsx";
import QuemSomos from "./pages/QuemSomos.tsx";
import Blog from "./pages/Blog.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/encontre-seu-imovel" element={<Search />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/imovel/:id" element={<PropertyDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/novo" element={<AdminPropertyForm />} />
          <Route path="/admin/editar/:id" element={<AdminPropertyForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
