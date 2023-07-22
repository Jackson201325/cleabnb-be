import { IconType } from "react-icons"

type Props = {
  disabled?: boolean
  icon?: IconType
  label?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  outline?: boolean
  small?: boolean
}

const Button: React.FC<Props> = ({
  disabled = false,
  icon: Icon,
  label,
  onClick,
  outline = false,
  small = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
        ${outline ? "bg-white" : "bg-rose-500"}
        ${outline ? "border-black" : "bg-rose-500"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon ? <Icon size={18} className="absolute left-4 top-3" /> : null}
      {label}
    </button>
  )
}

export default Button
