import React, { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const offsetsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const factor = 25;
    const maxInfluence = 120;
    const sigma = 120;

    const numLines = Math.ceil(canvas.width / factor);
    offsetsRef.current = new Array(numLines).fill(0);

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < numLines; i++) {
        const x = i * factor;

        const dx = x - mouse.current.x;
        const horizontalFactor = Math.exp(-(dx * dx) / (2 * sigma * sigma));
        const targetOffset = (dx > 0 ? 1 : -1) * maxInfluence * horizontalFactor;

        offsetsRef.current[i] += (targetOffset - offsetsRef.current[i]) * 0.1;
        const xDeform = x + offsetsRef.current[i];
        ctx.beginPath();

        for (let y = 0; y < canvas.height; y += 0.5) {
          const dy = y - mouse.current.y;
          const verticalFactor = Math.exp(-(dy * dy) / (2 * sigma * sigma));
          const finalX = x + offsetsRef.current[i] * verticalFactor;


		const alpha = (horizontalFactor + 0.1) / 5;
			ctx.strokeStyle = `rgba(94, 234, 212, ${alpha})`;
		
		if (y === 0) ctx.moveTo(finalX, y);
          else ctx.lineTo(finalX, y);
        }

        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-[-1]
	  	bg-[var(--bg-color)]"
		style={{
			backgroundImage: `radial-gradient(800px circle at ${mouse.current.x}px ${mouse.current.y}px, var(--mouse-gradient), transparent 70%)`,
			width: "100%",
			height: "100%"
		}}
    />
  );
}
