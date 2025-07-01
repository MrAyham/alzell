export default function InventoryTable({ items, onEdit, onDelete, canDelete }) {
  return (
    <table className="w-full text-left border border-[#800000]">
      <thead>
        <tr className="border-b border-[#800000]">
          <th className="p-2">Item</th>
          <th className="p-2">Qty</th>
          <th className="p-2">Unit</th>
          <th className="p-2">Alert</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className="border-b border-[#800000]">
            <td className="p-2">{item.item_name}</td>
            <td className="p-2">{item.quantity}</td>
            <td className="p-2">{item.unit}</td>
            <td className="p-2">
              {item.low_stock_alert ? <span className="text-red-500">&#x1F534;</span> : ''}
            </td>
            <td className="p-2 space-x-1">
              <button
                className="border border-[#800000] px-2"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>
              {canDelete && (
                <button
                  className="border border-[#800000] px-2"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
