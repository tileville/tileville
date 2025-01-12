import Image from "next/image";

const NFTCollections = [
  {
    name: "Tileville",
    imageUrl:
      "https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_profile.png",
  },
  {
    name: "MINATY",
    imageUrl:
      "https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/minaty_profile.png",
  },
  {
    name: "MINAPUNKS",
    imageUrl:
      "https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/minapunks_profile.png",
  },

  {
    name: "zkgod",
    imageUrl:
      "https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/zkgod_profile.png",
  },
];

export const TopNFTCollections = () => {
  return (
    <section className="mb-6">
      <h2 className="text-[28px] font-bold text-primary underline">
        Top NFT COLLECTIONS
      </h2>

      <div className="mt-4">
        <div className="grid grid-cols-6 gap-6 text-center">
          {NFTCollections.map((collection) => {
            return (
              <div
                className="flex flex-col items-center rounded-[10px] border-2 border-primary p-2"
                key={collection.name}
              >
                <div className="h-[140px] w-[140px]">
                  <Image
                    src={collection.imageUrl}
                    alt="Logo"
                    width={140}
                    height={140}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mb-3 text-2xl font-extrabold text-black">
                  {collection.name}
                </h3>

                <button className="h-11 w-full rounded-lg bg-primary px-3 text-base font-bold text-white">
                  Explore
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
