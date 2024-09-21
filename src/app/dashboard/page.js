'use client'

import { useState, useEffect } from 'react'
import { createClient } from "@/lib/supabase/client"
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import Image from 'next/image'

async function getWaptchas() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('waptchas')
    .select()
  if (error) {
    console.log(error)
    return []
  }
  return data
}

export default function Dashboard() {
  const isLoggedIn = useIsLoggedIn()
  const [waptchas, setWaptchas] = useState([])

  useEffect(() => {
    if (isLoggedIn) {
      getWaptchas().then((waptchas) => setWaptchas(waptchas))
    }
  }, [isLoggedIn])

  const onSubmit = async (e) => {
    e.preventDefault()
    const redirectTo = e.target['to'].value

    const supabase = createClient()
    const { data, error } = await supabase
      .from('waptchas')
      .insert({
        redirect_to: redirectTo
      })
      .select()
      .single()
    if (error) {
      alert(error)
    }
    setWaptchas([...waptchas, data])
  }

  if (!isLoggedIn) {
    return (
      <div>
        <Image src="/head-owl.svg" alt="Owl Nouns" width={200} height={200} />
        <p className="-mt-16">Hi there! Please login to continue...</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Create a Waptcha</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="to">Redirect to</label>
            <input
              id="to"
              name="to"
              type="url"
              placeholder="https://yourwebsite.com"
              className="block px-3 py-1 border border-neutral-400 rounded min-w-64"
            />
          </div>
          <button className="px-3 py-1 border rounded bg-neutral-200 border-neutral-400 font-bold">
            Create Waptcha
          </button>
        </form>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-bold">My Waptchas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {waptchas.map((waptcha, i) => (
            <div key={i} className="p-4 border border-neutral-400 rounded grid grid-cols-[max-content_1fr] gap-2 shadow">
              <p className="font-bold">Waptcha ID:</p>
              <p>{waptcha.waptcha_id}</p>
              <p className="font-bold">Redirect to:</p>
              <a
                href={waptcha.redirect_to}
                className="text-[#254EFB] font-bold"
              >
                {waptcha.redirect_to} →
              </a>
            </div>
          ))}
        </div>
      </div>
      <Image
        src="/head-grouper.svg"
        alt="Nouns Grouper"
        width={200}
        height={200}
        className="fixed bottom-0 left-0 animate-bounce-horizontal"
      />
    </div>
  )
}
