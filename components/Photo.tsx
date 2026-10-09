import type { Photo as PhotoT } from "@/lib/content";

/**
 * Foto real quando `src` existe; senão, um espaço reservado com a indicação da foto a usar.
 * A moldura é revelada por máscara ao entrar no ecrã e o conteúdo tem parallax.
 */
export default function Photo({
  photo,
  ratio = "4 / 5",
  className = "",
  cursor = "",
}: {
  photo: PhotoT;
  ratio?: string;
  className?: string;
  cursor?: string;
}) {
  return (
    <figure className={`photo ${className}`} style={{ aspectRatio: ratio }} data-reveal="mask" data-cursor={cursor || undefined}>
      <div className="photo-inner" data-parallax>
        {photo.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        ) : (
          <div className="photo-placeholder-bg" />
        )}
      </div>
      {photo.src ? null : (
        <figcaption className="photo-placeholder">
          <span>Foto a colocar</span>
          {photo.note}
        </figcaption>
      )}
    </figure>
  );
}
