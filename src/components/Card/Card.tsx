import Image from "next/image";
import { ICardProps } from "./Card.types";
import Button from "../Button/Button";

const Card = ({
  title,
  description,
  callToActionLabel,
  imageUrl,
  genre,
}: ICardProps) => {
  return (
    <div className="flex-col bg-green-900 max-w-60">
      <Image src={imageUrl} alt={title} width={240} height={200} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{genre}</p>
      {callToActionLabel && <Button label={callToActionLabel} />}
    </div>
  );
};

export default Card;
