import Link from "next/link";
import { ArrowRight, Coffee } from "lucide-react";
import { Button, Separator, Typography } from "@heroui/react";
import Image from "next/image";

import { DiscordIcon, GithubIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <main className="flex min-h-full flex-col">
      <section className="flex flex-1 flex-col items-center justify-center ">
        <Image
          alt="Nautarium"
          height={92}
          loading="eager"
          src="/icon.svg"
          width={92}
        />

        <Typography
          className="mb-4 uppercase tracking-[0.2em]"
          color="muted"
          type="body-xs"
          weight="semibold"
        >
          Welcome to Nautarium
        </Typography>

        <Typography className=" text-balance" type="h1" weight="bold">
          Explore data.
          <br />
          Discover meaning.
        </Typography>

        <Typography
          className="mt-6 max-w-md text-center text-balance"
          color="muted"
          type="body"
        >
          A workspace for natural language processing, audio analysis, network
          exploration, and data-driven research.
        </Typography>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/blog">
            <Button
              className="bg-accent text-accent-foreground"
              variant="primary"
            >
              Explore the Blog
              <ArrowRight />
            </Button>
          </Link>

          <a
            href="https://www.buymeacoffee.com/YOUR_USERNAME"
            rel="noopener noreferrer"
            target="_blank"
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
          <Typography color="muted" type="body-xs">
            Nautarium — A space for research and exploration.
          </Typography>

          <div className="flex items-center gap-2">
            <a
              aria-label="GitHub repository"
              href="https://github.com/dwissaaj/nautarium"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button isIconOnly aria-label="GitHub" variant="tertiary">
                <GithubIcon />
              </Button>
            </a>

            <a
              aria-label="LinkedIn profile"
              href="https://www.linkedin.com/in/dwi-setyo-aji/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button isIconOnly aria-label="LinkedIn" variant="tertiary">
                <DiscordIcon />
              </Button>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
