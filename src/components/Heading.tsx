type HeadingProps = {
  heading: string;
  description: string;
};

const Heading = ({ heading, description }: HeadingProps) => {
  return (
    <div className="flex items-start flex-col">
      <h1 className="text-black!">{heading}</h1>
      <p className="font-Outfit text-black/60">{description}</p>
    </div>
  );
};

export default Heading;
