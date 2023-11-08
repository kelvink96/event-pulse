import Container from '@/components/Container';

const Footer = () => {
  return (
    <footer className="mt-20">
      <Container className="p-6">
        <p className="text-center text-slate-500">
          Event Pulse by <a className="underline font-medium text-inherit" href="https://twitter.com/kelvink_96">Kelvin Kiprop</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
