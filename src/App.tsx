import { useEffect, useRef, useState } from "react";
import { createEditor } from "./flow-editor/editor";
import { ItemsDnd } from "./form-editor/itemsDnd";

export function useRete(create: (el: HTMLElement) => Promise<() => void>) {
  const [container, setContainer] = useState(null);
  const editorRef = useRef<Awaited<ReturnType<typeof create>>>(null);

  useEffect(() => {
    if (container) {
      create(container).then((value) => {
        (editorRef as any).current = value;
      });
    }
  }, [container]);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current();
      }
    };
  }, []);

  return [setContainer];
}

export default function App() {
  const [setContainer] = useRete(createEditor);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setContainer(ref.current);
    }
  }, [ref.current]);

  return (
    <div className="h-100 w-100">
      <div className="container-fluid no-gutters p-0 m-0 h-100 ">
        <div className="row h-100">
          <div className="col-4 border border-danger" >
            <ItemsDnd></ItemsDnd>
          </div>
          <div className="col w-75">
            <div ref={ref} className="h-100 w-100"></div>
          </div >
        </div >
      </div>
    </div>
  );
}
