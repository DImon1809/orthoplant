export const checkLogoInTitle = (title: string) => {
  const style = {
    background: "linear-gradient(to right, #7d550a, #e39b13)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const arr: string[] = JSON.parse(JSON.stringify(title)).split(" ");

  const index = arr.findIndex((t) => t === "ORTHOPLANT");

  if (index < 0) return title.toUpperCase();

  arr.splice(index, 1);

  return (
    <>
      {`${arr.join(" ").toUpperCase()}`} <span style={style}>ORTHOPLANT</span>
    </>
  );
};
