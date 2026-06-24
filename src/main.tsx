import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import App from "./App";
import NotFound from "./pages/NotFound";
import DynamicPage from "./pages/DynamicPage";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import HeroEditor from "./pages/admin/HeroEditor";
import ContentEditor from "./pages/admin/ContentEditor";
import EventsManager from "./pages/admin/EventsManager";
import NewsManager from "./pages/admin/NewsManager";
import PagesManager from "./pages/admin/PagesManager";
import ThemeEditor from "./pages/admin/ThemeEditor";
import AdminSettings from "./pages/admin/Settings";
import { AdminLayout } from "./components/admin/AdminLayout";
import { RequireAdmin } from "./components/admin/RequireAdmin";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./components/ThemeProvider";
import "./styles.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <Toaster richColors position="top-right" />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/p/:slug" element={<DynamicPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminLayout />
                  </RequireAdmin>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="hero" element={<HeroEditor />} />
                <Route path="content" element={<ContentEditor />} />
                <Route path="events" element={<EventsManager />} />
                <Route path="news" element={<NewsManager />} />
                <Route path="pages" element={<PagesManager />} />
                <Route path="theme" element={<ThemeEditor />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
