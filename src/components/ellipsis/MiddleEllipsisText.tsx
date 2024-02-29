import React from 'react';

interface MiddleEllipsisTextProps {
  text: any;
}

function MiddleEllipsisText({ text }: MiddleEllipsisTextProps) {
  const maxLength = 40; // Adjust the maxLength as needed

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  } else {
    const halfLength = Math.floor(maxLength / 2);
    const firstHalf = text.slice(0, halfLength);
    const secondHalf = text.slice(text.length - halfLength);
    return (
      <span>
        {firstHalf}
        <span className="inline-block ...">...</span>
        {secondHalf}
      </span>
    );
  }
}

export default MiddleEllipsisText;