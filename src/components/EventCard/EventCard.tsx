import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {EventPulseEvent} from "@/types/events.ts";
import {CalendarIcon} from "lucide-react";

type Props = {
  event: EventPulseEvent
}

const EventCard = ({event}: Props) => {
  const {date, name, location} = event

  return (
    <Card>
      <CardHeader>
        {/*<img src={imageUrl} alt={name} height={imageHeight} width={imageWidth}/>*/}
        <CalendarIcon/>
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
