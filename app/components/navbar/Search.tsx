import useCountries from "@/app/hooks/useCountries"
import useFilterModal from "@/app/hooks/useFilterModal"
import { differenceInDays } from "date-fns"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { BiSearch } from "react-icons/bi"

function Search() {
  const { open } = useFilterModal()
  const params = useSearchParams()
  const { getByValue } = useCountries()

  const locationValue = params?.get("location")
  const startDateValue = params?.get("startDate")
  const endDateValue = params?.get("endDate")
  const guestCountValue = params?.get("guestCount")

  const locationLabel = useMemo(() => {
    if (locationValue) return getByValue(locationValue)?.label

    return "Anywhere"
  }, [locationValue, getByValue])

  const durationLabel = useMemo(() => {
    if (startDateValue && endDateValue) {
      const start = new Date(startDateValue as string)
      const end = new Date(endDateValue as string)
      let diff = differenceInDays(end, start)

      if (diff === 0) diff = 1

      return `${diff} days`
    }
    return "Any Week"
  }, [startDateValue, endDateValue])

  const guestCountLabel = useMemo(() => {
    if (guestCountValue) return `${guestCountValue} guests`

    return "Add Guest"
  }, [guestCountValue])

  return (
    <div
      onClick={open}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="text-sm font-semibold px-6 hidden sm:block flex-1 border-x-[1px] text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestCountLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
