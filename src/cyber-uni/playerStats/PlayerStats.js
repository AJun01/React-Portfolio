import React, { useState, useEffect } from "react";
import "../styles/playerStats.css";

/** 出生日期集中配置，不散落在逻辑里。月份从 0 开始，3 = 四月。 */
const BIRTH_DATE = new Date(2000, 2, 22);

function calculateAge(birthDate) {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    years--;
  }
  return years;
}

const PlayerStats = () => {
  const [age, setAge] = useState(() => calculateAge(BIRTH_DATE));

  useEffect(() => {
    const timer = setInterval(
      () => setAge(calculateAge(BIRTH_DATE)),
      60_000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="playerStats">
      <h1>Yujun Liu LEVEL {age}</h1>
      <h2>Software Engineer</h2>
    </div>
  );
};

export default PlayerStats;
