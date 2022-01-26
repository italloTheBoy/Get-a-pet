import event from '../utils/event'

export function useFlash() {

  function setFlash(msg, type) {
    event.emit('flash', {
      message: msg,
      type: type,
    })
  }

  return { setFlash }
}