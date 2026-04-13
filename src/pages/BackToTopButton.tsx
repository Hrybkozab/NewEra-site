import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-6 bottom-6 z-50 inline-flex items-center gap-2 rounded-full border border-[#00ff87]/30 bg-black/90 px-5 py-3 text-sm font-black text-[#00ff87] shadow-lg shadow-black/40 backdrop-blur-md transition-all hover:scale-105 hover:bg-[#00ff87] hover:text-black"
      aria-label="Back to top">
      <ChevronUp size={16} />
      Back to top
    </button>
  );
}
