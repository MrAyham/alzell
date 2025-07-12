export default function Table({ columns, data }) {
  return (
    <table className="min-w-full text-left border-collapse">
      <thead className="bg-maroon text-gold">
        <tr>
          {columns.map(col => (
            <th key={col.accessor} className="p-2 border-b border-gold">
              {col.Header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-dark text-white">
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-maroon/50">
            {columns.map(col => (
              <td key={col.accessor} className="p-2 border-b border-maroon">
                {row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
