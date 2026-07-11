import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function PageBanner() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // 1. Check karein ke kya yeh Product page hai? (URL mein /product/ ya /productsdetail ho)
  const isProductPage = pathnames[0] === 'product' || pathnames[0] === 'products' || location.pathname === '/productsdetail';

  // 2. Agar Home Page ya Product page hai, toh yeh banner bilkul hide kar do (kuch return na karo)
  if (location.pathname === '/' || isProductPage) {
    return null;
  }
  if (location.pathname === '/admin') {
    return null;    
  }
  if (location.pathname.startsWith('/shop')) {
    return null;
  }

  // 3. Page ka Title dynamically banayein (e.g., 'contact-us' ban jayega 'Contact Us')
  const pageTitle = pathnames.length > 0 
    ? pathnames[pathnames.length - 1].replace(/-/g, ' ')
    : '';

  return (
    <div className="bg-[#f8f8f8] py-10 border-b border-gray-200 relative overflow-hidden">
      
      {/* Subtle Premium Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center relative z-10">
        
        {/* Left Side: Premium Page Name */}
        <div className="flex items-center gap-4 mb-5 md:mb-0">
          {/* Decorative Red Accent */}
          <div className="h-12 w-1.5 bg-red-600 rounded-full"></div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111111] uppercase tracking-wider">
              {pageTitle}
            </h1>
            {/* Premium Subtitle */}
            <p className="text-[10px] sm:text-xs text-gray-500 tracking-[0.2em] uppercase mt-1 font-semibold">
              Zarvix Digital
            </p>
          </div>
        </div>
        
        {/* Right Side: Breadcrumbs (Path) */}
        <div className="text-sm text-gray-500 font-medium flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

            return (
              <React.Fragment key={name}>
                <span className="mx-2 text-gray-300">/</span>
                {isLast ? (
                  <span className="text-red-600 font-bold">{displayName}</span>
                ) : (
                  <Link to={routeTo} className="hover:text-[#111111] transition-colors">
                    {displayName}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default PageBanner;