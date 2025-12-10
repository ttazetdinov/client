import { Card } from "@/shared/ui/Card";

interface AdImageGalleryProps {
  images: string[];
  title: string;
}

export function AdImageGallery({ images, title }: AdImageGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <Card className="p-0 overflow-hidden mb-6">
      <div className="aspect-video bg-white/5">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto">
          {images.slice(1).map((img, i) => (
            <div key={i} className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
