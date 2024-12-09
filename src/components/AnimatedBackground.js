import React, { useEffect } from 'react';

const AnimatedBackground = ({ variant = 'default' }) => {
  useEffect(() => {
    const canvas = document.getElementById('animated-background');
    const ctx = canvas.getContext('2d');
    
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      constructor() {
        this.reset();
        this.color = this.getRandomColor();
      }

      getRandomColor() {
        const colors = {
          default: [
            '255, 99, 132',   // bright pink
            '54, 162, 235',   // bright blue
            '255, 206, 86',   // bright yellow
            '75, 192, 192',   // bright teal
            '153, 102, 255',  // bright purple
            '255, 159, 64'    // bright orange
          ],
          hero: [
            '255, 255, 255',  // white
            '200, 200, 255',  // light blue
            '255, 200, 200',  // light pink
          ],
          skills: [
            '0, 255, 255',    // cyan
            '255, 0, 255',    // magenta
            '255, 255, 0',    // yellow
            '255, 128, 0',    // orange
            '0, 255, 128',    // spring green
            '128, 0, 255'     // purple
          ]
        };
        const palette = colors[variant] || colors.default;
        return palette[Math.floor(Math.random() * palette.length)];
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 6 + 2;
        this.alpha = Math.random() * 0.8 + 0.4;
        this.originalSize = this.size;
        this.targetSize = this.size;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.04;
        this.pulseSpeed = 0.08 + Math.random() * 0.08;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.angle += this.rotationSpeed;
        const orbitRadius = 0.5;
        this.vx += Math.cos(this.angle) * orbitRadius * 0.01;
        this.vy += Math.sin(this.angle) * orbitRadius * 0.01;

        const pulseFactor = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3 + 1;
        this.targetSize = this.originalSize * pulseFactor;
        this.size += (this.targetSize - this.size) * 0.1;

        this.x += this.vx;
        this.y += this.vy;

        const margin = 50;
        if (this.x < -margin) this.x = canvas.width + margin;
        if (this.x > canvas.width + margin) this.x = -margin;
        if (this.y < -margin) this.y = canvas.height + margin;
        if (this.y > canvas.height + margin) this.y = -margin;

        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;

        const maxSpeed = 2;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }
      }

      draw(ctx, time) {
        const glowSize = this.size * 3;
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, glowSize
        );

        const pulseIntensity = Math.sin(time * 0.002 + this.pulseOffset) * 0.3 + 0.7;
        
        gradient.addColorStop(0, `rgba(${this.color}, ${this.alpha * pulseIntensity})`);
        gradient.addColorStop(0.4, `rgba(${this.color}, ${this.alpha * 0.6 * pulseIntensity})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        const coreGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * pulseIntensity})`);
        coreGradient.addColorStop(0.5, `rgba(${this.color}, ${this.alpha * pulseIntensity})`);
        coreGradient.addColorStop(1, `rgba(${this.color}, ${this.alpha * 0.8 * pulseIntensity})`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 120 }, () => new Particle());
    let time = 0;

    let mouse = { 
      x: null, 
      y: null, 
      radius: 180,
      vx: 0,
      vy: 0
    };
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      
      if (mouse.x !== null) {
        mouse.vx = newX - mouse.x;
        mouse.vy = newY - mouse.y;
      }
      
      mouse.x = newX;
      mouse.y = newY;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
      mouse.vx = 0;
      mouse.vy = 0;
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;
      
      particles.forEach(particle => {
        particle.update(time);
        
        if (mouse.x !== null) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            particle.targetSize = particle.originalSize * 2.5;
            
            const force = (mouse.radius - distance) / mouse.radius;
            const pushX = dx * force * 0.03 + mouse.vx * 0.2;
            const pushY = dy * force * 0.03 + mouse.vy * 0.2;
            particle.vx += pushX;
            particle.vy += pushY;
          } else {
            particle.targetSize = particle.originalSize;
          }
        }
        
        particle.draw(ctx, time);
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const opacity = Math.pow(1 - distance / maxDistance, 1.5) * 0.8;
            const lineWidth = Math.max(4 * (1 - distance / maxDistance), 0.8);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(${p1.color}, ${opacity})`);
            gradient.addColorStop(1, `rgba(${p2.color}, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', null);
      canvas.removeEventListener('mouseleave', null);
    };
  }, [variant]);

  const opacity = variant === 'hero' ? 0.9 : 0.8;  // Increased overall opacity

  return (
    <canvas
      id="animated-background"
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
    />
  );
};

export default AnimatedBackground;
