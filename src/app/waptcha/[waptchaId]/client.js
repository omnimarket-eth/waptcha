'use client'

import { IDKitWidget, useIDKit } from '@worldcoin/idkit'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function VerifyClient({ waptcha }) {
  const router = useRouter()
  const { open, setOpen } = useIDKit()

  useEffect(() => {
    setOpen(true)
  }, [])

  const onSuccess = async (result) => {
    const res = await fetch(`/verify/${waptcha.waptcha_id}`, {
      method: 'POST',
      body: JSON.stringify(result)
    })
    if (res.ok) {
      router.push(waptcha.redirect_to)
    }
  }

  return (
    <>
      <IDKitWidget
        app_id={process.env.WORLDCOIN_APP_ID}
        action={process.env.WORLDCOIN_ACTION}
        onSuccess={onSuccess}
        verification_level='device'
      />
    </>
  )
}
