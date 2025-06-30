import React from 'react'

export default function KingDashboard() {
  // Placeholder role check. Replace with real auth logic when available
  const hasAccess = true // This would check user role === 'King'
  if (!hasAccess) {
    return <p className="p-4">Access denied</p>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#2a0808] to-[#540b0e] p-6 text-yellow-300">
      <h1 className="sr-only">Welcome back, your Majesty.</h1>
      <p className="italic text-sm text-muted-foreground">
        “ChefMind يعرف قبلك أين حدث الخطأ… لكنه ينتظرك لتكتشفه.”
      </p>
      <div className="mt-6 space-y-4">
        <div className="bg-white/5 p-4 rounded">إجمالي الطلبات اليوم: <span className="font-bold">0</span></div>
        <div className="bg-white/5 p-4 rounded">تنبيه فوري إذا نقص المخزون أو صار Waste عالي</div>
        <div className="bg-white/5 p-4 rounded">عدد الساعات المهدورة من فريق العمل</div>
      </div>
    </div>
  )
}
