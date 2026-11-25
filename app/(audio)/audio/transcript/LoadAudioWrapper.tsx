import { Button, Card, Input, Typography } from "@heroui/react";
import { Database, FilePlus2, FolderOpen, FolderPlus } from "lucide-react";

export default function LoadAudioWrapper() {
  return (
    <div>
      <section className="font-mono grid gap-4 md:grid-cols-2">
        <Card className="border border-default-500 bg-background transition  duration-300 hover:bg-accent/20 shadow-sm">
          <Card.Header className="flex flex-row items-center gap-3 px-5 pt-5">
            

            <div className="flex flex-col gap-1">
              <Typography className="font-semibold" type="h3">
                Load an audio file
              </Typography>
              <Typography className="font-semibold" type="h6">
                Target Audio
              </Typography>
            </div>
          </Card.Header>

          <Card.Content className="space-y-4 px-5 py-5">
            <Button
              className="w-full"

            >
              <FilePlus2 className="size-4" />
              Find a file
            </Button>
          </Card.Content>
        </Card>
        
      </section>

    </div>
  );
}
