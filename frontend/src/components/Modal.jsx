export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="card-royal">
        {children}
      </div>
    </div>
  )
}
