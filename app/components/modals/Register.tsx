'use client'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import Modal from './Modal'

type Props = {}

const Register: React.FC<Props> = (props: Props) => {
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
    const url = 'localhost:3000/user/auth/register'
    const res = await fetch(url, { method: 'POST' })

    if (res.ok) {
      console.log(res.json())
    }

    setIsLoading(false)
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.close}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default Register
