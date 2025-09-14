
import Peer from 'simple-peer';

export const createPeer = (initiator: boolean) => {
  const peer = new Peer({ initiator });

  peer.on('signal', (data) => {
    console.log('SIGNAL', JSON.stringify(data));
  });

  peer.on('data', (data) => {
    console.log('data: ' + data);
  });

  return peer;
};
