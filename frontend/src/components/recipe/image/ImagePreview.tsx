import { useState, useEffect } from 'react';

type Props = { image: File | null | undefined; imageList: string[] };

export default function ImagePreview({ image, imageList }: Props) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    if (image) {
      setImagePreviewUrl(URL.createObjectURL(image));
    }
  }, [image]);

  return (
    imageList[0] && (
      <div>
        <img className="rounded-2xl" src={imagePreviewUrl} alt="preview" />
      </div>
    )
  );
}
