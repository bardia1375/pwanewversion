import React, { useState } from "react";
import Contor24 from "../features/dashboard/components/Contor/Contor24";
import { TabNavigation } from "../features/dashboard/components/TabNavigation";
import { DateNavigation } from "../features/dashboard/components/DateNavigation";
import { ActionButtons } from "../features/dashboard/components/ActionButtons";
import { TimeDisplay } from "../features/dashboard/components/TimeDisplay";
import { TimeDetails } from "../features/dashboard/components/TimeDetails";
import Card from "../shared/components/ui/Card/Card";

const DashboardPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"day" | "month">("day");

  const dayShow = {
    countor: {
      working_hours: [],
      items: [
        {
          key: "hourly_absence",
          item: "غیبت ساعتی",
          from: "02:59",
          to: "16:01",
          value: "04:02",
          color: "#FF00FF",
          style: "line",
          convert_to_writ: false,
        },
      ],
    },
    activity: "00:00",
    total_activity: "00:02",
    hourly_leave: "00:00",
    remain_leave: null,
    hourly_assignment: "00:00",
  };

  return (
    <div
      className="overflow-x-hidden flex flex-col items-center pt-4"
      dir="rtl"
    >
      {/* Navigation Section */}
      <div className="w-full sticky top-0 z-10 px-4 py-2">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <DateNavigation />
      </div>

      {/* Contor Section */}
      <div className="w-full flex flex-col items-center mt-4 mb-8">
        <Contor24 dataShow={dayShow} selectedTitle={"امروز"} />
      </div>

      {/* Card Section */}
      <Card>
        <ActionButtons />
        <TimeDisplay />
        <TimeDetails
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
