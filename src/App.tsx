
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import Students from "./pages/Students";
import StudentProfile from "./pages/StudentProfile";
import ReportForm from "./pages/ReportForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/classes/:id" element={<ClassDetail />} />
            <Route path="/eleves" element={<Students />} />
            <Route path="/eleves/:id" element={<StudentProfile />} />
            <Route path="/signalements" element={<ReportForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
