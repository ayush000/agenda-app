from datetime import datetime, date, timedelta


def run(input):
    events = input.get("data", {}).get("events", [])
    today = date.today()
    tomorrow = today + timedelta(days=1)

    today_events = []
    tomorrow_events = []

    for event in events:
        dt_str = event.get("date_time", "")
        try:
            dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
            local_date = dt.astimezone().date()
        except (ValueError, AttributeError):
            continue

        mapped = {
            "title": event.get("summary", ""),
            "time": "All day" if event.get("all_day") else event.get("start", ""),
            "all_day": event.get("all_day", False),
        }

        if local_date == today:
            today_events.append(mapped)
        elif local_date == tomorrow:
            tomorrow_events.append(mapped)

    return {
        "today_events": today_events,
        "tomorrow_events": tomorrow_events,
    }
