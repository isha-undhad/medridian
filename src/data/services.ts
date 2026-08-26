export type ServiceIcon = "heart" | "users" | "aperture" | "plane" | "image" | "camera";

export type Service = {
  id: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  image?: string;
};

export const services: Service[] = [
  {
    id: "s1",
    icon: "heart",
    title: "Wedding Photography",
    description:
      "Full-day coverage that favors quiet, honest moments over posed formality — from first light to the last dance.",
    image: "/service/11.jpg",
  },
  {
    id: "s2",
    icon: "users",
    title: "Portrait Sessions",
    description:
      "Individual, couple, and family sittings shot on location or in-studio, guided rather than directed.",
    image: "/service/12.jpg",
  },
  {
    id: "s3",
    icon: "aperture",
    title: "Editorial & Brand",
    description:
      "Considered imagery for publications and brands who want a photograph to hold its own next to the words.",
    image: "/service/13.jpg",
  },
  {
    id: "s4",
    icon: "plane",
    title: "Travel Documentary",
    description:
      "Long-form visual journals from assignments abroad — cities, coastlines, and the spaces between destinations.",
    image: "/service/14.jpg",
  },
  {
    id: "s5",
    icon: "image",
    title: "Fine Art Prints",
    description:
      "Archival, museum-grade prints in limited editions, produced in-house from original negatives and files.",
    image: "/service/15.jpg",
  },
  {
    id: "s6",
    icon: "camera",
    title: "Film & Archival",
    description:
      "Medium-format film work and the careful restoration of family archives, scanned and preserved for decades.",
    image: "/service/16.jpg",
  },
];
