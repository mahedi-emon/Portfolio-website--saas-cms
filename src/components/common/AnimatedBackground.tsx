import { useEffect, useRef } from 'react';
import { ParticleNetwork } from './ParticleNetwork';

interface AnimatedBackgroundProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function AnimatedBackground({ variant = 'dark', className = '' }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const isDark = variant === 'dark';

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f1a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 25%, #e0e7ff 50%, #eef2ff 75%, #f8fafc 100%)',
      }}
    >
      {/* Deep gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
        }}
      />

      {/* Animated nebula glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[800px] h-[800px] -top-40 -left-40 rounded-full animate-nebula-1"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] top-1/3 -right-20 rounded-full animate-nebula-2"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] -bottom-20 left-1/4 rounded-full animate-nebula-3"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* Particle Network Canvas */}
      <ParticleNetwork
        particleCount={isDark ? 70 : 50}
        connectionDistance={isDark ? 140 : 120}
        particleColor={isDark ? '147, 130, 255' : '99, 102, 241'}
        lineColor={isDark ? '99, 102, 241' : '139, 92, 246'}
        speed={0.25}
      />

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)'
            : 'radial-gradient(ellipse at center, transparent 50%, rgba(255, 255, 255, 0.6) 100%)',
        }}
      />

      {/* Noise texture for premium feel */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
