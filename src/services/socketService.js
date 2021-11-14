import openSocket from 'socket.io-client'
let socket = null
let socketConnection = {
  init: () => socket = openSocket(process.env === 'production' ? 'https://ims-meeting-api.herokuapp.com' : 'http://localhost:5000', {
    query: {},
  }),
  getSocket: () => {
    if (!socket) throw Error("Socket not initialized in client...")
    return socket
  }
}
export default socketConnection