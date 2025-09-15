import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const News = () => {
  const [showNews, setShowNews] = useState(true);
  const navigate = useNavigate();
  
  const newsArticles = [
    {
      id: 101,
      title: "Stage 1 DA Lodged",
      date: "12 June 2025",
      summary: "The much awaited Stage 1 DA application has been formally accepted by WCC. We look forward to exhibition period and are ready to start work on site following the determination."
    },
    {
      id: 2,
      title: "Bridgehill Recognised By International Property Awards",
      date: "March 28, 2025",
      summary: (
        <>
          Every year since 2015 Bridgehill has been recognised Internationally with multiple category awards. Our projects provide exceptionally design dwellings to our future homeowners. Our goal in Tallawarra is to continue this humble tradition. For more visit:{" "}
          <a 
            href="https://www.bridgehill.com.au/news-media/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 underline transition-colors"
          >
            https://www.bridgehill.com.au/news-media/
          </a>
        </>
      )
    }
  ];

  const handleClose = () => {
    // Navigate to home page instead of just hiding the news
    navigate('/', { replace: true });
  };

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background Slideshow moved to App.tsx */}
      <Navbar />
      
      <section className="container relative flex-1 pt-28 pb-8">
        {showNews && (
          <div className="glass-morphism rounded-lg p-8 text-white relative">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Close news"
            >
              <X size={24} />
            </button>
            
            <h1 className="text-4xl font-bold mb-8">Latest News</h1>
            
            <div className="space-y-8">
              {newsArticles.map(article => (
                <div key={article.id} className="glass-morphism rounded-lg p-6 mb-6 last:mb-0">
                  <h2 className="text-2xl font-semibold">{article.title}</h2>
                  <p className="text-sm text-white/70 mt-1">{article.date}</p>
                  <p className="mt-3">{article.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default News;
