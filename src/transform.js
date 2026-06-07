function run(input) {
  const events = (input && input.data && input.data.events) || [];
  const now = new Date();
  const today = toLocalDateString(now);
  const tomorrow = toLocalDateString(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  );

  const today_events = [];
  const tomorrow_events = [];

  for (const event of events) {
    const dt = new Date(event.date_time);
    if (isNaN(dt.getTime())) continue;
    const localDate = toLocalDateString(dt);

    const mapped = {
      title: event.summary || "",
      time: event.all_day ? "All day" : (event.start || ""),
      all_day: !!event.all_day,
    };

    if (localDate === today) {
      today_events.push(mapped);
    } else if (localDate === tomorrow) {
      tomorrow_events.push(mapped);
    }
  }

  return { today_events, tomorrow_events };
}

function toLocalDateString(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
