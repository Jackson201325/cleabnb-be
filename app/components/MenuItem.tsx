import type { NextPage } from "next"

type Props = {
  onClick: () => void
  label: string
}
const MenuItem: NextPage<Props> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-3 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  )
}

export default MenuItem
