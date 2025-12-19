import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

export default function Loader({ children, isLoading }) {
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Ring size={150} speed={1.5} bgOpacity={0.25} color={"#1B4D3E"} />;
      </div>
    );
  }
  return children;
}
