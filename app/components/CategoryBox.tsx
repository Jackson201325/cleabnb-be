import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { useCallback } from "react"
import { IconType } from "react-icons"

type CategoryBoxProps = {
  description: string
  icon: IconType
  key: string
  label: string
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  selected,
  icon: Icon,
  label,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
    }

    if (params?.get("category") === label.toLowerCase()) {
      updatedQuery.category = ""
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true },
    )

    router.push(url)
  }, [label, params, router])

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox
