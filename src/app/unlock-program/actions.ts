'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitUnlockEvidence(paths: string[]) {
  if (paths.length !== 11) {
    return { error: 'Exactly 11 screenshots are required.' };
  }

  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { error: 'You must be logged in to submit.' };
  }

  // Check if they already have a submission
  const { data: existingSubmission } = await supabase
    .from('unlock_submissions')
    .select('id, status')
    .eq('user_id', user.id)
    .single();

  if (existingSubmission && existingSubmission.status !== 'rejected') {
    return { error: 'You already have a pending or approved submission.' };
  }

  // Create submission
  const { data: submission, error: submissionError } = await supabase
    .from('unlock_submissions')
    .insert({ user_id: user.id, status: 'pending' })
    .select('id')
    .single();

  if (submissionError || !submission) {
    console.error('Error creating submission:', submissionError);
    return { error: 'Failed to create submission.' };
  }

  // Create evidence records
  const evidenceRecords = paths.map((path, index) => {
    // Map first as linkedin, next 10 as friends? 
    // We'll just store them all as 'screenshot'
    return {
      submission_id: submission.id,
      evidence_type: 'screenshot',
      storage_path: path,
    };
  });

  const { error: evidenceError } = await supabase
    .from('unlock_evidence')
    .insert(evidenceRecords);

  if (evidenceError) {
    console.error('Error saving evidence:', evidenceError);
    return { error: 'Failed to save evidence paths.' };
  }

  revalidatePath('/unlock-program');
  return { success: true };
}

export async function getSubmissionStatus() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('unlock_submissions')
    .select('status, reviewer_note, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
    
  return data;
}
