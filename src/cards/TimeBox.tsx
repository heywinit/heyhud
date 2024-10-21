import moment from "moment";
import Card from "../components/Card";
import { useEffect, useState } from "react";

export default function TimeBox() {
  const [currentTime, setCurrentTime] = useState(moment().format("HHmmss"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("HHmmss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full row-span-2 col-span-2">
      <Card title=".now">
        <div className="p-2 space-x-2">
          <span className="text-6xl">{currentTime}</span>
          <span>[hrs]</span>
        </div>
        <div className="px-2 pb-1 flex justify-between flex-col">
          <div className="text-3xl">{moment().format("dddd")}</div>
          <div className="text-2xl">{moment().format("DD MMM YYYY")}</div>
        </div>
      </Card>
    </div>
  );
}
