'use client'

import { IDKitWidget, useIDKit } from '@worldcoin/idkit'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export function VerifyClient({ waptcha }) {
  const router = useRouter()
  const { open, setOpen } = useIDKit()
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) {
      setOpen(true)
    }
  }, [open])

  const onSuccess = async (result) => {
    const res = await fetch(`/verify/${waptcha.waptcha_id}`, {
      method: 'POST',
      body: JSON.stringify(result)
    })
    if (res.ok) {
      router.push(waptcha.redirect_to)
    }
  }

  const handleVerify = (result) => {
    setSuccess(true)
    return result
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {success && (
        <p>Redirecting to site now...</p>
      )}
      <IDKitWidget
        app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID}
        action={process.env.NEXT_PUBLIC_WORLDCOIN_ACTION}
        onSuccess={onSuccess}
        handleVerify={handleVerify}
        verification_level='device'
      />
    </div>
  )
}
