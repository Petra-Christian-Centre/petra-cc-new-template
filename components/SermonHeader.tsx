type SermonHeaderProps = {
  eyebrowText?: string;
  title?: string | string[];
  containerClassName?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  titleLevel?: "h1" | "h2" | "h3";
};

const SermonHeader = ({
  eyebrowText = "SERMONS",
  title = ["Latest Rain", "Conference", "Sermons"],
  containerClassName = "mb-12",
  eyebrowClassName = "text-2xl font-[600] mb-2 text-black",
  titleClassName = "text-4xl md:text-5xl font-jedira-regular text-black md:mt-20 mt-10",
  titleLevel = "h3",
}: SermonHeaderProps) => {
  const titleLines = Array.isArray(title) ? title : title.split("\n").filter(Boolean);
  const TitleTag = titleLevel;

  return (
    <div className={containerClassName}>
      <h2 className={eyebrowClassName}>{eyebrowText}</h2>
      <TitleTag className={titleClassName}>
        {titleLines.map((line, index) => (
          <span key={line + index}>
            {line}
            {index < titleLines.length - 1 ? <br /> : null}
          </span>
        ))}
      </TitleTag>
    </div>
  );
};

export default SermonHeader;