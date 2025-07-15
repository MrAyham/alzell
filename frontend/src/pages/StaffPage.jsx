import StaffTable from '../components/StaffTable'
import RequireRole from '../components/RequireRole'

export default function StaffPage() {
  return (
    <RequireRole roles={["King"]}>
      <div className="space-y-4 text-[#FFD700]">
        <h2 className="text-xl font-bold">Staff Members</h2>
        <StaffTable />
      </div>
    </RequireRole>
  )
}
