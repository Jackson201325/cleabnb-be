import { usePathname, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiCastle,
  GiCaveEntrance,
  GiFishingBoat,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export type Category = {
  label: string;
  icon: IconType;
  description: string;
};

export const categories: Category[] = [
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is close to the island",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property has a cave nearby",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has the artic nearby",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property is close to the skiing",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This property is close to the pool",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has a camping",
  },
  {
    label: "Lake",
    icon: GiFishingBoat,
    description: "This property is close to the Lake",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is close to the Villa",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property has a castle nearby",
  },
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is close to the Mountain",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is close to the Windmills",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category_url = params?.get("category");
  const path = usePathname();

  const isMainPage = path === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            description={category.description}
            selected={category.label.toLowerCase() === category_url}
            icon={category.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
