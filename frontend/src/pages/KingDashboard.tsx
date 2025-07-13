import React from 'react'
import { useRole, usePermissions } from '../RoleContext'

export default function KingDashboard() {
  const { role } = useRole()
  const { isKing } = usePermissions()

  if (!isKing()) {
    return <div>You do not have access to this page.</div>
  }

  return (
    <div className="min-h-screen bg-black p-6 text-[#FFD700] space-y-4">
      <h1 className="text-lg font-semibold">لوحة تحكم الملك</h1>
      <button className="border-2 border-[#800000] px-3 py-1">تحكم بالجداول</button>
      <button className="border-2 border-[#800000] px-3 py-1">إعادة ضبط البيانات</button>
      <div className="border-2 border-[#800000] p-3">أداة التحكم بالمخزون</div>
      <div className="border-2 border-[#800000] p-3">سجلات اليوم</div>
    </div>
  )
}
