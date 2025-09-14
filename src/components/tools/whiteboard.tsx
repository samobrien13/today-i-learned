
'use client';

import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import localforage from 'localforage';
import { useWhiteboard } from '@/hooks/use-whiteboard';
import { ToolData } from '..';
import { Heading } from '../ui/heading';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export function Whiteboard(props: ToolData) {
  const {
    createPeer,
    connectToPeer,
    offer,
    markdown,
    setMarkdown,
    cursor,
    sendMarkdown,
    sendCursor,
  } = useWhiteboard();

  useEffect(() => {
    localforage.getItem('whiteboard-content').then((value) => {
      if (value) {
        setMarkdown(value as string);
      }
    });
  }, [setMarkdown]);

  const handleMarkdownChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMarkdown(event.target.value);
    localforage.setItem('whiteboard-content', event.target.value);
    sendMarkdown(event.target.value);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    sendCursor({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="flex flex-col gap-4" onMouseMove={handleMouseMove}>
      <Heading {...props} />
      <div className="flex gap-4">
        <Button onClick={createPeer}>Create Shareable Link</Button>
        <Textarea
          placeholder="Paste link here to connect"
          onChange={(e) => connectToPeer(e.target.value)}
        />
      </div>
      {offer && (
        <div className="flex flex-col gap-2">
          <p>Share this link with a friend:</p>
          <div className="flex gap-2">
            <Textarea readOnly value={offer} />
            <Button onClick={() => navigator.clipboard.writeText(offer)}>
              Copy
            </Button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Textarea
          className="w-full h-96 p-4 border rounded-md"
          value={markdown}
          onChange={handleMarkdownChange}
        />
        <div className="prose relative">
          <div
            className="absolute bg-red-500 rounded-full w-4 h-4"
            style={{ left: cursor.x, top: cursor.y }}
          />
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
