import { useEffect, useState } from 'react'
import { getSchedule, addSchedule, updateSchedule, deleteSchedule } from '../supabase/shiftsSchedule'
import { supabase } from '../supabase'
import ShiftModal from '../components/ShiftModal'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const shifts = ['Morning', 'Evening', 'Overnight']

export default function ShiftScheduler() {
  const [schedule, setSchedule] = useState([])
  const [staff, setStaff] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    fetchSchedule()
    fetchStaff()
  }, [])

  async function fetchSchedule() {
    try {
      const data = await getSchedule()
      setSchedule(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchStaff() {
    const { data } = await supabase.from('staff').select('id, name')
    setStaff(data || [])
  }

  async function handleAdd(data) {
    await addSchedule(data)
    setShowAdd(false)
    fetchSchedule()
  }

  async function handleEdit(id, data) {
    await updateSchedule(id, data)
    setEditItem(null)
    fetchSchedule()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this shift?')) return
    await deleteSchedule(id)
    fetchSchedule()
  }

  function cellContent(day, shift) {
    return schedule
      .filter(s => s.day === day && s.shift === shift)
      .map(item => (
        <div key={item.id} className="flex items-center justify-between">
          <span>{item.staff?.name}</span>
          <div className="space-x-1">
            <button className="border border-[#800000] px-1" onClick={() => setEditItem(item)}>Edit</button>
            <button className="border border-[#800000] px-1" onClick={() => handleDelete(item.id)}>X</button>
          </div>
        </div>
      ))
  }

  return (
    <div className="space-y-4 text-[#FFD700]">
      <h2 className="text-xl font-bold">Shift Scheduler</h2>
      <table className="w-full text-left border border-[#800000]">
        <thead>
          <tr className="border-b border-[#800000]">
            <th className="p-2">Shift</th>
            {days.map(d => (
              <th key={d} className="p-2">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shifts.map(sh => (
            <tr key={sh} className="border-b border-[#800000]">
              <td className="p-2 font-semibold">{sh}</td>
              {days.map(day => (
                <td key={day} className="p-2 align-top space-y-1">
                  {cellContent(day, sh)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="border border-[#800000] px-2 py-1" onClick={() => setShowAdd(true)}>Add Shift</button>
      {showAdd && (
        <ShiftModal staff={staff} onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}
      {editItem && (
        <ShiftModal
          staff={staff}
          initial={editItem}
          onClose={() => setEditItem(null)}
          onSave={data => handleEdit(editItem.id, data)}
        />
      )}
    </div>
  )
}
