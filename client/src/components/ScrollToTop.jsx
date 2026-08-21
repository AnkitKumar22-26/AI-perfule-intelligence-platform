import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // बिना किसी झटके के पेज को तुरंत टॉप-लेवल पर सेट करता है ताकि नया पेज शुरू से दिखे
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });
  }, [pathname]);

  return null;
}