import Container from "@/components/Container"
import Layout from "@/layout";
import {useEffect, useState} from "react";
import {getEventById} from "@/lib/events.ts";
import {EventPulseEvent} from "@/types/events.ts";
import {CalendarIcon} from "lucide-react";

function EventId({params}: { params: { eventId: string } }) {
  const [event, setEvent] = useState<EventPulseEvent | undefined>()

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
          {/*{image.url && (
            <img src={image.url} alt={image.alt} width={800} height={450} className="block rounded"/>
          )}*/}
          <CalendarIcon/>
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
