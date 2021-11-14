import Peer from 'peerjs'
let peer = null
let peerConnection = {
    init: () => {
        let peerObject = new Peer(undefined, {
            host: '/',
            port: 5000,
            path: '/peerjs',
            secure: process.env === 'production' ? true : false
        })
        peer = peerObject
    },
    getPeer: () => {
        if (!peer) throw Error("Peer not initialized...")
        return peer
    }
}
export default peerConnection