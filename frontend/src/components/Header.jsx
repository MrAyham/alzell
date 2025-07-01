import { useRole } from '../RoleContext'

export default function Header() {
  const { role } = useRole()

  return (
    <header className="mb-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">ChefMind</h1>
      <div className="space-x-2 text-sm">
        <span>Role: {role}</span>
        {role === 'King' && (
          <button className="border px-2 py-1">Settings</button>
        )}
      </div>
    </header>
  )
}
