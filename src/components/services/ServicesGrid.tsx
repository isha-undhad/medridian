import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";

type ServicesGridProps = {
  limit?: number;
};

export default function ServicesGrid({ limit }: ServicesGridProps) {
  const items = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service, index) => (
        <ServiceCard key={service.id} service={service} delay={(index % 3) * 0.08} />
      ))}
    </div>
  );
}
