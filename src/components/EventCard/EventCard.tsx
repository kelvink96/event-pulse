import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {EventPulseEvent, EventPulseImagePreview} from "@/types/events.ts";
import {CalendarIcon} from "lucide-react";

type Props = {
  event: EventPulseEvent
  image?: EventPulseImagePreview
}

const EventCard = ({event, image}: Props) => {
  const {date, name, location} = event

  return (
    <Card>
      <CardHeader>
        {image?.url ?
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // ts-expect-error
          <img src={image?.url} alt={name} height={image?.height} width={image?.width}/> :
          <CalendarIcon/>
        }
      </CardHeader>
      <CardContent className="flex flex-col justify-start items-start gap-2">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-start">
          {new Date(date).toLocaleDateString('en-us', {month: "long", day: "numeric"})}
          &nbsp;/&nbsp;
          {location}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default EventCard
