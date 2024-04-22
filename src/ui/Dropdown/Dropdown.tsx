import { default as React, FC, useState } from "react";
import styles from "./dropdown.css";
import dropdownImg from "@assets/img/dropdown.svg";
import classNames from "classnames";
import { useOutsideClick } from "@src/hooks/useOutsideClick";

interface DropdownOption {
  optionName: string;
  onOptionSelect: () => void;
}

export type DropdownOptionList = DropdownOption[];

interface DropdownProps {
  optionList: DropdownOptionList;
  initValue: string;
}

export const Dropdown: FC<DropdownProps> = ({ optionList, initValue }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currValue, setCurrValue] = useState<string>(initValue);
  const containerRef = useOutsideClick(handleBlur);

  const filteredOptionList = optionList.filter(
    option => option.optionName != currValue,
  );

  function handleTrigger() {
    setIsOpen(!isOpen);
  }

  function handleSelect(optionItem: DropdownOption) {
    optionItem.onOptionSelect();
    setCurrValue(optionItem.optionName);
    setIsOpen(false);
  }

  function handleBlur() {
    setIsOpen(false);
  }

  const triggerCls = classNames({
    [`${styles.dropdownOption}`]: true,
    [`${styles.dropdownTrigger}`]: true,
    [`${styles.dropdownTrigger_open}`]: isOpen,
  });

  return (
    <div className={styles.dropdown} ref={containerRef}>
      <button className={triggerCls} onClick={handleTrigger}>
        {currValue}
        <img className={styles.dropdownImg} src={dropdownImg} />
      </button>
      <ul className={styles.dropdownOptionList}>
        {isOpen &&
          filteredOptionList.map(optionItem => (
            <li
              className={styles.dropdownOptionItem}
              key={optionItem.optionName}
            >
              <button
                className={styles.dropdownOption}
                onClick={() => handleSelect(optionItem)}
              >
                {optionItem.optionName}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
