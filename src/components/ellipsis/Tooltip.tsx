import React, { useEffect, useRef,useState } from 'react';

interface TooltipWithEllipsisProps {
  text: any;
}

const TooltipWithEllipsis: React.FC<TooltipWithEllipsisProps> = ({ text }) => {
  const [isOverflowed, setIsOverflowed] = useState<boolean>(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (textRef.current) {
        setIsOverflowed(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative inline-block w-full">
      <span ref={textRef} data-tip={isOverflowed ? text : ''} className="truncate w-full">{text}</span>
      {isOverflowed && <div className="absolute top-full left-0 right-0 p-2 bg-gray-800 text-white text-sm rounded-md w-full">{text}</div>}
    </div>
  );
};

export default TooltipWithEllipsis;