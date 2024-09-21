import { createClient } from '@/lib/supabase/server'
import { verifyCloudProof } from "@worldcoin/idkit-core/backend"
import { redirect } from "next/navigation"

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

async function verifyWaptcha(waptchaId) {
  const supabase = createClient()
  const { error } = await supabase
    .from('waptchas')
    .update({ verified_at: (new Date()).toISOString() })
    .eq('waptcha_id', waptchaId)

  if (error) {
    console.log(error)
  }

  return error
}

export async function POST(request, context) {
  const waptchaId = context.params.waptchaId
  const waptcha = await getWaptcha(waptchaId)

  if (!waptcha) {
    return redirect('/')
  }

  const body = await request.json()
  const appId = process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID
  const action = process.env.NEXT_PUBLIC_WORLDCOIN_ACTION
  const res = await verifyCloudProof(body, appId, action, '')

  let error
  if (res.success) {
    error = await verifyWaptcha(waptchaId)
  }

  return Response.json(res, {
    status: (res.success && !error) ? 200 : 400
  })
}
