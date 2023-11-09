import Container from "@/components/Container";
import {useEffect} from "react";
import {useLocation} from "wouter";
import {useAuth} from "@/hooks/use-auth.tsx";
import {AppwriteException} from "appwrite";

function Session() {
  const [, navigate] = useLocation()
  const {verifySession} = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId');
    const secret = params.get('secret');

    if (!userId || !secret) {
      navigate('/login')
      return;
    }

    (async function run() {
      try {
        await verifySession({userId, secret})
        navigate('/')
      } catch (error: unknown) {
        if(error instanceof AppwriteException){
          navigate(`/login?error=${error.type}`)
        }
      }
    })()
  }, []);

  return (
    <Container>
      <p>logging you in</p>
    </Container>
  );
}

export default Session;
