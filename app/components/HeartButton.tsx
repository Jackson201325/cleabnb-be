import { User } from "@prisma/client"
import { FC } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

type Props = {
  listingId: string
  currentUser: User | null
}

const HeartButton: FC<Props> = ({ currentUser, listingId }) => {
  const favourite = false
  const toggleFavourite = () => { }

  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px]-right-[2px]"
      />
      <AiFillHeart
        size={28}
        className={`
          ${favourite ? "fill-red-500" : "fill-neutral-500/700"}
        `}
      />
    </div>
  )
}

export default HeartButton
