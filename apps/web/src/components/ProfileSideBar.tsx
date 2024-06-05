import { CrossCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface imgObj {
  id: number;
  url: string;
  age: number;
}

export default function ProfileSideBar({
  handleToggle,
  selectImage,
}: {
  handleToggle: React.MouseEventHandler<HTMLButtonElement>;
  selectImage: any;
}) {
  const images: imgObj[] = [];

  for (let i = 0; i < 9; i++) {
    const obj: imgObj = {
      id: i,
      url: `/img/avatars/${i + 1}.jpeg`,
      age: 20 + i,
    };
    images.push(obj);
  }

  return (
    <div className="p-4 pt-14">
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => {
          return (
            <div
              className="h-30 cursor-pointer overflow-hidden rounded-md"
              key={img.id}
              onClick={() => {
                selectImage(img.url);
              }}
            >
              <Image
                src={img.url}
                width={80}
                height={80}
                alt="profile"
                className="h-full w-full rounded-md object-cover transition-transform hover:scale-110"
              />
            </div>
          );
        })}
      </div>

      <button className="absolute left-3 top-3" onClick={handleToggle}>
        <CrossCircledIcon width={24} height={24} />
      </button>
    </div>
  );
}
