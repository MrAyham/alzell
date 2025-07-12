import React from 'react'
import { useRole } from '../RoleContext'
import { useAuth } from '../hooks/useAuth'

export default function KingDashboard() {
  const { role } = useRole()
  const { user } = useAuth()

  if (user === null) return <p className="text-white">Loading...</p>


  return (
    <div className="min-h-screen bg-black p-6 text-[#FFD700] space-y-4">
      <p>تم تثبيت صلاحيتك بنجاح، لا أحد يستطيع الوصول للعرش سواك.</p>
      <h1 className="text-lg font-semibold">لوحة تحكم الملك</h1>
      <button className="border-2 border-[#800000] px-3 py-1">تحكم بالجداول</button>
      <button className="border-2 border-[#800000] px-3 py-1">إعادة ضبط البيانات</button>
      <div className="border-2 border-[#800000] p-3">أداة التحكم بالمخزون</div>
      <div className="border-2 border-[#800000] p-3">سجلات اليوم</div>
    </div>
  )
}
