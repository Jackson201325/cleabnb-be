'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../Button'

type Props = {
  actionLabel?: string
  body?: string
  disabled?: boolean
  footer?: string
  isOpen?: boolean
  onClose?: () => void
  onSubmit?: () => void
  secondaryAction?: () => void
  secondaryActionLabel?: string
  title?: string
}

const Login: React.FC<Props> = ({
  actionLabel,
  body,
  disabled,
  footer,
  isOpen,
  onClose = () => console.log('onClose'),
  onSubmit = () => console.log('onSubmit'),
  secondaryAction,
  secondaryActionLabel,
  title,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }
    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [setShowModal, disabled, onClose])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return
    }

    onSubmit()
  }, [disabled, onSubmit, secondaryAction])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }

    onSubmit()
  }, [disabled, onSubmit])

  if (!isOpen) {
    return null
  }

  return (
    <div className="justify-center items-center flex overflow-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        {/* CONTENT */}
        <div
          className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* HEADER */}
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* BODY */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel ? (
                  <Button
                    onClick={handleSecondaryAction}
                    outline
                    label={secondaryActionLabel}
                    disabled={disabled}
                  />
                ) : null}
                <Button
                  onClick={handleSubmit}
                  label={actionLabel}
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
