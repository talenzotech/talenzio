-- Create a new storage bucket for unlock program evidence
insert into storage.buckets (id, name, public)
values ('unlock_evidence', 'unlock_evidence', false);

-- Enable RLS
-- Note: the storage.objects table already has RLS enabled by default in Supabase

-- Policy: Allow authenticated users to upload evidence for their own submissions
create policy "Users can upload their own evidence"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'unlock_evidence' 
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow authenticated users to select/read their own evidence
create policy "Users can view their own evidence"
on storage.objects for select
to authenticated
using (
  bucket_id = 'unlock_evidence'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow admins to view all evidence
create policy "Admins can view all evidence"
on storage.objects for select
to authenticated
using (
  bucket_id = 'unlock_evidence'
  and exists (
    select 1 from public.profiles
    where id = auth.uid() and is_admin = true
  )
);
