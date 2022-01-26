import event from '../utils/event'

export default function useFlash() {

  function setFlash(msg, type) {
    event.emit('flash', {
      msg: msg,
      type: type,
    })
  }

  return { setFlash }
}