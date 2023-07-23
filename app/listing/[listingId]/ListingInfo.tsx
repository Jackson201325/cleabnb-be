import Avatar from "@/app/components/Avatar"
import { Category } from "@/app/components/navbar/Categories"
import { User } from "@prisma/client"
import { FC, useMemo } from "react"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"
import useCountries from "@/app/hooks/useCountries"

const Map = dynamic(() => import("../../components/Map"), { ssr: false })

export type ListingInfoProps = {
  bathroomCount: number
  category: Category | null
  description: string
  guestCount: number
  locationValue: string
  roomCount: number
  user: User
}

const ListingInfo: FC<ListingInfoProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getByValue } = useCountries()

  const coordinates = getByValue(locationValue)
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />

      {category && <ListingCategory {...category} />}
      <div className="text-lg font-light text-neutral-500">{description}</div>

      <hr />

      <Map center={coordinates?.latlng}/>
    </div>
  )
}

export default ListingInfo
