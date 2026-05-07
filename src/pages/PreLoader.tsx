import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./PreLoader.css";

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader = ({ onComplete }: PreLoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const loader1Ref = useRef<HTMLDivElement>(null);
  const loader2Ref = useRef<HTMLDivElement>(null);
  const counter1Ref = useRef<HTMLDivElement>(null);
  const counter2Ref = useRef<HTMLDivElement>(null);
  const counter3Ref = useRef<HTMLDivElement>(null);
  const loadingScreenRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const counter3 = counter3Ref.current;
    if (!counter3) return;

    // Dynamically add rolling digit elements to counter-3
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = String(j);
        counter3.appendChild(div);
      }
    }
    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    const animate = (counter: HTMLElement, duration: number, delay = 0) => {
      const numHeight = (counter.querySelector(".num") as HTMLElement)?.clientHeight || 100;
      const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;
      gsap.to(counter, {
        y: -totalDistance,
        duration,
        delay,
        ease: "power2.inOut",
      });
    };

    // Counter rolling
    animate(counter3Ref.current!, 2.5);
    animate(counter2Ref.current!, 3);
    animate(counter1Ref.current!, 1, 2);

    // Digits fly off top
    gsap.to(".pl-digit", {
      top: "-150px",
      stagger: { amount: 0.25 },
      delay: 3,
      duration: 0.5,
      ease: "power4.inOut",
    });

    // Loader bars grow from zero
    gsap.from(loader1Ref.current, { width: 0, duration: 0.9, ease: "power2.inOut" });
    gsap.from(loader2Ref.current, { width: 0, delay: 0.9, duration: 0.9, ease: "power2.inOut" });

    // 60% mark: background removed
    gsap.to(loaderRef.current, { background: "none", delay: 1.8, duration: 0.1 });

    // Morph to V
    gsap.to(loader1Ref.current, {
      left: 90, top: -50, width: 50, height: 150, skewX: 25,
      duration: 0.5, delay: 1.8, ease: "power2.inOut",
    });
    gsap.to(loader2Ref.current, {
      left: 160, top: -50, width: 50, height: 150, skewX: -25,
      duration: 0.5, delay: 1.8, ease: "power2.inOut",
    });

    // Morph to L
    gsap.to(loader1Ref.current, {
      left: 100, top: -50, width: 50, height: 150, skewX: 0,
      duration: 0.5, delay: 3.0, ease: "power2.inOut",
    });
    gsap.to(loader2Ref.current, {
      left: 100, top: 50, width: 100, height: 50, skewX: 0,
      duration: 0.5, delay: 3.0, ease: "power2.inOut",
    });

    // Zoom and fly off
    gsap.to(loaderRef.current, {
      scale: 40, duration: 1, delay: 4.0, ease: "power2.inOut",
    });
    gsap.to(loaderRef.current, {
      rotate: 45, y: 500, x: 2000, duration: 1, delay: 4.0, ease: "power2.inOut",
    });

    // Fade out entire loading screen
    gsap.to(loadingScreenRef.current, {
      opacity: 0, duration: 0.5, delay: 4.5, ease: "power1.inOut",
      onComplete: () => {
        onComplete();
      },
    });
  }, [onComplete]);

  return (
    <div className="pl-loading-screen" ref={loadingScreenRef}>
      <div className="pl-loader" ref={loaderRef}>
        <div className="pl-loader-1 pl-bar" ref={loader1Ref} />
        <div className="pl-loader-2 pl-bar" ref={loader2Ref} />
      </div>

      <div className="pl-counter">
        <div className="pl-counter-1 pl-digit" ref={counter1Ref}>
          <div className="num">0</div>
          <div className="num pl-num1offset1">1</div>
        </div>
        <div className="pl-counter-2 pl-digit" ref={counter2Ref}>
          <div className="num">0</div>
          <div className="num pl-num1offset2">1</div>
          <div className="num">2</div>
          <div className="num">3</div>
          <div className="num">4</div>
          <div className="num">5</div>
          <div className="num">6</div>
          <div className="num">7</div>
          <div className="num">8</div>
          <div className="num">9</div>
          <div className="num">0</div>
        </div>
        <div className="pl-counter-3 pl-digit" ref={counter3Ref}>
          <div className="num">0</div>
          <div className="num">1</div>
          <div className="num">2</div>
          <div className="num">3</div>
          <div className="num">4</div>
          <div className="num">5</div>
          <div className="num">6</div>
          <div className="num">7</div>
          <div className="num">8</div>
          <div className="num">9</div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
