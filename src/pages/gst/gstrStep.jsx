export default function Steps({ steps, flex, active, setSection, border }) {
  return (
    <div className={`flex jc-center ${flex === "column" ? "dir-col" : ""}`}>
      {steps.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            setSection(item);
          }}
          className={`columns-2-link ${item === active ? border : ""}`}
        >
          {item}
        </li>
      ))}
    </div>
  );
}