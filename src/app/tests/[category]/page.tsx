import { redirect } from 'next/navigation'
import TestInterface from '@/components/tests/TestInterface'
import { createClient } from '@/utils/supabase/server'
import { fetchGoogleSheetQuestions } from '@/utils/googleSheets'

export default async function TestPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  
  const category = resolvedParams.category
  const type = (resolvedSearchParams.type as 'free' | 'pro') || 'free'

  // Validate category
  const validCategories = ['ai', 'technology', 'finance', 'digital-marketing']
  if (!validCategories.includes(category)) {
    redirect('/tests')
  }

  // Check auth
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/tests/${category}?type=${type}`)
  }

  // Fetch questions from Google Sheets
  const questions = await fetchGoogleSheetQuestions(category, type)

  // For free tier, we could limit it. The sheet might have all of them.
  let formattedQuestions = questions
  if (type === 'free' && formattedQuestions.length > 20) {
    formattedQuestions = formattedQuestions.slice(0, 20)
  } else if (type === 'pro' && formattedQuestions.length > 45) {
    formattedQuestions = formattedQuestions.slice(0, 45)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <TestInterface 
        category={category} 
        type={type} 
        initialQuestions={formattedQuestions} 
      />
    </div>
  )
}
