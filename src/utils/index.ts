export const dispatchEvent = (
  eventName: "newtask" | "removedtask",
  detail: any
) => {
  setTimeout(() => {
    console.info("dispatching event", eventName, detail);
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  }, 0);
};
