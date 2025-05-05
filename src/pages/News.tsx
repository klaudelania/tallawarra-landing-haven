
import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";

const News = () => {
  const [showNews, setShowNews] = useState(true);
  
  const newsArticles = [
    {
      id: 1,
      title: "New Community Center Opening Soon",
      date: "May 1, 2025",
      summary: "The much-awaited community center at Tallawarra will be opening its doors next month, offering residents access to state-of-the-art facilities."
    },
    {
      id: 2,
      title: "Phase 2 Development Approved",
      date: "April 15, 2025",
      summary: "We're excited to announce that the council has approved plans for Phase 2 of our development, adding 50 more premium homes to the Tallawarra community."
    },
    {
      id: 3,
      title: "Sustainability Award Recognition",
      date: "March 28, 2025",
      summary: "Tallawarra has been recognized with a Regional Sustainability Award for its eco-friendly design and conservation efforts."
    }
  ];

  return (
    <main className="relative min-h-screen">
      <Slideshow />
      <Navbar />
      
      <section className="container relative min-h-screen pt-28 pb-16">
        {showNews && (
          <div className="glass-morphism rounded-lg p-8 text-white relative">
            <button 
              onClick={() => setShowNews(false)}
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
    </main>
  );
};

export default News;
