import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Save, ImagePlus } from "lucide-react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useToast } from "@/shared/hooks/useToast";
import { useCreateAd } from "./hooks";

const categories = [
  { value: "services", label: "Services" },
  { value: "events", label: "Events" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "other", label: "Other" },
];

export default function CreateAdPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { createAd, isCreating } = useCreateAd();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "services",
    price: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    images: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.category) {
      toast({
        title: "Missing fields",
        description: "Please fill in the title and category.",
        variant: "destructive",
      });
      return;
    }
    createAd(formData);
  };

  return (
    <div className="py-6">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => setLocation("/ads")}
        data-testid="button-back"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </Button>

      <PageHeader
        title="Post an Advertisement"
        subtitle="Share your services or products with the community"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-6">
            <h3 className="font-heading text-lg font-semibold mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="What are you offering?"
                  data-testid="input-ad-title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  data-testid="select-ad-category"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-gray-900">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your offering in detail..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  data-testid="input-ad-description"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., 50 EUR, Free, Negotiable"
                    data-testid="input-ad-price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Brussels, Antwerp"
                    data-testid="input-ad-location"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h3 className="font-heading text-lg font-semibold mb-4">Contact Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="contact@example.com"
                  data-testid="input-ad-email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+32 xxx xxx xxx"
                  data-testid="input-ad-phone"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h3 className="font-heading text-lg font-semibold mb-4">Images</h3>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
              <ImagePlus className="w-12 h-12 mx-auto text-white/40 mb-4" />
              <p className="text-white/60 mb-2">Image upload coming soon</p>
              <p className="text-sm text-white/40">You can add images to your ad after posting</p>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="ghost"
              onClick={() => setLocation("/ads")}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating}
              data-testid="button-submit-ad"
            >
              {isCreating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Post Advertisement
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
