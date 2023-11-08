import {CalendarCheck2} from "lucide-react";
import {Link} from "wouter";

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight flex justify-center items-center gap-1.5">
          <CalendarCheck2/>
          Event pulse
        </h3>
      </a>
    </Link>
  );
};

export default Logo;
