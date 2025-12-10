import { Star } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";

export function VipUpgradeCard() {
  return (
    <Card className="gradient-bg p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
            <Star className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold">Upgrade to VIP</h3>
            <p className="text-white/80">Get exclusive access to premium events and features</p>
          </div>
        </div>
        <Button variant="secondary" className="shrink-0" data-testid="button-upgrade-vip">
          Learn More
        </Button>
      </div>
    </Card>
  );
}
