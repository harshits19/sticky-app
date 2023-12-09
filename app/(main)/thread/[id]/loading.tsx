const loading = () => {
  return (
    <>
      <div className="h-12 w-full bg-muted"></div>
      <div className="flex border-b border-muted-foreground/10 p-4">
        <div className="h-10 w-10 shrink-0 rounded-full bg-muted"></div>
        <div className="ml-4 w-full">
          <div className="mt-1 h-4 w-2/5 rounded-sm bg-muted"></div>
          <div className="mt-1 h-3 w-1/3 rounded-sm bg-muted"></div>
          <div className="mt-4 h-3 w-3/5 rounded-sm bg-muted"></div>
          <div className="mt-1 h-3 w-1/3 rounded-sm bg-muted"></div>
          <div className="mt-4 h-6 w-2/5 rounded-md bg-muted"></div>
        </div>
        <div className="h-8 w-8 shrink-0 rounded-full bg-muted"></div>
      </div>
      <div className="flex justify-between p-4">
        <div className="h-12 w-12 shrink-0 rounded-full bg-muted"></div>
        <div className="flex w-full border-b border-muted-foreground/20"></div>
      </div>
      <div className="flex w-full justify-between border-b border-muted-foreground/20 px-4 pb-2">
        <div className="h-8 w-24 rounded-sm bg-muted"></div>
        <div className="h-8 w-16 rounded-full bg-muted"></div>
      </div>
    </>
  )
}
export default loading
