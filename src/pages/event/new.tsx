import Container from "@/components/Container";
import Layout from "@/layout";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {createEvent} from "@/lib/events.ts";
import {useLocation} from "wouter";
import {useState} from "react";
import {uploadFile} from "@/lib/storage.ts";

interface EventPulseImage {
  height: number
  file: File
  width: number
}

const formSchema = z.object({
  eventName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  eventDate: z.date({
    required_error: "An event date is required.",
  }),
  eventLocation: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  eventFile: z.any().nullish()
})

function EventNew() {
  const [, navigate] = useLocation()
  const [image, setImage] = useState<EventPulseImage>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    let file;
    if (image?.file) {
      file = await uploadFile(image.file);
    }

    console.log('file', file)

    const results = await createEvent({
      name: values.eventName,
      location: values.eventLocation,
      date: new Date(values.eventDate).toISOString(),
      imageFileId: file?.$id,
      imageHeight: image?.height,
      imageWidth: image?.width,
    });

    navigate(`/event/${results.event.$id}`)
  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList
    }

    const img = new Image();

    img.onload = function () {
      setImage({
        height: img.height,
        file: target.files[0],
        width: img.width
      })
    }

    img.src = URL.createObjectURL(target.files[0])
  }

  return (
    <Layout>
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16">
        <div className="flex flex-col text-start gap-2">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Create a New Event
          </h2>
          <p>
            Creating an event on EventPulse is a surefire way to elevate your event's success to
            unprecedented heights.
            From concerts to festivals, EventPulse caters to all event types, making it the ideal stage to
            capture the attention of your target audience.
          </p>
          <p>
            Focus on what matters most—delivering an unforgettable experience—and witness your event gain
            momentum like never before on EventPulse.
          </p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-start">
              <FormField
                control={form.control}
                name="eventName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Event name</FormLabel>
                    <FormControl>
                      <Input placeholder="event name" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDate"
                render={({field}) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventLocation"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Event location</FormLabel>
                    <FormControl>
                      <Input placeholder="event name" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventFile"
                render={() => (
                  <FormItem>
                    <FormLabel>Event files</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="event name"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleOnChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Accepted File Types: jpg, png
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </Container>
    </Layout>
  );
}

export default EventNew;
