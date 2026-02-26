import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export const metadata: Metadata = {
  title: 'Dashboard | HRMS',
  description: 'HRMS Admin Dashboard',
}

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
