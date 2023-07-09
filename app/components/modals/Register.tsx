'use client'

import useRegisterModal from '@/app/hooks/useRegisterModal'

import axios from 'axios'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const Register = () => {
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    axios
      .post('/api/register', data)
      .then((response) => {
        console.log(response.data)
        registerModal.close()
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id="name"
        label="Name"
        type="text"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Sign In With Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Sign In With Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.close}
            className="text-neutral-800 cursor-pointer hover:underline"
          ></div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      actionLabel="Continue"
      body={bodyContent}
      disabled={isLoading}
      footer={footerContent}
      isOpen={registerModal.isOpen}
      onClose={registerModal.close}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
    />
  )
}

export default Register
