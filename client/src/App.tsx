import { useState } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Language } from "@/lib/i18n";
import Home from "@/pages/home";
import Translator from "@/pages/translator";
import Calculator from "@/pages/calculator";
import Memo from "@/pages/memo";
import Drawing from "@/pages/drawing";
import Chat from "@/pages/chat";
import MathQuiz from "@/pages/math-quiz";
import EnglishQuiz from "@/pages/english-quiz";
import Geography from "@/pages/geography";
import SDGsQuiz from "@/pages/sdgs-quiz";
import NotFound from "@/pages/not-found";

function Router() {
  const [language, setLanguage] = useState<Language>('ja');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} onLanguageChange={setLanguage} />
      <Switch>
        <Route path="/" component={() => <Home language={language} />} />
        <Route path="/translator" component={() => <Translator language={language} />} />
        <Route path="/calculator" component={() => <Calculator language={language} />} />
        <Route path="/memo" component={() => <Memo language={language} />} />
        <Route path="/drawing" component={() => <Drawing language={language} />} />
        <Route path="/chat" component={() => <Chat language={language} />} />
        <Route path="/math-quiz" component={() => <MathQuiz language={language} />} />
        <Route path="/english-quiz" component={() => <EnglishQuiz language={language} />} />
        <Route path="/geography" component={() => <Geography language={language} />} />
        <Route path="/sdgs-quiz" component={() => <SDGsQuiz language={language} />} />
        <Route component={NotFound} />
      </Switch>
      <Footer language={language} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
