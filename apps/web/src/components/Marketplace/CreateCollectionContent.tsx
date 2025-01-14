import Image from "next/image"

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
                    <button className="min-h-[60px] rounded-lg bg-primary px-5 py-2 text-base font-bold text-white hover:bg-primary/80 md:min-w-[250px]">
                      CREATE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
  )
}
