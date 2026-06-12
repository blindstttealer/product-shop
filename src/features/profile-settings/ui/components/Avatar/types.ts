export type AvatarBlockProps = {
  imageSrc: string;
  onPhotoSelected: (file: File | null) => void;
  onPhotoError?: (message: string) => void;
};
