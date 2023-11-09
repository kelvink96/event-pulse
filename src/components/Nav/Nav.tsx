import {Link} from 'wouter';
import Container from '@/components/Container';
import Logo from "@/components/Logo";
import {Button} from "@/components/ui/button.tsx";
import {LogInIcon, LogOutIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {deleteCurrentSession, getCurrentSession} from "@/lib/auth.ts";
import {Models} from "appwrite";

const Nav = () => {
  const [session, setSession] = useState<Models.Session>()

  const handleOnLogOut = async () => {
    await deleteCurrentSession()
    setSession(undefined)
  }

  useEffect(() => {
    (async function run() {
      const data = await getCurrentSession()

      setSession(data.session)
    })()
  }, []);

  return (
    <nav>
      <Container className="py-2 mb-4 flex justify-between items-center border-b">
        <Logo/>
        <p className="flex justify-center gap-4">
          {session ?
            <Button variant="ghost" onClick={handleOnLogOut}>
              <LogOutIcon size={16} className="mr-2"/>
              Log out
            </Button> :
            <Button asChild variant="ghost">
              <Link href="/login">
                <LogInIcon size={16} className="mr-2"/>
                Log in
              </Link>
            </Button>
          }
        </p>
      </Container>
    </nav>
  )
}

export default Nav;
