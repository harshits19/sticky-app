import { Post } from "@/types"

const LoadmoreBtn = (loadMore: () => Promise<void>) => {
  return <button onClick={loadMore}>Lode More Posts</button>
}
export default LoadmoreBtn
