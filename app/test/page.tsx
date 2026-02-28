import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";

import {
  Frame,
  FrameDescription,
  FrameHeader,
  FrameTitle,
} from "@/components/ui/frame";

const frameworkOptions = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
];

export default function Particle() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Frame className="w-full max-w-xs">
        <FrameHeader>
          <FrameTitle>Create project</FrameTitle>
          <FrameDescription>
            Deploy your new project in one-click.
          </FrameDescription>
        </FrameHeader>
        <Card>
          <CardContent>
            <div className="text-primary">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
              impedit consequuntur harum at, ipsa mollitia nemo laborum natus
              sapiente culpa voluptates aut numquam ab. Eos fugit voluptatem
              dolor incidunt iste.
            </div>
          </CardContent>
        </Card>
      </Frame>
    </div>
  );
}
