import React, { useState, useRef } from "react";
import Options from "./Options";

interface Position {
  x: number;
  y: number;
}

const DraggableContainer: React.FC<{sendValues: (rows:number, columns:number, speed:number, obstacles:number,diagonalNeighbors:boolean)=>void}> = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [initialContainerPosition, setInitialContainerPosition] = useState<Position>({ x: 100, y: 100 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent dragging the container when clicking on an input element
    if ((event.target as HTMLElement).tagName.toLowerCase() === "input") return;
    
    event.preventDefault();
    setIsDragging(true);
    setInitialMousePosition({ x: event.clientX, y: event.clientY });
    if (containerRef.current) {
      setInitialContainerPosition({ x: containerRef.current.offsetLeft, y: containerRef.current.offsetTop });
    }
  };

  

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners to the document to allow dragging the container even when the mouse is outside of the container
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;
      const x = event.clientX - initialMousePosition.x + initialContainerPosition.x;
      const y = event.clientY - initialMousePosition.y + initialContainerPosition.y;
      if (containerRef.current) {
        containerRef.current.style.left = `${x}px`;
        containerRef.current.style.top = `${y}px`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, initialMousePosition.x, initialContainerPosition.x, initialContainerPosition.y, initialMousePosition.y]);

  const handleValues = (rows: number, columns: number, speed: number, obstacles: number,diagonalNeighbors:boolean) => {
    props.sendValues(rows, columns, speed, obstacles,diagonalNeighbors)
  }


  return (
    <div style={{position:'absolute', top:'100px', left:'100px'}} onMouseDown={handleMouseDown} ref={containerRef}>
      <Options sendValues={handleValues}/>
    </div>
  );
};

export default DraggableContainer;