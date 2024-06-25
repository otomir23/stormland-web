import { shuffle } from "@/util"
import Image from "next/image"
import path from "path"
import { readdir } from "fs/promises"

export default async function Gallery({
    className = "",
    count = 6,
}: {
    className?: string,
    count?: number,
}) {
    const galleryPath = path.join(process.cwd(), "public", "gallery")
    const imageNames = await readdir(galleryPath)

    const gallery = shuffle(imageNames).slice(0, count)
    return (
        <div
            className={`grid h-min max-h-min grid-cols-3 grid-rows-4 gap-2 sm:gap-4 lg:gap-8 ${className}`}
        >
            {gallery.map((img, i) => (
                <Image
                    src={"/gallery/" + img}
                    alt={img}
                    key={i}
                    width={1024}
                    height={1024}
                    quality={100}
                    className={`${
                        i % 6 === 4 || i % 6 === 0
                            ? "col-span-2 row-span-2"
                            : ""
                    } aspect-square rounded-lg object-cover`}
                />
            ))}
        </div>
    )
}
