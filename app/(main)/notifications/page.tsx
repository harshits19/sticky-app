import { Metadata } from "next"
import Navbar from "@/components/shared/Navbar"
import NotificationCard from "@/components/cards/NotificationCard"
import { getAllNotifications } from "@/lib/actions/notification.actions"
import { Notification } from "@/types"

export const metadata: Metadata = {
  title: "Notifications",
}

const NotificationPage = async () => {
  const notifications = await getAllNotifications()
  return (
    <>
      <Navbar navTitle="Notifications" />
      <div className="flex flex-col">
        {notifications?.length === 0 ? (
          <div className="px-4 pt-6 text-center">
            <p className="text-xl font-bold">No new notifications</p>
            <p className="text-sm">Roll a thread</p>
          </div>
        ) : (
          notifications?.map((notification: Notification) => {
            return (
              <NotificationCard
                notification={notification}
                key={notification._id}
              />
            )
          })
        )}
      </div>
    </>
  )
}
export default NotificationPage
