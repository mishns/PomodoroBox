import { default as React, FC, useContext } from "react";
import styles from "./settingspage.css";
import { SettingsContext } from "@contexts/SettingsContext";
import { secToMin } from "@src/utils/secToMin";
import { minToSec } from "@src/utils/minToSec";
import { Button } from "@common/Button";

export const SettingsPage: FC = () => {
  const settings = useContext(SettingsContext);

  return (
    <div>
      <form className={styles.settingsForm}>
        <div className={styles.settingsField}>
          <label className={styles.settingLabel} htmlFor="workSeconds">
            Продолжительность одного рабочего таймера (мин)
          </label>
          <input
            className={styles.settingInput}
            value={secToMin(settings.workSeconds)}
            onChange={event =>
              settings.handleSetWorkSeconds(
                minToSec(Number(event.target.value)),
              )
            }
            min={1}
            type="number"
            id="workSeconds"
            name="workSeconds"
          />
        </div>

        <div className={styles.settingsField}>
          <label className={styles.settingLabel} htmlFor="breakSeconds">
            Продолжительность одного короткого перерыва (мин)
          </label>
          <input
            className={styles.settingInput}
            value={secToMin(settings.breakSeconds)}
            onChange={event =>
              settings.handleSetBreakSeconds(
                minToSec(Number(event.target.value)),
              )
            }
            min={1}
            type="number"
            id="breakSeconds"
            name="breakSeconds"
          />
        </div>

        <div className={styles.settingsField}>
          <label className={styles.settingLabel} htmlFor="longBreakSeconds">
            Продолжительность длинного перерыва (мин)
          </label>
          <input
            className={styles.settingInput}
            value={secToMin(settings.longBreakSeconds)}
            onChange={event =>
              settings.handleSetLongBreakSeconds(
                minToSec(Number(event.target.value)),
              )
            }
            min={1}
            type="number"
            id="longBreakSeconds"
            name="longBreakSeconds"
          />
        </div>

        <div className={styles.settingsField}>
          <label className={styles.settingLabel} htmlFor="timersUntilLongBreak">
            Кол-во рабочих таймеров до&nbsp;длинного перерыва
          </label>
          <input
            className={styles.settingInput}
            value={settings.timersUntilLongBreak}
            onChange={event =>
              settings.handleSetTimersUntilLongBreak(Number(event.target.value))
            }
            min={0}
            type="number"
            id="timersUntilLongBreak"
            name="timersUntilLongBreak"
          />
        </div>

        <div className={styles.settingsField}>
          <label className={styles.settingLabel} htmlFor="isNotifOn">
            Уведомления включены
          </label>
          <input
            className={styles.settingInput}
            defaultChecked={settings.isNotifOn}
            onChange={event =>
              settings.handleSetIsNotifOn(event.target.checked)
            }
            type="checkbox"
            id="isNotifOn"
            name="isNotifOn"
          />
        </div>
        <Button type="reset" onClick={settings.handleReset}>
          Вернуть настройки по&nbsp;умолчанию
        </Button>
      </form>
    </div>
  );
};
