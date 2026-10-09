import type { Photo as PhotoT } from "@/lib/content";

/** Foto real quando `src` existe; senão, um espaço reservado com a indicação da foto a usar. */
export default function Photo({ photo, ratio = "4 / 5", className = "" }: { photo: PhotoT; ratio?: string; className?: string }) {
  return (
    <figure className={`photo ${className}`} style={{ aspectRatio: ratio }}>
      {photo.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo.src} alt={photo.alt} loading="lazy" />
      ) : (
        <figcaption className="photo-placeholder">
          <span>Foto a colocar</span>
          {photo.note}
        </figcaption>
      )}
    </figure>
  );
}
