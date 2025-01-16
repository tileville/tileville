import { NFT_COLLECTION_HOSTING_REQ_DOC_URL } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export const CreateCollectionContent = () => {
  return (
    <section>
      <div className="rounded-xl border-primary bg-[#99B579]">
        <div className="grid grid-cols-2 items-center gap-4">
          <div>
            <Image
              src="/img/avatars/nftsPreview.png"
              width={600}
              height={600}
              alt="nfts preview"
              className="-ml-16"
            />
          </div>

          <div>
            <h2 className="text-[40px] font-extrabold text-primary">
              CREATE YOUR OWN COLLECTION
            </h2>

            <p className="my-6 max-w-[333px] text-xl font-semibold">
              Create your unique NFT collection on{" "}
              <b> TILEVILLE MARKETPLACE: </b>
              unleash your creativity now
            </p>

            <div>
              <Link
                className="flex min-h-[60px] w-full max-w-[250px] items-center justify-center rounded-lg bg-primary px-5 py-2 text-base font-bold text-white hover:bg-primary/80"
                href={NFT_COLLECTION_HOSTING_REQ_DOC_URL}
                target="_blank"
              >
                CREATE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
