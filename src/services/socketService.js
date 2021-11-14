import openSocket from 'socket.io-client'
let socket = null
let socketConnection = {
  init: () => socket = openSocket(process.env.REACT_APP_API_URL, {
    query: {},
  }),
  getSocket: () => {
    if (!socket) throw Error("Socket not initialized in client...")
    return socket
  }
}
export default socketConnection