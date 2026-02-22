
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import { AuthProvider } from './AuthContext';
import Home from './pages/Home';
import ImageToPrompt from './pages/ImageToPrompt';
import Inspiration from './pages/Inspiration';
import Tutorials from './pages/Tutorials';
import Tools from './pages/Tools';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import AffiliateProgram from './pages/AffiliateProgram';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import MagicEnhance from './pages/MagicEnhance';
import AIImageGenerator from './pages/AIImageGenerator';
import Creations from './pages/Creations';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Community from './pages/Community';
import StylePacks from './pages/StylePacks';
import Extension from './pages/Extension';
import Remix from './pages/Remix';
import Upscaler from './pages/Upscaler';
import BackgroundRemover from './pages/BackgroundRemover';
import MagicEraser from './pages/MagicEraser';
import StyleAnalyzer from './pages/StyleAnalyzer';
import ColorPaletteGenerator from './pages/ColorPaletteGenerator';
import LogoGenerator from './pages/LogoGenerator';
import PatternGenerator from './pages/PatternGenerator';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('page-fade-enter-active');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('page-fade-enter');
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('page-fade-enter-active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div className={transitionStage}>
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/image-to-prompt" element={<ImageToPrompt />} />
        <Route path="/inspiration" element={<Inspiration />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/magic-enhance" element={<MagicEnhance />} />
        <Route path="/ai-image-generator" element={<AIImageGenerator />} />
        <Route path="/remix" element={<Remix />} />
        <Route path="/upscaler" element={<Upscaler />} />
        <Route path="/background-remover" element={<BackgroundRemover />} />
        <Route path="/magic-eraser" element={<MagicEraser />} />
        <Route path="/style-analyzer" element={<StyleAnalyzer />} />
        <Route path="/color-palette-generator" element={<ColorPaletteGenerator />} />
        <Route path="/logo-generator" element={<LogoGenerator />} />
        <Route path="/pattern-generator" element={<PatternGenerator />} />
        <Route path="/creations" element={<Creations />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/community" element={<Community />} />
        <Route path="/style-packs" element={<StylePacks />} />
        <Route path="/extension" element={<Extension />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/affiliate-program" element={<AffiliateProgram />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-black text-black dark:text-white">
          <Header />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
