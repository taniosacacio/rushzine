import { useEffect } from 'react';

export function useIntersectionVideo(selector = 'video[data-lazy]') {
  useEffect(() => {
    const videos = document.querySelectorAll(selector);
    if (!videos.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (video.paused) {
            video.play().catch(e => console.warn('Autoplay prevented:', e));
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      });
    }, {
      rootMargin: '100px 0px', 
      threshold: 0
    });

    videos.forEach(video => observer.observe(video));

    return () => {
      videos.forEach(video => observer.unobserve(video));
      observer.disconnect();
    };
  }, [selector]);
}
