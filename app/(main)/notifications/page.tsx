import Navbar from "@/components/shared/Navbar"
import NotificationCard from "@/components/cards/NotificationCard"
import { getAllNotifications } from "@/lib/actions/notification.actions"

const NotificationPage = async () => {
  const notifications = await getAllNotifications()
  return (
    <div>
      <Navbar />
      <div className="flex flex-col">
        {notifications?.map((notification, idx) => {
          return (
            <NotificationCard
              notification={notification}
              key={notification._id.toString()}
            />
          )
        })}
      </div>
    </div>
  )
}
export default NotificationPage
