const loading = () => {
  return (
    <>
      <div className="h-12 w-full bg-muted"></div>
      <div className="flex h-14 w-full gap-x-1 p-2">
        <div className="w-full border border-muted-foreground/10"></div>
        <div className="w-12 rounded-md bg-muted"></div>
      </div>
      <div className="flex border-b border-muted-foreground/10 p-4">
        <div className="h-10 w-10 shrink-0 rounded-full bg-muted"></div>
        <div className="ml-4 w-full">
          <div className="mt-1 h-4 w-2/3 rounded-sm bg-muted"></div>
          <div className="mt-2 h-3 w-1/3 rounded-sm bg-muted"></div>
        </div>
        <div className="h-8 w-20 rounded-full bg-muted"></div>
      </div>
      <div className="flex border-b border-muted-foreground/10 p-4">
        <div className="h-10 w-10 shrink-0 rounded-full bg-muted"></div>
        <div className="ml-4 w-full">
          <div className="mt-1 h-4 w-2/3 rounded-sm bg-muted"></div>
          <div className="mt-2 h-3 w-1/3 rounded-sm bg-muted"></div>
        </div>
        <div className="h-8 w-20 rounded-full bg-muted"></div>
      </div>
    </>
  )
}
export default loading
