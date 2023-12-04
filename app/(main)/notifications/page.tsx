import { getAllActivities } from "@/lib/actions/activity.actions"
import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"

const NotificationPage = async () => {
  const replies = await getAllActivities()
  // console.log(replies)
  return <div>NotificationPage</div>
}
export default NotificationPage
