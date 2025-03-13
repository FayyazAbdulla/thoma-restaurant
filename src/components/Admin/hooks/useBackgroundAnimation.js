import { useEffect } from "react";

const useBackgroundAnimation = (selector, colors, duration = 10000) => {
  useEffect(() => {
    const background = document.querySelector(selector);
    if (!background) return;

    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min((progress / duration) * 100, 100);

      background.style.backgroundPosition = `${percentage}% 50%`;

      if (percentage < 100) {
        requestAnimationFrame(animate);
      } else {
        start = null;
        background.style.backgroundPosition = "0% 50%";
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [selector, colors, duration]);
};

export default useBackgroundAnimation;