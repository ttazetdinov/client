import { Link } from "wouter";
import { motion } from "framer-motion";
import { Tag, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";

const sampleAds = [
  {
    id: 1,
    title: "Professional Makeup Artist",
    category: "Beauty",
    location: "Brussels",
    description: "Experienced makeup artist specializing in glamorous looks for special occasions",
    price: "From €75",
    isFeatured: true,
  },
  {
    id: 2,
    title: "VIP Event Photography",
    category: "Services",
    location: "Antwerp",
    description: "Discrete and professional photography services for private events",
    price: "Custom",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Designer Evening Wear",
    category: "Fashion",
    location: "Ghent",
    description: "Exclusive collection of elegant evening dresses and accessories",
    price: "€150 - €500",
    isFeatured: false,
  },
  {
    id: 4,
    title: "Private Dance Classes",
    category: "Services",
    location: "Brussels",
    description: "Learn elegant dance moves in a safe and supportive environment",
    price: "€45/hour",
    isFeatured: false,
  },
];

function PreviewAdCard({ ad, index }: { ad: typeof sampleAds[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-5 h-full hover:border-purple-500/30 transition-all duration-300 group">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge variant={ad.isFeatured ? "purple" : "default"} className="text-xs">
            {ad.category}
          </Badge>
          {ad.isFeatured && (
            <Sparkles className="w-4 h-4 text-purple-400" />
          )}
        </div>
        
        <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-purple-400 transition-colors">
          {ad.title}
        </h3>
        
        <p className="text-white/50 text-sm line-clamp-2 mb-4">
          {ad.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
          <span className="flex items-center gap-1 text-sm text-white/40">
            <MapPin className="w-3 h-3" />
            {ad.location}
          </span>
          <span className="text-purple-400 font-medium text-sm">
            {ad.price}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

export function FeaturedAdsPreview() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full blur-3xl bg-pink-500/30" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl bg-purple-500/30" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Tag className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-white/70">Community Marketplace</span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Discover Our <span className="gradient-text">Marketplace</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Connect with talented members offering exclusive services, fashion, and more
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {sampleAds.map((ad, index) => (
            <PreviewAdCard key={ad.id} ad={ad} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/auth">
            <Button variant="outline" size="lg">
              Join to Browse All Ads
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
