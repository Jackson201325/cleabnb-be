"use client"

import useCountries from "@/app/hooks/useCountries"
import { Listing, Reservation, User } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useCallback, useMemo } from "react"

type Props = {
  listing: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser: User | null
}

const ListingCard = ({
  listing,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: Props) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(listing.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [onAction, actionId, disabled],
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return listing.price
  }, [reservation, listing.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const startDate = new Date(reservation.startDate)
    const endDate = new Date(reservation.endDate)

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`
  }, [reservation])

  console.log({ listing })

  return (
    <div
      onClick={() => router.push(`/listing/${listing.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            height={200}
            width={200}
            src={listing.imageSrc}
            alt="Listing"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">

          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingCard
