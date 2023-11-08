import Container from "@/components/Container"

import events from '@/data/events.json';
import Layout from "@/layout";

function EventId() {
  const event = events[0];
  const image = {
    url: events[0].imageUrl,
    alt: ''
  };

  return (
    <Layout>
      <Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          {image.url && (
            <img src={image.url} alt={image.alt} width={800} height={450} className="block rounded"/>
          )}
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
