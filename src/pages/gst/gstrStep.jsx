export default function Steps({ steps, flex, active, setSection }) {
  return (
    <ul className={`flex ${flex === "row" ? "dir-row" : "dir-col"}`}>
      {steps.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            setSection(item);
          }}
          className={`${item === active ? ".bg" : ""}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}