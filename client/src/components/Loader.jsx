export default function Loader({ label = 'Thinking' }) {
  return (
    <div className="flex items-center gap-2.5 text-mauve text-sm py-1">
      <span className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce" />
      </span>
      {label}…
    </div>
  )
}
