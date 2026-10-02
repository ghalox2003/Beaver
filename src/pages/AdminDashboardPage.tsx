import PageContainer from '../components/PageContainer'
import PageHeader from '../components/PageHeader'

function AdminDashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Admin dashboard"
        title="Beaver administration"
        description="Manage users, jobs, reports, and marketplace activity."
      />
    </PageContainer>
  )
}

export default AdminDashboardPage
