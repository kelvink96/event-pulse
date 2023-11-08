import {useEffect, useState} from "react";
import Layout from "@/layout";
import Container from "@/components/Container";
import {Button} from "@/components/ui/button.tsx";
import {CalendarPlus} from "lucide-react";
import {Link} from "wouter";
import EventCard from "@/components/EventCard";
import {EventPulseEvent} from "@/types/events.ts";
import {getEvents} from "@/lib/events.ts";

function Home() {
  const [events, setEvents] = useState<EventPulseEvent[] | undefined>([])

  useEffect(() => {
    (async function run() {
      const {events} =  await getEvents()

      setEvents(events)
    })()
  }, []);

  return (
    <Layout>
      {Array.isArray(events) && events.length > 0 && (
        <>
          <Container className="flex justify-between items-center mb-10">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Upcoming events
            </h2>
            <Button asChild>
              <Link href="/events/new">
                <a className="flex gap-1.5 items-center">
                  <CalendarPlus size={16}/>Add event
                </a>
              </Link>
            </Button>
          </Container>
          <Container>
            <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events.map((event) => {
                return (
                  <Link key={event.name} href={`/event/${event.$id}`}>
                    <a>
                      <EventCard event={event}/>
                    </a>
                  </Link>
                )
              })}
            </div>
          </Container>
        </>
      )}
    </Layout>
  );
}

export default Home;
