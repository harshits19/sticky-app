const loading = () => {
  return (
    <>
      <section className="w-full pb-40 sm:max-w-xl">
        <div className="flex justify-between p-4">
          <div className="h-16 w-16 rounded-full bg-muted shrink-0"></div>
          <div className="flex w-full border-b border-muted-foreground/20"></div>
        </div>
        <div className="flex w-full justify-between border-b border-muted-foreground/20 px-4 pb-2">
          <div className="h-8 w-24 rounded-sm bg-muted"></div>
          <div className="h-8 w-16 rounded-full bg-muted"></div>
        </div>
      </section>
    </>
  )
}
export default loading
