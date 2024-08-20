import axios from "axios";

export async function pinFile(params: {
  file: File;
  keyvalues: { [key: string]: string };
}): Promise<string | undefined> {
  const { file, keyvalues } = params;
  try {
    const formData = new FormData();
    const metadata = {
      name: file.name,
      keyvalues: {
        ...keyvalues,
        mimeType: file.type,
        size: file.size.toString(),
        filename: file.name ?? "",
      },
    };
    formData.append("file", file);
    formData.append("pinataMetadata", JSON.stringify(metadata));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
    const endpoint = process.env.NEXT_PUBLIC_IPFS_URL;
    if (endpoint === undefined) throw new Error("IPFS URL is undefined");
    const key = process.env.NEXT_PUBLIC_PINATA_JWT;
    if (key === undefined) throw new Error("IPFS Key is undefined");
    const headers = {
      "Content-Type": `multipart/form-data`,
      Authorization: "Bearer " + key,
    };
    console.log("pinFile", { endpoint, key, metadata, headers, formData });

    const response = await axios.post(endpoint, formData, {
      maxBodyLength: Infinity,
      headers,
    });
    if (response?.data?.IpfsHash) {
      console.log("pinFile response", response.data);
      return response.data.IpfsHash;
    } else {
      console.error("pinFile error 1", response.data.error);
      return undefined;
    }
  } catch (err) {
    console.error("pinFile error 2 - catch", err);
    return undefined;
  }
}

class File extends Blob {
  name;
  lastModified;
  constructor(fileBits: any, fileName: string, options: any = {}) {
    super(fileBits, options);
    this.name = fileName;
    this.lastModified = options.lastModified || Date.now();
  }
}

export const createFileFromImageUrl = async ({
  image_url,
  name,
}: {
  image_url: string;
  name: string;
}): Promise<File | null> => {
  try {
    const response = await fetch(image_url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileType = "image/png";
    const file = new File([buffer], name, {
      type: fileType,
      lastModified: new Date().getTime(),
    });
    return file;
  } catch (error) {
    console.error("Error creating file from URL:", error);
    return null;
  }
};
