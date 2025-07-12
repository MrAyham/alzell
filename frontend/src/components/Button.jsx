export default function Button({ children, ...props }) {
  return (
    <button className="btn-royal" {...props}>
      {children}
    </button>
  )
}
