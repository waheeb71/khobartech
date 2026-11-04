import Image from "next/image";

export function PhotoFrame({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
}) {
  return (
    <div className={`photo-frame ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={82}
        className="photo-image"
        style={{ objectPosition }}
      />
    </div>
  );
}
