import React, { useState } from "react";

const Cities = [
  { label: "ATP", value: "ATP" },
  { label: "HYD", value: "HYD" },
  { label: "BNGLR", value: "BNGLR" },
  { label: "KL", value: "KL" },
];
function Select({ multiSelect }) {
  const [selectedValue, setSelectedValue] = useState(
    multiSelect ? ["select"] : "select"
  );
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    if (multiSelect) {
      let newValues = selectedValue;
      if (newValues[0] === "select") {
        newValues = [];
      }
      if (!newValues.includes(value)) {
        newValues.push(value);
        setSelectedValue([...newValues]);
      }
    } else {
      setSelectedValue(value);
      setOpen(false);
    }
  };
  return (
    <div>
      <div>Select a city</div>
      <div
        className={`select__input `}
        onClick={() => setOpen((prev) => !prev)}
      >
        {multiSelect
          ? selectedValue.map((sel) => (
              <div className="multi__select" key={sel}>
                {sel}
              </div>
            ))
          : selectedValue}
      </div>
      <div className="select__options--container">
        {open &&
          Cities.map((item, index) => (
            <div
              key={item.label + index}
              onClick={() => handleSelect(item.value)}
              style={{ margin: "8px 0" }}
              className="select__option"
            >
              {item.label}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Select;
