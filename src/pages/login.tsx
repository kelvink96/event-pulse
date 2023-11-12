import Container from "@/components/Container";
import Layout from "@/layout";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {CheckCircleIcon} from "lucide-react";
import {useAuth} from "@/hooks/use-auth.tsx";
import {Redirect} from "wouter";
import ErrorAlert from "@/components/ErrorAlert";

const formSchema = z.object({
  email: z.coerce.string().email().min(5, {
    message: "Name must be at least 5 characters.",
  })
})

function Login() {
  const {logIn, session} = useAuth()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    await logIn(values.email)

    setSent(true)
  }

  if (session) {
    return <Redirect to="/"/>
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')

    if (error === "user_unauthorized") {
      setError("Your login session, please try again.")
    }
    if (error === "general_unknown") {
      setError("An unknown error occurred while submitting your event")
    }
  }, []);

  return (
    <Layout>
      <Container className="flex flex-col gap-2 items-center">
        {!sent && (
          <Card className="w-[360px]">
            <CardHeader>
              <CardTitle>
                Log In
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && <ErrorAlert message={error}/>}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 text-start flex flex-col mx-auto"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" type="email" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
        {sent && (
          <Alert variant="default" className="w-[360px]">
            <CheckCircleIcon className="h-4 w-4"/>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your login was sent
            </AlertDescription>
          </Alert>
        )}
      </Container>
    </Layout>
  );
}

export default Login;
