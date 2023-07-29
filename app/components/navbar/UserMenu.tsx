// We have to add this because of the onClick
"use client"

import useLoginModal from "@/app/hooks/useLoginModal"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useRentModal from "@/app/hooks/useRentModal"
import { User } from "@prisma/client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"

import Avatar from "../Avatar"
import MenuItem from "../MenuItem"

type UserMenuProps = {
  currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const handleRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.open()
    }

    rentModal.open()
    toggleOpen()
  }, [currentUser, rentModal, loginModal, toggleOpen])

  const handleLoginModal = useCallback(() => {
    loginModal.open()
    toggleOpen()
  }, [toggleOpen, loginModal])

  const handleRegisterModal = useCallback(() => {
    registerModal.open()
    toggleOpen()
  }, [toggleOpen, registerModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={handleRent}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push("/favourites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My Reservtions"
                />
                <MenuItem
                  onClick={() => console.log("My properties")}
                  label="My properties"
                />
                <MenuItem onClick={handleRent} label="Airbnb Home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={handleLoginModal} label="Login" />
                <MenuItem onClick={handleRegisterModal} label="Register" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

// We should not be using && for conditional rendering
// when are not sure if the value is a boolean
// there for to avoind issues we should be using ternary operator
