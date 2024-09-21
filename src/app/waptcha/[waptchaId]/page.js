import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { VerifyClient } from "./client"

async function getWaptcha(waptchaId) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('waptchas')
    .select()
    .eq('waptcha_id', waptchaId)
    .single()
  if (error) {
    console.log(error)
    return null
  }
  return data
}

export default async function Verify({ params }) {
  const waptcha = await getWaptcha(params.waptchaId)

  if (!waptcha) {
    return redirect("/")
  }

  const verifiedAt = waptcha.verified_at
  if (verifiedAt) {
    const now = new Date()
    const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);
    const verifiedAtDate = new Date(verifiedAt)
    if (verifiedAtDate.getTime() > twentyFourHoursAgo) {
      return redirect(waptcha.redirect_to)
    }
  }

  return (
    <VerifyClient waptcha={waptcha} />
  )
}
