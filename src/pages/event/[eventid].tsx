import Container from "@/components/Container"
import Layout from "@/layout";
import {useEffect, useState} from "react";
import {getEventById} from "@/lib/events.ts";
import {EventPulseEvent} from "@/types/events.ts";
import {CalendarIcon} from "lucide-react";
import {getFilePreviewImageById} from "@/lib/storage.ts";

function EventId({params}: { params: { eventId: string } }) {
  const [event, setEvent] = useState<EventPulseEvent | undefined>()

  const imageUrl = event?.imageFileId && getFilePreviewImageById(event.imageFileId)

  const image = {
    url: imageUrl,
    alt: event?.name,
    height: event?.imageHeight,
    width: event?.imageWidth
  }

  useEffect(() => {
    (async function run() {
      const {event} = await getEventById(params.eventId)
      setEvent(event)
    })()
  }, [params.eventId]);

  return (
    <Layout>
      <Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          {image.url ?
            <img src={image?.url} alt={image.alt} height={image.height} width={image.width} className="rounded-lg"/> :
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
      </Container>
    </Layout>
  )
}

export default EventId
