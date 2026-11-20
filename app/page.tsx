import Link from "next/link";
import { ArrowRight, BoxesLinkedIcon, Coffee, Waves } from "lucide-react";
import { Button, Separator, Typography } from "@heroui/react";

import Image from "next/image";
import { DiscordIcon, GithubIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <main className="flex min-h-full flex-col">
      <section className="flex flex-1 flex-col items-center justify-center ">
        <Image loading="eager"  src="/icon.svg" alt="Nautarium" width={92} height={92} />

        <Typography
          type="body-xs"
          color="muted"
          weight="semibold"
          className="mb-4 uppercase tracking-[0.2em]"
        >
          Welcome to Nautarium
        </Typography>

        <Typography type="h1" weight="bold" className=" text-balance">
          Explore data.
          <br />
          Discover meaning.
        </Typography>

        <Typography
          type="body"
          color="muted"
          className="mt-6 max-w-md text-center text-balance"
        >
          A workspace for natural language processing, audio analysis, network
          exploration, and data-driven research.
        </Typography>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
  <Link href="/blog">
    <Button
      variant="primary"
      className="bg-accent text-accent-foreground"
    >
      Explore the Blog
      <ArrowRight />
    </Button>
  </Link>

  <a
    href="https://www.buymeacoffee.com/YOUR_USERNAME"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button variant="secondary">
      <Coffee />
      Buy Me a Coffee
    </Button>
  </a>
</div>
      </section>
        <Separator className="my-4" />
<footer className=" px-6 py-5">
  <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
    <Typography type="body-xs" color="muted">
      Nautarium — A space for research and exploration.
    </Typography>

    <div className="flex items-center gap-2">
      <a
        href="https://github.com/dwissaaj/nautarium"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub repository"
      >
        <Button isIconOnly variant="tertiary" aria-label="GitHub">
          <GithubIcon />
        </Button>
      </a>

      <a
        href="https://www.linkedin.com/in/dwi-setyo-aji/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
      >
        <Button isIconOnly variant="tertiary" aria-label="LinkedIn">
          <DiscordIcon />
        </Button>
      </a>
    </div>
  </div>
</footer>
    </main>
  );
}
