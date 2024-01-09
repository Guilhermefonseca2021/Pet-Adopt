import bus from "../utils/bus";

export default function useApiMessages() {
  function setApiMessages(msg: string, type: string) {
    bus.emit("flash", {
      message: msg,
      type: type,
    });
  }

  return { setApiMessages }
}
