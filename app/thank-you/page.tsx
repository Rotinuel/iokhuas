// app/thank-you/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ThankYou() {
  const router = useRouter();
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    // 5 second countdown
    const total = 5000;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / total) * 100);
      setProgress(pct);
      if (elapsed >= total) {
        clearInterval(id);
        // fade out could be handled via CSS; navigate back
        router.push("/");
      }
    }, 50);
    return () => clearInterval(id);
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center animate-fadeIn">
        <h2 className="text-2xl font-bold">Thanks — we received your message</h2>
        <p className="mt-3 text-gray-600">A member of our team will contact you shortly.</p>

        <div className="mt-6">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-accent to-primary transition-all"
              style={{ width: `${progress}%`, transition: "width 50ms linear" }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500">Redirecting to home in {Math.ceil((progress / 100) * 5)}s</div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 rounded-2xl border border-gray-200 hover:shadow pulse"
            aria-label="Back to Home"
          >
            Back to Home
          </button>
        </div>

        <style jsx>{`
          .animate-fadeIn {
            animation: fadeIn 400ms ease forwards;
          }
          .pulse {
            animation: pulse 1.6s infinite;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}
