const lionEvents = {};

export const getLionEvents = () => {
  return lionEvents;
}

export function registerEvent(name, handler) {
    console.log('registering event', name);
    console.log(lionEvents);
  if (!lionEvents[name]) {
    lionEvents[name] = [];
  }
  lionEvents[name].push(handler);
}

export function triggerEvent(name, data) {
  const handlers = lionEvents[name];
  console.log('triggering event', name, data);
  console.log(lionEvents);
  console.log('handler',handlers);
  if (handlers) {
    handlers.forEach((handler) => {
      handler(data);
    });
  } else {
    console.warn('no handler for event', name);
  }

}