import React from "react";

export const useDate = () => {
  const locale = "en";
  const [currentDate, setCurrentDate] = React.useState(new Date()); 

  React.useEffect(() => {
    const timer = setInterval(() => {
     
      setCurrentDate(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const dayOfWeek = currentDate.toLocaleDateString(locale, { weekday: "long" });
  const formattedDate = `${dayOfWeek}, ${currentDate.getDate()} ${currentDate.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;

  const hour = currentDate.getHours();
  const greeting = `Good ${(hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"}, `;

  const formattedTime = currentDate.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  return {
    formattedDate,
    formattedTime,
    greeting,
  };
};
