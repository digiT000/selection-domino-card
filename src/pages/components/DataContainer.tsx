import { ReactNode } from "react";

interface DataContainerProps {
  children: ReactNode;
  className?: string;
}

function DataContainer({ className, children }: DataContainerProps) {
  return (
    <section
      className={`p-4 bg-zinc-100 rounded-md border border-zinc-300 ${className}`}
    >
      {children}
    </section>
  );
}

export default DataContainer;
