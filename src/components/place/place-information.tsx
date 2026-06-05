import {
  Accessibility,
  Car,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Shirt,
} from "lucide-react";

import type { Place } from "@/types/place";

type PlaceInformationProps = {
  place: Place;
};

export function PlaceInformation({ place }: PlaceInformationProps) {
  const cards = [
    {
      label: "Address",
      value: place.address,
      icon: MapPin,
    },
    {
      label: "Parking",
      value: place.practicalInfo.parking,
      icon: Car,
    },
    {
      label: "Dress code",
      value: place.practicalInfo.dressCode,
      icon: Shirt,
    },
    {
      label: "Accessibility",
      value: place.practicalInfo.accessibility,
      icon: Accessibility,
    },
    {
      label: "Safety tip",
      value: place.practicalInfo.safetyTip,
      icon: ShieldCheck,
    },
    {
      label: "Contact",
      value: place.practicalInfo.contact,
      icon: Phone,
    },
  ];

  return (
    <section className="mt-20">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
        Useful details
      </p>

      <h2 className="mt-2 text-[42px] font-semibold leading-none tracking-[-0.075em] text-black">
        Before you go.
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.label} className="rounded-[30px] bg-[#f4f4f2] p-5">
              <div className="flex size-11 items-center justify-center rounded-full bg-white">
                <Icon size={17} />
              </div>

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                {card.label}
              </p>

              <p className="mt-2 text-[14px] font-semibold leading-snug text-black">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-[30px] bg-black p-6 text-white">
        <div className="flex items-center gap-3">
          <Clock3 size={18} />
          <p className="text-[13px] font-semibold">Opening hours</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {place.openingHours.map((item) => (
            <div
              key={item.day}
              className={`rounded-[18px] px-4 py-3 ${
                item.isToday ? "bg-[var(--accent)] text-black" : "bg-white/10"
              }`}
            >
              <p className="text-[11px] font-semibold">{item.day}</p>
              <p className="mt-1 text-[12px] opacity-70">{item.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
