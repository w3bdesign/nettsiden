import React from "react";
import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  V2_MetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { CapraImage } from "~/components/capra-image";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";
import {
  fetchCompanyImages,
  ViJobberMedStoreAktørerINorge,
} from "~/routes/__layout/index";
import {
  ContactForm,
  fetchContactFormRepresentatives,
} from "~/routes/api.contact";
import { cacheControlHeaders } from "~/utils/cache-control";
import { metaTags } from "~/utils/meta-tags";
import { classNames } from "~/utils/misc";
import { fetchImageAssets } from "~/utils/sanity-image";

export async function loader() {
  const [images, contactFormRepresentatives, companyImages] = await Promise.all(
    [
      fetchImageAssets(["photo-whiteboard-hga-sba"]),
      fetchContactFormRepresentatives(),
      fetchCompanyImages(),
    ],
  );

  return json(
    {
      images,
      contactFormRepresentatives,
      companyImages,
    },
    {
      headers: cacheControlHeaders,
    },
  );
}

export const headers: HeadersFunction = () => cacheControlHeaders;

export const meta: V2_MetaFunction<typeof loader> = ({ data }) =>
  metaTags({
    title:
      "Skaper du faktisk forretningsverdi med teknologien i selskapet ditt?",
    description:
      "Få et øyeblikksbilde av hvor godt rigget virksomheten din er for fart, sammen med konkrete forslag til forbedring!",
    image: data.images["photo-whiteboard-hga-sba"].src,
    card: "summary_large_image",
  });

export default function Component() {
  const { images, contactFormRepresentatives, companyImages } =
    useLoaderData<typeof loader>();
  return (
    <>
      <Section>
        <TitleAndText
          title="Skaper du faktisk forretningsverdi med teknologien i selskapet ditt?"
          titleAs="h1"
        >
          Noen ganger kan det være verdifullt å bli evaluert utenfra. Nå tilbyr
          vi gratis smidig helsesjekk slik at du kan finne ut hvordan dere
          ligger an og hva deres potensiale for å øke verdiskapningen er!
        </TitleAndText>
        <Button width="content" variant="solid" href="#kontakt-skjema">
          Få en smidig helsesjekk her!
        </Button>
      </Section>

      <Section>
        <CapraImage
          className="w-screen max-w-7xl"
          image={images["photo-whiteboard-hga-sba"]}
        />

        <InformationCard className="flex w-screen max-w-7xl flex-col items-center bg-light-blue-20">
          Capra har siden 2005 spesialisert seg på smidig utvikling,
          transformasjon og ledelse i noen av Norges største virksomheter,
          inkludert vår egen.
        </InformationCard>
      </Section>

      <Section>
        <TitleAndText title="Hva er en smidig helsesjekk?" titleAs="h2">
          En smidig helsesjekk gir deg et øyeblikksbilde av hvor godt rigget
          virksomheten din er for fart, sammen med konkrete forslag til
          forbedring.
        </TitleAndText>
        <Button width="content" variant="solid" href="#kontakt-skjema">
          Book gratis smidig helsesjekk
        </Button>
      </Section>
      <Todo size="large" title="Steg bokser" />
      <Section>
        <InformationCard className="flex w-screen max-w-7xl flex-col items-center bg-peach-20">
          Med vår smidig helsesjekk følger det{" "}
          <strong className="font-bold text-red">ingen forpliktelser.</strong>{" "}
          Det skal sies at vi er såpass trygge på vår ekspertise at vi tror og
          håper dere vil fortsette samarbeidet i dag eller i fremtiden.
        </InformationCard>

        <Button width="content" variant="solid" href="/dette-kan-vi">
          Oversikt over alle tjenester
        </Button>
      </Section>

      <div className="w-screen">
        <ContactForm
          title="Ta kontakt!"
          description="Fyll ut skjemaet så kontakter vi deg for en gratis smidig helsesjekk uten forpliktelser! Flere spørsmå? Ta kontakt med Tuva."
          representatives={contactFormRepresentatives.filter((representative) =>
            representative.name.includes("Tuva"),
          )}
        />
      </div>

      <Section>
        <ViJobberMedStoreAktørerINorge companyImages={companyImages} />
      </Section>
    </>
  );
}

const InformationCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={classNames(className, "py-16 px-6 text-secondary")}>
      <div className="max-w-3xl">
        <p className="text-center text-lg lg:text-left">{children}</p>
      </div>
    </div>
  );
};
