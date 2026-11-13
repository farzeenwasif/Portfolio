const TitleHeader = ({ title, sub, id }) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {sub && (
        <p className="bg-neutral-800/90 py-2 px-4 rounded-full w-fit text-white text-sm md:text-base">
          {sub}
        </p>
      )}
      <h2
        id={id}
        className="font-bold text-3xl sm:text-4xl md:text-5xl text-white text-balance"
      >
        {title}
      </h2>
    </div>
  );
};

export default TitleHeader;
