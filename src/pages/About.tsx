
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";

const About = () => {
  return (
    <main className="relative min-h-screen">
      {/* Background Slideshow */}
      <Slideshow />
      
      {/* Navbar */}
      <Navbar />
      
      <section className="container relative min-h-screen pt-28 pb-16">
        <div className="bg-background/60 backdrop-blur-md rounded-lg shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-6">About Tallawarra</h1>
          
          <div className="space-y-6">
            <p>
              Tallawarra is a premium residential subdivision located in the heart of natural beauty, 
              offering a perfect balance between modern living and serene environment.
            </p>
            
            <p>
              Our vision is to create a sustainable community where residents can enjoy the best 
              of both worlds - the convenience of urban living with the tranquility of nature.
            </p>
            
            <p>
              Founded in 2020, Tallawarra has quickly become one of the most sought-after residential 
              areas with its thoughtfully designed spaces and community-focused amenities.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              To develop sustainable, well-connected communities that enhance the quality of life 
              for our residents while preserving the natural environment.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
