import { Link } from "@remix-run/react";

import type { SocialPlatform } from "~/utils/constants";
import {
  contactInfo,
  externalLinks,
  menuItems,
  socialIcons,
  socialPlatforms,
} from "~/utils/constants";
import { capitalize, formatPhoneNumber } from "~/utils/misc";
import type { Images } from "~/utils/sanity-image";
import { CapraImage } from "./capra-image";

interface FooterModuleProps {
  title: string;
  children: React.ReactNode;
}

const FooterModule: React.FC<FooterModuleProps> = ({ title, children }) => (
  <div>
    <h2 className="mb-0.5 text-lg font-bold uppercase text-white">{title}</h2>
    {children}
  </div>
);

interface FooterSocialIconProps {
  platform: SocialPlatform;
}

const ICON_SIZE = 24;

const FooterSocialIcon: React.VFC<FooterSocialIconProps> = ({ platform }) => (
  <FooterLink
    href={externalLinks[platform]}
    external={true}
    title={capitalize(platform)}
  >
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      className="fill-white"
      xmlns="https://www.w3.org/2000/svg"
    >
      {socialIcons[platform]}
    </svg>
  </FooterLink>
);

type FooterLinkProps =
  | {
      external: true;
      title: string;
      children?: React.ReactNode;
      href: `https://${string}`;
    }
  | {
      external?: false;
      title?: never;
      children?: React.ReactNode;
      href: string;
    };

const footerLinkClass = "text-secondary underline block mb-2 mt-1 md:my-0";

const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  external,
  children,
  title,
}) => {
  if (external) {
    return (
      <a
        href={href}
        className={footerLinkClass}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
      >
        {children || href}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link className={footerLinkClass} to={href}>
        {children || href}
      </Link>
    );
  }

  return (
    <a href={href} className={footerLinkClass}>
      {children || href}
    </a>
  );
};

interface FooterProps {
  images: Images<
    "logo-quality-sys-cert-iso-9001" | "logo-miljofyrtaarn" | "logo-ekt"
  >;
}

export const Footer = ({ images }: FooterProps) => (
  <footer className="flex flex-col items-center gap-10 border-none bg-main py-7">
    <section className="flex w-full max-w-6xl flex-col items-start justify-evenly gap-10 px-6 md:flex-row md:gap-0 md:px-0">
      <div className="flex flex-col gap-6">
        <FooterModule title="Besøksadresse">
          <FooterLink
            href={externalLinks.googleMaps}
            external={true}
            title="Adressen til Capra"
          >
            <p>
              {contactInfo.companyAddress.name}
              <br />
              {contactInfo.companyAddress.street}
              <br />
              {contactInfo.companyAddress.postalCode}{" "}
              {contactInfo.companyAddress.city}
            </p>
          </FooterLink>
        </FooterModule>
        <FooterModule title="Kontakt">
          <FooterLink href={externalLinks.mailto}>
            {contactInfo.email}
          </FooterLink>
        </FooterModule>
        <FooterModule title="Telefon">
          <FooterLink href={externalLinks.callUs}>
            {formatPhoneNumber(contactInfo.phoneNumber)}
          </FooterLink>
        </FooterModule>
      </div>
      <div>
        <FooterModule title="Meny">
          <ul className="flex flex-col gap-1">
            {menuItems.map((it) => (
              <li key={it.href}>
                <FooterLink href={it.href}>{it.title}</FooterLink>
              </li>
            ))}
            <li>
              <FooterLink href={externalLinks.aapenhetsloven}>
                Åpenhetsloven
              </FooterLink>
            </li>
          </ul>
        </FooterModule>
      </div>
      <div>
        <FooterModule title="Samarbeidspartner">
          <a
            href="https://www.rideskole.no/"
            target="_blank"
            rel="noopener noreferrer"
            title="EKT Rideskole og Husdyrpark"
          >
            <CapraImage
              className="w-20 rounded bg-white p-1"
              image={images["logo-ekt"]}
            />
          </a>
        </FooterModule>
      </div>
      <div>
        <FooterModule title="Sertifiseringer">
          <div className="flex flex-col gap-2">
            <a
              href="https://rapportering.miljofyrtarn.no/stats/119100"
              target="_blank"
              rel="noopener noreferrer"
              title="Capra er Miljøtårnsertifisert"
            >
              <CapraImage
                className="w-20 rounded bg-white p-1"
                image={images["logo-miljofyrtaarn"]}
              />
            </a>
            <a
              href="https://baproddnvglbcvecert-frontend.azurefd.net/certificate/v3/150234-2014-AQ-NOR-NA"
              target="_blank"
              rel="noopener noreferrer"
              title="Capra er ISO-9001-sertifisert - trykk for å se sertifikat"
            >
              <CapraImage
                className="w-20 rounded bg-white p-1"
                image={images["logo-quality-sys-cert-iso-9001"]}
              />
            </a>
          </div>
        </FooterModule>
      </div>
    </section>
    <section className="flex flex-row justify-center gap-8">
      {socialPlatforms.map((it) => (
        <FooterSocialIcon platform={it} key={it} />
      ))}
    </section>
    <section className="flex flex-row justify-center gap-3 text-xs text-white underline">
      <a href="/personvernerklaering">Personvernerklæring</a>
      <a href="/informasjonskapsler">Informasjonskapsler</a>
    </section>
  </footer>
);
