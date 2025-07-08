export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`card-royal ${className}`} {...props}>
      {children}
    </div>
  )
}
