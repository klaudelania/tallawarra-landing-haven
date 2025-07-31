
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroContent = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="max-w-3xl space-y-4 sm:space-y-6 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        variants={itemVariants}
      >
        Welcome to Tallawarra Point
      </motion.h1>

      <motion.p 
        className="text-base sm:text-lg md:text-xl opacity-90 leading-relaxed"
        variants={itemVariants}
      >
        A premier residential subdivision offering luxury living in a pristine natural setting. Experience the perfect blend of modern comfort and natural beauty.
      </motion.p>

      <motion.div variants={itemVariants}>
        <Button asChild className="glass-morphism text-white font-medium px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl">
          <Link to="/faq">
            Frequently Asked Questions
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
