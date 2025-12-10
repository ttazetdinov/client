import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { VipBadge } from "@/shared/ui/Badge";

interface BasicInfoCardProps {
  username: string;
  name: string;
  age: number;
  city?: string;
  country?: string;
  memberSince: string;
  isVip?: boolean;
  connectionCount: number;
  gender?: string;
  socialStatus?: string;
  heightCm?: number;
  weightKg?: number;
}

function calculateAge(birthDateString: string): number {
  const [day, month, year] = birthDateString.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function useBasicInfoData() {
  const [data, setData] = useState<BasicInfoCardProps | null>(null);

  useEffect(() => {
    // Provided data mapping
    const profileName = "Viki";
    const firstName = "Viki";
    const city = "Aarschot";
    const province = "Limburg";
    const country = "België";
    const birthDate = "29-07-1965";
    const gender = "Tgirl";
    const socialStatus = "Single";
    const height = 182;
    const weight = 74;

    const dummyData: BasicInfoCardProps = {
      name: `${firstName} (${profileName})`,
      age: calculateAge(birthDate),
      city: province,
      country,
      memberSince: "2020-01-01", // Placeholder
      isVip: false,
      connectionCount: 0,
      gender,
      socialStatus,
      heightCm: height,
      weightKg: weight,
    };
    setData(dummyData);
  }, []);

  return data;
}

export function BasicInfoCard() {
  const data = useBasicInfoData();

  if (!data) {
    return <div className="text-white">Loading...</div>;
  }

  const {
    name,
    age,
    city,
    country,
    isVip,
    connectionCount,
    gender,
    socialStatus,
    heightCm,
    weightKg,
  } = data;

  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <User className="w-5 h-5 text-purple-400" />
        Basic Info
      </h3>

      <div className="space-y-1">
        <div className="flex items-center justify-between py-1">
          <span className="text-white/50">Name</span>
          <span className="text-white font-medium">{name}</span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-white/50">Age</span>
          <span className="text-white font-medium">{age} years old</span>
        </div>

        {(city || country) && (
          <div className="flex items-center justify-between py-1">
            <span className="text-white/50 flex items-center gap-2">
              Location
            </span>
            <span className="text-white font-medium">
              {[city, country].filter(Boolean).join(", ")}
            </span>
          </div>
        )}

        {gender && (
          <div className="flex items-center justify-between py-1">
            <span className="text-white/50">Gender</span>
            <span className="text-white font-medium">{gender}</span>
          </div>
        )}

        {socialStatus && (
          <div className="flex items-center justify-between py-1">
            <span className="text-white/50">Social Status</span>
            <span className="text-white font-medium">{socialStatus}</span>
          </div>
        )}

        {(heightCm || weightKg) && (
          <div className="flex items-center justify-between py-1">
            <span className="text-white/50">Height / Weight</span>
            <span className="text-white font-medium">
              {heightCm ? `${heightCm} cm` : ""}{" "}
              {weightKg ? ` / ${weightKg} kg` : ""}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between py-1">
          <span className="text-white/50 flex items-center gap-2">
            Connections
          </span>
          <span className="text-white font-medium">{connectionCount}</span>
        </div>

        {isVip && (
          <div className="flex items-center justify-between py-3">
            <span className="text-white/50">Status</span>
            <VipBadge />
          </div>
        )}
      </div>
    </div>
  );
}