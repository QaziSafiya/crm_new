import { useEffect } from "react";

export default function Steps({ steps, flex, active, setSection, border, importJson }) {
  const json = "Import JSON"

  const margin = `${flex !== "column" ? "3rem": "0rem"}`;
  const styles = { marginLeft: margin };


  return (
    <div className={`flex steps jc-center ${flex === "column" ? "dir-col" : ""}`} style={styles}>
      {importJson && <li
        className={`columns-2-link ${json === active ? border : ""}`}
        onClick={() => {
          setSection(json);
        }}
      >Import Json</li>}
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