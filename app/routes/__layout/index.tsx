import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Button } from "~/components/button";
import { ContentAndImageBox } from "~/components/content-and-image-box";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";
import { TypingText } from "~/components/typing-text";
import type { CapraHandle } from "~/types";
import { fetchImageAssets } from "~/utils/dataRetrieval";

export const meta: MetaFunction = () => ({
  title: "Capra Consulting: IT-konsulenter med ekspertise i software",
  ogTitle: "Capra Consulting: IT-konsulenter med ekspertise i software",
  description:
    "Vi er IT-konsulenter innen softwareutvikling og Norges beste på sky. I Capra har vi høy kvalitet på våre ansatte, og det vil vi fortsette med. Bli med oss!",
});

export const loader = async () => {
  const images = await fetchImageAssets(["tech", "aws"]);
  return json({ images });
};

export const handle: CapraHandle = {
  contactFormTitle: "Vil du vite mer om hvordan vi kan hjelpe deg?",
};

export default function Index() {
  const { images } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex flex-col gap-12 w-full">
        <TitleAndText
          title={
            <>
              Vi er norges beste på{" "}
              <TypingText
                text={[
                  "AWS",
                  "selvskryt",
                  "java",
                  "vaffelspising",
                  "javascript",
                  "smash",
                  "agile",
                  "bordtennis",
                ]}
              />
            </>
          }
          titleAs="h1"
        >
          Bold statement? Absolutt.
        </TitleAndText>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" href="/dette-kan-vi">
            Bli kunde?
          </Button>
          <Button variant="outline" href="/bli-en-av-oss">
            Jobb hos oss!
          </Button>
        </div>
      </div>

      <TitleAndText title="Hva trenger du?" titleAs="h2">
        Vi elsker å løse komplekse problemer, men vi vet at en enkelt
        arbeidsmetode ikke passer alle. Derfor tilbyr vi to måter å løse
        utfordringene dine!
      </TitleAndText>

      <div className="max-w-4xl w-11/12 flex gap-4 flex-col-reverse md:flex-row">
        <Todo title="Liflig" className="flex-1" style={{ minHeight: 340 }}>
          Du har ideene - la vårt inhouse team bygge og forvalte hele tjenesten
          for deg
        </Todo>
        <div className="flex-1 grid grid-cols-2 gap-2">
          <CardModule
            title="Vi tar det tekniske"
            className="bg-bordeaux text-white"
          />
          <CardModule
            title="Kompetanse på laget"
            className="bg-bordeaux text-white"
          />
          <CardModule
            title="Kort oppstartstid"
            className="bg-bordeaux text-white"
          />
          <CardModule
            title=""
            illustration={
              <div className="h-full w-full bg-gradient-to-r from-red-200 to-fuchsia-500" />
            }
          />
        </div>
      </div>

      <div className="max-w-4xl w-11/12 flex gap-4 flex-col-reverse md:flex-row-reverse">
        <Todo title="Konsulenter" className="flex-1" style={{ minHeight: 340 }}>
          Trenger du flere gode hoder på teamet ditt? Vi gir deg IT-konsulenter
          med spisskompetanse!
        </Todo>
        <div className="flex-1 grid grid-cols-2 gap-2">
          <CardModule
            title="Opp i skyen"
            className="bg-light-blue text-slate-800"
          />
          <CardModule
            title="Vi tør å rådgi"
            className="bg-light-blue text-slate-800"
          />
          <CardModule
            title="Faglig sterke"
            className="bg-light-blue text-slate-800"
          />
          <CardModule
            title=""
            illustration={
              <div className="h-full w-full bg-gradient-to-r from-sky-200 to-slate-500" />
            }
          />
        </div>
      </div>

      <ContentAndImageBox
        title="Vi er Advanced Tier Consulting Partner"
        image={<img src={images.aws.imageUrl} alt={images.aws.alt} />}
        height="32vw"
        contentBoxClassName="bg-peach"
      >
        Vi er et av fire norske selskaper som kan kalle seg AWS-Partner!
      </ContentAndImageBox>
      <ContentAndImageBox
        title="Vi er spesialister"
        image={
          <img
            className="w-full h-full object-contain overflow-hidden"
            src={images.tech.imageUrl}
            alt={images.tech.alt}
          />
        }
        height="35vw"
        direction="right"
        contentBoxClassName="bg-light-blue"
      >
        Ingen kan være best i alt! Derfor spesialiserer vi oss på utvalgte
        markedsledenede teknologier.
      </ContentAndImageBox>

      <Todo title="Fancy Vi har kickass folk" className="h-60" />
      <Todo title="Vi jobber med store aktører i Norge">
        <div className="flex flex-wrap gap-4">
          <Todo title="Bilde fra sanity" className="h-40 w-40" />
          <Todo title="Bilde fra sanity" className="h-40 w-40" />
          <Todo title="Bilde fra sanity" className="h-40 w-40" />
          <Todo title="Bilde fra sanity" className="h-40 w-40" />
        </div>
      </Todo>
    </>
  );
}

interface CardModuleProps {
  title: React.ReactNode;
  illustration?: React.ReactNode;
  className?: string;
}

const CardModule = ({ title, illustration, className }: CardModuleProps) => {
  return (
    <Todo
      display="inline-flex"
      className={`p-0 aspect-square border-none overflow-hidden rounded ${className}`}
      title=""
    >
      {illustration}
      <div className="font-semibold">{title}</div>
    </Todo>
  );
};
