import { Switch, Route } from 'wouter';
import { useEffect } from 'react';
import { useLocation } from 'wouter';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';

import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductPage from './pages/ProductPage';
import LookbookPage from './pages/LookbookPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAFAF8' }}>
      <ScrollToTop />
      <Header />
      <CartDrawer />
      <div className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/collections" component={CollectionPage} />
          <Route path="/collections/:handle" component={CollectionPage} />
          <Route path="/products/:handle" component={ProductPage} />
          <Route path="/lookbook" component={LookbookPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/contact" component={ContactPage} />
          <Route>
            <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4 text-center px-6">
              <p className="font-display text-6xl font-light text-[#1A1A18]">404</p>
              <p className="font-display text-2xl font-light text-[#8A8A82]">Page not found</p>
              <a href="/" className="btn-dark mt-4 inline-block px-8 py-3">GO HOME</a>
            </div>
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
