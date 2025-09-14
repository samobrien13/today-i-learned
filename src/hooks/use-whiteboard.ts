
import { useState, useEffect } from 'react';
import { createPeer } from '@/lib/whiteboard';
import Peer from 'simple-peer';

export const useWhiteboard = () => {
  const [peer, setPeer] = useState<Peer.Instance | null>(null);
  const [offer, setOffer] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (peer) {
      peer.on('data', (data) => {
        const message = JSON.parse(data.toString());
        if (message.type === 'markdown') {
          setMarkdown(message.payload);
        } else if (message.type === 'cursor') {
          setCursor(message.payload);
        }
      });
    }
  }, [peer]);

  const createPeerInstance = () => {
    const newPeer = createPeer(true);
    newPeer.on('signal', (data) => {
      setOffer(JSON.stringify(data));
    });
    setPeer(newPeer);
    return newPeer;
  };

  const connectToPeer = (offer: string) => {
    const newPeer = createPeer(false);
    newPeer.signal(JSON.parse(offer));
    setPeer(newPeer);
  };

  const sendMarkdown = (markdown: string) => {
    if (peer) {
      peer.send(JSON.stringify({ type: 'markdown', payload: markdown }));
    }
  };

  const sendCursor = (cursor: { x: number; y: number }) => {
    if (peer) {
      peer.send(JSON.stringify({ type: 'cursor', payload: cursor }));
    }
  };

  return {
    peer,
    createPeer: createPeerInstance,
    connectToPeer,
    offer,
    markdown,
    setMarkdown,
    cursor,
    sendMarkdown,
    sendCursor,
  };
};
