"use client"

import useRentModal from "@/app/hooks/useRentModal"

import axios from "axios"
import { useRouter } from "next/navigation"
import { FC, useMemo, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

import StepsBody from "../StepsBody"
import { CountrySelectValue } from "../inputs/CountrySelect"
import Modal from "./Modal"

export enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

type Props = {}

const Rent: FC<Props> = () => {
  const rentModal = useRentModal()
  const router = useRouter()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSource: "",
      title: "",
      description: "",
    },
  })
  const category: string = watch("category")
  const location: CountrySelectValue = watch("location")
  const guestCount: number = watch("guestCount")
  const roomCount: number = watch("roomCount")
  const bathroomCount: number = watch("bathroomCount")
  const imageSrc: string = watch("imageSrc")

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create"

    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined

    return "Back"
  }, [step])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext()

    setIsLoading(true)

    axios
      .post("/api/listing", data)
      .then(() => {
        toast.success("Listing Created!")
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.close()
      })
      .catch(() => {
        toast.error("Something went wrong!")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  let bodyContent = (
    <StepsBody
      step={step}
      guestCount={guestCount}
      category={category}
      roomCount={roomCount}
      bathroomCount={bathroomCount}
      setCustomValue={setCustomValue}
      imageSrc={imageSrc}
      isLoading={isLoading}
      register={register}
      errors={errors}
      location={location}
    />
  )

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
      isOpen={rentModal.isOpen}
      onClose={rentModal.close}
      onSubmit={handleSubmit(onSubmit)}
      title="Aribnb Your home !"
    />
  )
}

export default Rent
