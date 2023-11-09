import Container from "@/components/Container";
import {useEffect} from "react";
import {verifySession} from "@/lib/auth.ts";
import {useLocation} from "wouter";

function Session() {
  const [, navigate] = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId');
    const secret = params.get('secret');

    if (!userId || !secret) {
      navigate('/login')
      return;
    }

    (async function run() {
      await verifySession(userId, secret)
      navigate('/')
    })()
  }, []);

  return (
    <Container>
      <p>logging you in</p>
    </Container>
  );
}

export default Session;
