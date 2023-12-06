import Navbar from "@/components/shared/Navbar"
import NotificationCard from "@/components/cards/NotificationCard"
import { getAllNotifications } from "@/lib/actions/notification.actions"
import { NotificationProps } from "@/types"

const NotificationPage = async () => {
  const notifications = await getAllNotifications()
  return (
    <div>
      <Navbar navTitle="Notifications" />
      <div className="flex flex-col">
        {notifications?.map((notification: NotificationProps) => {
          return (
            <NotificationCard
              notification={notification}
              key={notification._id}
            />
          )
        })}
      </div>
    </div>
  )
}
export default NotificationPage
