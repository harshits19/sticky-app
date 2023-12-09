const loading = () => {
  return (
    <>
      <div className="flex h-40 justify-between p-4">
        <div className="flex w-full flex-col">
          <div className="h-6 w-1/2 rounded bg-muted"></div>
          <div className="mt-2 h-6 w-1/3 rounded bg-muted"></div>
        </div>
        <div className="h-24 w-24 shrink-0 rounded-full bg-muted"></div>
      </div>
      <div className="p-4">
        <div className="h-8 w-full rounded bg-muted"></div>
        <div className="mt-6 flex h-9 w-full bg-muted">
          <div className="w-1/3 border-r border-muted-foreground/20"></div>
          <div className="w-1/3 border-r border-muted-foreground/20"></div>
          <div className="w-1/3"></div>
        </div>
      </div>
    </>
  )
}
export default loading
