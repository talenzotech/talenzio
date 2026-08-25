import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import BookingsClient from './BookingsClient';

export const revalidate = 0; // Disable caching

export default async function AdminBookingsPage() {
  const adminClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: bookings } = await adminClient
    .from('bookings')
    .select(`
      *,
      profiles:user_id (full_name)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Session Scheduling</h2>
          <p className="text-gray-500 mt-1">Manage 1-on-1 career counseling and interview prep sessions.</p>
        </div>
      </div>
      
      <BookingsClient bookings={bookings || []} />
    </div>
  );
}
