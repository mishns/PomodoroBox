import { default as React, FC, useState } from "react";
import { TimersStatistics } from "@pages/Content";
import { DayTotalTime } from "@ui/Statistics/DayTotalTime";
import { TimersComplete } from "@ui/Statistics/TimersComplete";
import { WeekChart } from "@ui/Statistics/WeekChart";
import { FocusRate } from "@ui/Statistics/FocusRate";
import { PauseTime } from "@ui/Statistics/PauseTime";
import { PauseCount } from "@ui/Statistics/PauseCount";
import { Dropdown, DropdownOptionList } from "@ui/Dropdown";
import styles from "./statisticspage.css";

interface StatisticsPageProps {
  data: TimersStatistics;
}

export const StatisticsPage: FC<StatisticsPageProps> = ({ data }) => {
  const [day, setDay] = useState<string>("Четверг");

  function handleDropdownSelect() {
    setDay("today");
  }
  function handleDropdownSelect2() {
    setDay("yesterday");
  }
  function handleDropdownSelect3() {
    setDay("tommorow");
  }
  const dropdownOptionList: DropdownOptionList = [
    { optionName: "Эта неделя", onOptionSelect: handleDropdownSelect },
    { optionName: "Прошедшая неделя", onOptionSelect: handleDropdownSelect2 },
    { optionName: "2 недели назад", onOptionSelect: handleDropdownSelect3 },
  ];

  return (
    <div className={styles.statisticsPage}>
      <div className={styles.headerBlock}>
        <h1 className={styles.header}>Ваша активность</h1>
        <Dropdown
          optionList={dropdownOptionList}
          initValue={dropdownOptionList[0].optionName}
        />
      </div>
      <div className={styles.activityBlock}>
        <div className={styles.dayActivity}>
          <DayTotalTime day={day} minutes={45} />
          <TimersComplete timersCount={data.get("today")!.timersComplete} />
        </div>
        <WeekChart />
      </div>
      <div className={styles.focusRates}>
        <FocusRate focusRate={35} />
        <PauseTime pauseTime={9} />
        <PauseCount pauseCount={3} />
      </div>
    </div>
  );
};
