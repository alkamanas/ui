export const AmbientBackground: React.FC = () => (
  <>
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `
          radial-gradient(900px circle at 0% 0%, hsl(var(--primary) / 0.08), transparent 45%),
          radial-gradient(700px circle at 100% 0%, hsl(var(--info) / 0.05), transparent 40%),
          radial-gradient(800px circle at 50% 100%, hsl(var(--primary) / 0.04), transparent 50%)
        `,
      }}
    />
  </>
);

export default AmbientBackground;
