"use client";
import Link from "next/link";
import { ArrowRight, Clock, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    /* 1. Added flex and flex-col to ensure the container can distribute space */
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      {/* 2. Wrap the top content in a div that grows (flex-grow) */}
      <main className="grow">
        {/* Hero Section */}
        <header className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Master Your Time. <br />
            <span className="text-blue-500">Achieve Your Goals.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10">
            The ultimate goal tracker with real-time countdown. Do not let the
            days pass by — make every second count.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-blue-600 rounded-xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 group"
            >
              Start Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </header>

        {/* Features Section - 3. Changed grid to flex with justify-center */}
        <section className="max-w-6xl mx-auto px-6 py-20 flex flex-wrap justify-center gap-8">
          <FeatureCard
            icon={<Clock className="text-blue-500" size={32} />}
            title="Real-time Countdown"
            description="Watch the days, hours, minutes, and seconds tick down live for each of your goals."
          />

          <FeatureCard
            icon={<Zap className="text-yellow-500" size={32} />}
            title="Stay Consistent"
            description="Visualize your progress and stay committed to your routine."
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-10 text-center text-gray-500 text-sm">
        <p>© 2026 GoalTicker. Built for high achievers.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    /* Added a max-width so cards don't stretch too wide when flexed */
    <div className="p-8 rounded-2xl bg-[#141414] border border-gray-800 hover:border-blue-500/50 transition-colors max-w-sm w-full">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
