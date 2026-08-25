import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { CalendarDays, Unlock, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0; // Disable caching for admin overview

export default async function AdminOverviewPage() {
  // Use service role client to bypass RLS for admin stats
  const adminClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch stats
  const { count: pendingSubmissions } = await adminClient
    .from('unlock_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { count: totalSubmissions } = await adminClient
    .from('unlock_submissions')
    .select('*', { count: 'exact', head: true });

  const { count: pendingBookings } = await adminClient
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { count: totalBookings } = await adminClient
    .from('bookings')
    .select('*', { count: 'exact', head: true });

  const stats = [
    {
      title: 'Pending Unlock Requests',
      value: pendingSubmissions || 0,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      link: '/admin/unlock-submissions'
    },
    {
      title: 'Total Unlock Submissions',
      value: totalSubmissions || 0,
      icon: Unlock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      link: '/admin/unlock-submissions'
    },
    {
      title: 'Pending Session Bookings',
      value: pendingBookings || 0,
      icon: CalendarDays,
      color: 'text-rose-600',
      bgColor: 'bg-rose-100 dark:bg-rose-900/30',
      link: '/admin/bookings'
    },
    {
      title: 'Total Sessions Booked',
      value: totalBookings || 0,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      link: '/admin/bookings'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Link href={stat.link} key={idx} className="block group">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/admin/unlock-submissions" className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Unlock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Review Submissions</p>
                  <p className="text-sm text-gray-500">Approve or reject Free Unlock requests</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/bookings" className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Schedule Sessions</p>
                  <p className="text-sm text-gray-500">Set dates and meeting URLs for bookings</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
