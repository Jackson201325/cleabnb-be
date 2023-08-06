import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

type InputType = "text" | "email" | "password" | "number";

type Props = {
  id: string;
  disabled?: boolean;
  errors: FieldErrors;
  formatPrice?: boolean;
  label: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  type?: InputType;
};

const Input = ({
  id,
  disabled,
  errors,
  formatPrice,
  label,
  register,
  required,
  type = "text",
}: Props) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          className="absolute left-2 top-5 text-neutral-700"
          size={24}
        />
      )}

      <input
        id={id}
        className={`
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
          peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed`}
        disabled={disabled}
        placeholder=" "
        type={type}
        {...register(id, { required })}
      />

      <label
        htmlFor={id}
        className={`
          ${formatPrice ? "left-9" : "left-4"}
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
          absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
