import { Mail, Phone, MessageCircle } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";

interface AdContactCardProps {
  contactEmail?: string;
  contactPhone?: string;
  showMessageButton: boolean;
}

export function AdContactCard({ contactEmail, contactPhone, showMessageButton }: AdContactCardProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Contact</h3>
      <div className="space-y-3">
        {contactEmail && (
          <a 
            href={`mailto:${contactEmail}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            data-testid="link-contact-email"
          >
            <Mail className="w-5 h-5 text-purple-400" />
            <span className="text-sm">{contactEmail}</span>
          </a>
        )}
        {contactPhone && (
          <a 
            href={`tel:${contactPhone}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            data-testid="link-contact-phone"
          >
            <Phone className="w-5 h-5 text-purple-400" />
            <span className="text-sm">{contactPhone}</span>
          </a>
        )}
        {showMessageButton && (
          <Button className="w-full" data-testid="button-send-message">
            <MessageCircle className="w-4 h-4" />
            Send Message
          </Button>
        )}
      </div>
    </Card>
  );
}
