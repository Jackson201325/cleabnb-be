import dynamic from "next/dynamic";
import { useMemo } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import Heading from "./Heading";
import CategoryInput from "./inputs/CategoryInput";
import Counter from "./inputs/Counter";
import CountrySelect, { CountrySelectValue } from "./inputs/CountrySelect";
import ImageUpload from "./inputs/ImageUpload";
import Input from "./inputs/Input";
import { STEPS } from "./modals/Rent";
import { categories } from "./navbar/Categories";

type Props = {
  step: number;
  guestCount: number;
  category: string;
  roomCount: number;
  bathroomCount: number;
  setCustomValue: (field: string, value: unknown) => void;
  imageSrc: string;
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  location: CountrySelectValue;
};

const StepsBody = ({
  step,
  category,
  guestCount,
  roomCount,
  bathroomCount,
  imageSrc,
  setCustomValue,
  isLoading,
  register,
  errors,
  location,
}: Props) => {
  const Map = useMemo(
    () => dynamic(() => import("./Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  if (step === STEPS.CATEGORY) {
    return (
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
    );
  }

  if (step === STEPS.LOCATION) {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you !"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitites do you have"
        />
        <Counter
          title="Guests"
          subtitle="How man guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="Number of bathroom available?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place look like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe you place?"
          subtitle="Short and sweet works the best"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe you place?"
          subtitle="Short and sweet works the best"
        />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="number"
          formatPrice
        />
      </div>
    );
  }
};

export default StepsBody;
