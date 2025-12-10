import { Link } from "wouter";
import { motion } from "framer-motion";
import { Sparkles, Users, Calendar, Shield, Star, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { FeatureCard, StatItem, FeaturedAdsPreview } from "./components";

const features = [
  {
    icon: Users,
    title: "Connect",
    description: "Meet like-minded individuals in a safe and welcoming community",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Exclusive gatherings and experiences curated just for you",
  },
  {
    icon: Shield,
    title: "Privacy",
    description: "Your safety and privacy are our top priorities",
  },
  {
    icon: Star,
    title: "VIP Access",
    description: "Premium membership for the ultimate experience",
  },
];

const stats = [
  { value: "500+", label: "Members" },
  { value: "50+", label: "Events Hosted" },
  { value: "12", label: "Cities" },
  { value: "98%", label: "Happy Members" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-lg font-bold">L</span>
            </div>
            <span className="font-heading font-bold text-xl">Lumiere</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" className="hidden sm:inline-flex" data-testid="button-login">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button data-testid="button-join-header">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-purple-500" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-pink-500" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/70">Exclusive Community</span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">
                Welcome to{" "}
                <span className="gradient-text">Lumiere</span>
              </h1>

              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
                An elegant and safe community space for connection, celebration, and authentic self-expression
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button size="lg" className="w-full sm:w-auto" data-testid="button-get-started">
                    Get Started
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="button-learn-more">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Why Choose Lumiere?
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                We've created a premium experience designed for your comfort and enjoyment
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <FeaturedAdsPreview />

        <section className="py-20 px-6 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ready to Join?
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                Become part of our exclusive community and start connecting with amazing people today
              </p>
              <Link href="/auth">
                <Button size="lg" data-testid="button-join-now">
                  Join Lumiere Now
                  <Sparkles className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-sm font-bold">L</span>
            </div>
            <span className="font-heading font-semibold">Lumiere</span>
          </div>
          <p className="text-white/40 text-sm">
            © 2024 Lumiere. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
