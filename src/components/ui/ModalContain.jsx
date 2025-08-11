import { X } from "lucide-react";
import { useRef, useState } from "react";

function ModalContain({ children, close, location }) {
  const dragging = useRef(false);
  const [position, setPosition] = useState(null); 
  const offset = useRef({ x: 0, y: 0 });
  const start = (e) => {
    dragging.current = true;
    if (!position) {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: rect.left,
        y: rect.top,
      });
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    } else {
      offset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    }
  };

  const end = () => (dragging.current = false);

  const drag = (e) => {
    if (!dragging.current) return;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;
    setPosition({ x: newX, y: newY });
  };

  return (
    <div className="fixed z-1000 cursor-pointer top-0 left-0 flex items-center justify-center bg-black/50 w-full overflow-auto h-screen">
      <div
        onMouseDown={start}
        onMouseUp={end}
        onMouseMove={drag}
        className={`${location == "product" ? "w-300" : "w-100"} h-max relative overflow-hidden bg-white text-black p-3 rounded-2xl`}
        style={
          position
            ? {
              position: "absolute",
              top: position.y,
              left: position.x,
              cursor: dragging.current ? "grabbing" : "grab",
              userSelect: "none",
              transform: "none",
            }
            : {
              position: "fixed",
              top: "50%",
              left: "50%",
              cursor: "grab",
              userSelect: "none",
              transform: "translate(-50%, -50%)",
            }
        }
      >
        <div className="w-max py-2" onClick={close}>
          <X className="text-[10px]" />
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalContain;
