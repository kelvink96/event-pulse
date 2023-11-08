import {Link} from 'wouter';

import Container from '@/components/Container';
import Logo from "@/components/Logo";
import {Button} from "@/components/ui/button.tsx";
import {LogIn} from "lucide-react";

const Nav = () => {
  return (
    <nav>
      <Container className="py-2 mb-4 flex justify-between items-center border-b">
        <Logo/>
        <p className="flex justify-center gap-4">
          {/* <button className="font-medium hover:text-[#535bf2] cursor-pointer">Log Out</button>   */}
          <Button asChild variant="ghost">
            <Link href="/login" className="flex gap-2">
              <LogIn size={16}/>
              Log in
            </Link>
          </Button>
        </p>
      </Container>
    </nav>
  )
}

export default Nav;
