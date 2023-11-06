import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item from "./Item";

const Sortable = ({ data, index, uid, selectedfile, selectedFiles }) => {
  const {
    isDragging,
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isSorting,
    isOver,
    
  } = useSortable({ id: uid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      style={style}
      attributes={attributes}
      listeners={listeners}
      setNodeRef={setNodeRef}
      index={index}
      copyOpacity={isDragging}
      data={data}
      selectedfile={selectedfile}
      selectedFiles={selectedFiles}
    />
  );
};

export default Sortable;
