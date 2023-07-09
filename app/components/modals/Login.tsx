'use client'

import useLoginModal from '@/app/hooks/useLoginModal'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import toast from 'react-hot-toast'
import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const Login = () => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)
      if (callback?.ok) {
        toast.success('Logged in successfully')
        router.refresh()
        loginModal.close()
      }

      if(callback?.error) {
        console.log(callback.error)
        toast.error('Invalid credentials')
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login through your account" />
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
        label="Register with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Register With Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Dont have an acount?</div>
          <div
            onClick={loginModal.close}
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
      isOpen={loginModal.isOpen}
      onClose={loginModal.close}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
    />
  )
}

export default Login