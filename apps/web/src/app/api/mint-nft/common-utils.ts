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
