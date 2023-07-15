"use client"

import useRentModal from "@/app/hooks/useRentModal"
import { FC, useMemo, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import Heading from "../Heading"
import CategoryInput from "../inputs/CategoryInput"
import { categories } from "../navbar/Categories"
import Modal from "./Modal"

enum STEPS {
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
  const [step, setStep] = useState(STEPS.CATEGORY)

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
      bathrronCount: 1,
      imageSource: "",
      title: "",
      description: "",
    },
  })

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create"
    }

    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return "Back"
  }, [step])

  const category = watch("category")

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              icon={item.icon}
              selected={category === item.label}
              label={item.label}
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
      // disabled={isLoading}
      // footer={footerContent}
      isOpen={rentModal.isOpen}
      onClose={rentModal.close}
      onSubmit={onNext}
      title="Aribnb Your home !"
    />
  )
}

export default Rent
