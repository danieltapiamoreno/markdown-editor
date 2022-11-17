import { createElement, useState } from 'react';

type Block = {
  element: 'ul' | 'li' | 'p' | 'h1' | 'h2';
  children: (Block | string)[];
};

const createBlock = (line: string): Block => {
  switch (true) {
    case line.startsWith('##'):
      return { element: 'h2', children: [line.substring(2)] };
    case line.startsWith('#'):
      return { element: 'h1', children: [line.substring(1)] };
    case line.startsWith('*') || line.startsWith('-'):
      return { element: 'li', children: [line.substring(1)] };
    default:
      return { element: 'p', children: [line] };
  }
};

const addUlBlocks = (blocks: Block[]): Block[] => {
  const ulBlock: Block = { element: 'ul', children: [] };
  const ulBlocks: Block[] = [];

  blocks.forEach((block, index) => {
    if (block.element !== 'li') {
      ulBlocks.push(block);
      return;
    }
    ulBlock.children.push(block);
    if (blocks[index + 1]?.element !== 'li') {
      ulBlocks.push({ ...ulBlock });
      ulBlock.children = [];
    }
  });
  return ulBlocks;
};

const createHTMLBlocks = (blocks: Block[]): any => {
  return blocks.map((block: Block) => {
    const children =
      typeof block.children[0] === 'string'
        ? block.children[0]
        : block.children.map((childBlock: any) =>
            createElement(childBlock.element, {}, childBlock.children[0]),
          );
    return createElement(block.element, {}, children);
  });
};

const parseMarkdown = (markdown: string): Block[] => {
  // TODO: implement
  return markdown.split('\n').map((line) => createBlock(line));
};

function App() {
  const [blocks, setBlocks]: any = useState([]);

  return (
    <div>
      <textarea onChange={(e) => setBlocks(parseMarkdown(e.target.value))} rows={5} />
      <div>{createHTMLBlocks(addUlBlocks(blocks))}</div>
    </div>
  );
}

export default App;
