import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { Locale } from "@/lib/content";
import { aboutCopy } from "@/lib/copy/about";

const GALLERY_DIR = join(process.cwd(), "public", "about");

export function AboutGallery({ locale }: { locale: Locale }) {
  const copy = aboutCopy[locale];

  return (
    <section
      className="about-gallery section-pad"
      aria-labelledby="about-gallery-title"
    >
      <h2 id="about-gallery-title">{copy.galleryTitle}</h2>
      <p className="about-gallery-intro">{copy.galleryIntro}</p>
      <ul className="about-gallery-grid">
        {copy.gallery.map((image, index) => {
          const available = existsSync(join(GALLERY_DIR, image.file));
          return (
            <li key={image.file} className="about-gallery-item">
              {available ? (
                <Image
                  src={`/about/${image.file}`}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 767px) 90vw, (max-width: 1100px) 45vw, 320px"
                  loading="lazy"
                />
              ) : (
                <div
                  className={`about-gallery-placeholder placeholder-${index % 4}`}
                  role="img"
                  aria-label={image.alt}
                />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
