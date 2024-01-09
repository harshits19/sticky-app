const loading = () => {
  return (
    <>
      <div className="flex justify-between px-4 pt-4">
        <div className="flex w-full flex-col">
          <div className="mt-1 h-6 w-1/2 rounded bg-muted"></div>
          <div className="mt-2 h-4 w-1/3 rounded bg-muted"></div>
          <div className="mt-6 grid h-5 w-1/2 grid-cols-2 gap-x-1 sm:mt-10">
            <div className="rounded bg-muted"></div>
            <div className="rounded bg-muted"></div>
          </div>
        </div>
        <div className="h-20 w-20 shrink-0 rounded-full bg-muted sm:h-24 sm:w-24"></div>
      </div>
      <div className="p-4">
        <div className="h-5 w-4/5 rounded bg-muted"></div>
        <div className="mt-12 h-9 w-full rounded-md bg-muted"></div>
      </div>
      <div className="mt-2 grid h-10 w-full grid-cols-3 bg-muted">
        <div className="border-r border-muted-foreground/10"></div>
        <div className="border-r border-muted-foreground/10"></div>
        <div></div>
      </div>
    </>
  )
}
export default loading
