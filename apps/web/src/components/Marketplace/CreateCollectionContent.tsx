import { NFT_COLLECTION_HOSTING_REQ_DOC_URL } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export const CreateCollectionContent = () => {
  return (
    <section>
      <div className="rounded-xl border-primary bg-[#99B579] p-4">
        <div className="grid grid-cols-12 items-center gap-2 md:gap-4">
          <div className="col-span-12 sm:col-span-7">
            <Image
              src="/img/avatars/nftsPreview.png"
              width={800}
              height={800}
              alt="nfts preview"
              className="md:-ml-16"
            />
          </div>

          <div className="col-span-12 sm:col-span-5">
            <h2 className="text-xl font-extrabold text-primary lg:text-[40px] lg:leading-tight">
              CREATE YOUR OWN COLLECTION
            </h2>

            <p className="my-3 max-w-[333px] text-base font-semibold leading-snug lg:my-6 lg:text-xl">
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
