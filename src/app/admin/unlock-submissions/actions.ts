'use server';

import { createClient } from '@/utils/supabase/server';
import { sendUnlockStatusEmail } from '@/utils/email';
import { revalidatePath } from 'next/cache';

export async function reviewSubmission(
  submissionId: string, 
  status: 'approved' | 'rejected', 
  note?: string
) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  // Verify admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) return { error: 'Unauthorized' };

  // Get submission user details for email
  const { data: submission } = await supabase
    .from('unlock_submissions')
    .select('user_id, profiles (full_name, email:id)') // We might not have email in profiles directly, need to check if we can get email from auth.users or profiles. 
    .eq('id', submissionId)
    .single();
    
  if (!submission) return { error: 'Submission not found' };

  // Actually, Supabase doesn't expose auth.users to public schema by default easily unless we join, 
  // Let's just do a service role query or get email from a secure route.
  // We can use the service role key to get the user email if we need it, or we can fetch it if it's in the profile.
  // I will use service role client if needed, but first let's just update the status.

  const { error: updateError } = await supabase
    .from('unlock_submissions')
    .update({ 
      status, 
      reviewer_note: note, 
      reviewer_id: user.id, 
      reviewed_at: new Date().toISOString() 
    })
    .eq('id', submissionId);

  if (updateError) {
    console.error('Error updating submission:', updateError);
    return { error: 'Failed to update submission' };
  }

  // Attempt to send email
  // We need an admin client to fetch user's email from auth.users
  const supabaseAdmin = await createClient(); // Wait, createClient uses user's cookies. We need a service role client to fetch auth.users.
  // I will implement a quick service role client here just for this, or check if we can get email from profiles (some apps copy it there).
  // Assuming they don't have email in profiles, I'll use the service role key from env.
  
  try {
    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
    const adminAuthClient = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { data: userData, error: userError } = await adminAuthClient.auth.admin.getUserById(submission.user_id);
    if (!userError && userData?.user?.email) {
      const emailRes = await sendUnlockStatusEmail({
        to: userData.user.email,
        name: (submission.profiles as any)?.full_name || 'User',
        status,
        note
      });
      if (!emailRes.success) {
         console.error('Email failed to send, but status was updated.');
      }
    }
  } catch (err) {
    console.error('Failed to send email:', err);
  }

  revalidatePath('/admin/unlock-submissions');
  return { success: true };
}
