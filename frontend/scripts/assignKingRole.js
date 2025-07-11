import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function assignKingRole() {
  const email = 'ayham.elmandil@gmail.com'

  // Get user ID via Admin API
  const { data: { user }, error: getUserError } = await supabase.auth.admin.getUserByEmail(email)

  if (getUserError || !user) {
    console.error('❌ Failed to fetch user:', getUserError)
    return
  }

  // Update role in auth.users via Admin API
  const { error: userUpdateError } = await supabase.auth.admin.updateUserById(user.id, {
    role: 'king'
  })

  if (userUpdateError) {
    console.error('❌ Failed to update role in auth.users:', userUpdateError)
  } else {
    console.log('✅ Role updated to king in auth.users')
  }

  // Update role in staff table if present
  const { error: staffUpdateError } = await supabase
    .from('staff')
    .update({ role: 'king' })
    .eq('email', email)

  if (staffUpdateError) {
    console.error('❌ Failed to update role in staff:', staffUpdateError)
  } else {
    console.log('✅ Role updated to king in staff')
  }
}

assignKingRole()
