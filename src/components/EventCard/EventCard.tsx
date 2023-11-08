import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

type Props = {
  event: {
    date: string
    imageHeight: number
    imageUrl: string
    imageWidth: number
    location: string
    name: string
  }
}

const EventCard = ({event}: Props) => {
  const {date, name, location, imageUrl, imageWidth, imageHeight} = event

  return (
    <Card>
      <CardHeader>
        <img src={imageUrl} alt={name} height={imageHeight} width={imageWidth}/>
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
