import React from 'react'; void React; export function FileTree({ files = [] }) { return <ul>{files.map((file) => <li key={file}>{file}</li>)}</ul>; }
