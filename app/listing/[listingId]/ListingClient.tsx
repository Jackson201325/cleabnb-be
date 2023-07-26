"use client"

import Container from "@/app/components/Container"
import { categories } from "@/app/components/navbar/Categories"
import useLoginModal from "@/app/hooks/useLoginModal"
import { Listing, Reservation, User } from "@prisma/client"

import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import { useRouter } from "next/navigation"
import { FC, useEffect, useMemo, useState } from "react"
import { Range } from "react-date-range"

import axios from "axios"
import toast from "react-hot-toast"
import ListingHead from "./ListingHead"
import ListingInfo from "./ListingInfo"
import ListingReservation from "./ListingReservation"

export type DateRangeType = {
  startDate: Date
  endDate: Date
  key: string
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
}

type Props = {
  listing: Listing & { user: User }
  reservations?: (Reservation & { listing: Listing })[]
  currentUser: User | null
}

const ListingClient: FC<Props> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category) || null
  }, [listing])

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const createReservation = async () => {
    if (!currentUser) {
      return loginModal.open()
    }

    setIsLoading(true)
    axios
      .post("/api/reservations", {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
        price: totalPrice,
      })
      .then(() => {
        toast.success("Reservation created")
      })
      .catch(() => {
        toast.error("Something went wrong")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const totalDates = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      )
      if (totalDates > 0 && listing.price) {
        setTotalPrice(totalDates * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  const {
    user,
    title,
    imageSrc,
    locationValue,
    id,
    description,
    price,
    guestCount,
    roomCount,
    bathroomCount,
  } = listing

  const listingInfoData = {
    bathroomCount,
    category,
    description,
    guestCount,
    locationValue,
    roomCount,
    user,
  }

  const listingHeadData = {
    currentUser,
    id,
    imageSrc,
    locationValue,
    title,
  }

  const listingReservationData = {
    price,
    totalPrice,
    dateRange,
    onSubmit: createReservation,
    disabled: isLoading,
    onChangeDate: (value: Range) => setDateRange(value),
    disabledDates,
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead {...listingHeadData} />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo {...listingInfoData} />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation {...listingReservationData} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
