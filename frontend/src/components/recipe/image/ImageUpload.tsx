/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import ImagePreview from './ImagePreview';

export default function ImageUpload({
  imageList,
  setImageList,
  image,
  setImage,
  setImageId,
}: {
  image: File | null | undefined;
  setImage: any;
  imageList: string[];
  setImageList: any;
  setImageId: any;
}) {
  const submitImage = async () => {
    const imageId = `${Date.now()}-${image?.name}`;
    const newImageList = [imageId];
    if (image) {
      await setImageList(newImageList);
      await setImageId(imageId);
    }
  };

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageList([]);
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col w-[350px]">
      <span className="mt-8 mb-4 text-ston-brown self-start font-bold text-xl">
        Add Image
      </span>
      <input
        className="max-w-[350px] m-auto mb-4"
        type="file"
        accept="image/*"
        onChange={onInputChange}
      />
      <ImagePreview image={image} imageList={imageList} />
      {!imageList[0] && (
        <button
          className="m-auto my-6 w-48 bg-ston-green font-bold"
          type="button"
          onClick={() => submitImage()}
        >
          Submit Image
        </button>
      )}
    </div>
  );
}
