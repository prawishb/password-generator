interface DividerProps {
  mode: "horizontal" | "vertical"
}

const Divider = ({ mode }: DividerProps) => {
  if (mode === "horizontal") return <hr className='my-3 h-px border-t-0 bg-stone-200 opacity-100 dark:opacity-50' />
  
  return (
    <div className='inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-stone-2s00 opacity-100 dark:opacity-50' />
  )
}

export default Divider