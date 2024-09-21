import { createClient } from '@/lib/supabase/server'

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

export async function GET(request, context) {
  const waptchaId = context.params.waptchaId
  const waptcha = await getWaptcha(waptchaId)

  if (!waptcha) {
    return Response.json({
      message: "Waptcha not found!"
    }, {
      status: 404
    })
  }

  return Response.json(waptcha)
}
