import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { IconType } from 'react-icons'

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

  const handleClick = () => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery = {
      ...currentQuery,
      category: label.toLowerCase(),
    }
    if (params?.get('category') === label.toLowerCase()) {
      delete updatedQuery.category
    })



    // const query = {
    //   qs.parse(params.toString()),
    //   category: label.toLowerCase(),
    // }
    //
    // if (params?.get('category') === label.toLowerCase()) {
    //   delete query.category
    // })
  }
  return (
    <div
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
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      ${selected ? 'border-b-neutral-800' : 'border-transparent}'}
    `}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox
