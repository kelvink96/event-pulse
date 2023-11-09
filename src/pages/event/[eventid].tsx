import Container from "@/components/Container"
import Layout from "@/layout";
import {useEffect, useState} from "react";
import {deleteEventById, getEventById} from "@/lib/events.ts";
import {EventPulseEvent} from "@/types/events.ts";
import {CalendarIcon, TrashIcon} from "lucide-react";
import {getFilePreviewImageById} from "@/lib/storage.ts";
import {Button} from "@/components/ui/button.tsx";
import {useLocation} from "wouter";
import {useAuth} from "@/hooks/use-auth.tsx";

function EventId({params}: { params: { eventId: string } }) {
  const {isAdmin} = useAuth()
  const [, navigate] = useLocation()
  const [event, setEvent] = useState<EventPulseEvent | undefined>()

  const imageUrl = event?.imageFileId && getFilePreviewImageById(event.imageFileId)

  const image = {
    url: imageUrl,
    alt: event?.name,
    height: event?.imageHeight,
    width: event?.imageWidth
  }

  const handleOnDeleteEvent = async () => {
    if (!event?.$id) return

    await deleteEventById(event.$id)

    navigate('/')
  }

  useEffect(() => {
    (async function run() {
      const {event} = await getEventById(params.eventId)
      setEvent(event)
    })()
  }, [params.eventId]);

  return (
    <Layout>
      <Container>
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
          <div>
            {image.url ?
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              <img src={image?.url} alt={image.alt} height={image.height} width={image.width}
                   className="rounded-lg"/> :
              <CalendarIcon/>
            }
          </div>

          <div className="flex flex-col gap-2.5 items-start">
            {event && (
              <>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{event.name}</h3>
                <p><b>Date:</b>&nbsp;{event.date}</p>
                <p><b>Location:</b>&nbsp;{event.location}</p>
              </>
            )}
          </div>
        </div>
        {isAdmin && (
          <div className="text-right mt-16">
            <Button variant="destructive" onClick={handleOnDeleteEvent}>
              <TrashIcon className="mr-2" size={16}/>
              Delete Event
            </Button>
          </div>
        )}
      </Container>
    </Layout>
  )
}

export default EventId
