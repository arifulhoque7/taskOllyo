/* eslint-disable react/prop-types */
const Item = ({
  copyOpacity,
  style,
  setNodeRef,
  attributes,
  listeners,
  data,
  isDragging,
  index,
  selectedfile,
  selectedFiles
}) => {
  const { img, id, isSelected } = data;

  return (
    <div
      className={`${
        index === 0 ? "col-span-4 row-span-2" : "col-span-2"
      } border overflow-hidden relative group`}
      style={{ transformOrigin: "0 0", borderRadius: "10px", ...style }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div
        className={`flex items-center justify-center bg-white ${
          isDragging ? "shadow-md" : ""
        } ${copyOpacity ? "opacity-50" : "opacity-100"}`}
      >
        {/* When checked */}
        {/* <div className="absolute top-0 left-0 w-full h-full bg-white/50">
          <input type="checkbox" className="w-5 h-5 m-4" />
        </div> */}

        {/* when hover */}
        <div className="absolute top-0 left-0 w-full h-full duration-700 ease-in-out hover:bg-black/40">
          <input
            type="checkbox"
            className={`${selectedFiles?.includes(id) ? '' : 'hidden'} w-5 h-5 m-2 sm:m-4 group-hover:block`}
            onChange={(e) => selectedfile(e, id)}
            checked={selectedFiles?.includes(id) ? true : false}
          />
        </div>

        <img src={img} alt="img" className={`${index == 0 ? 'h-full w-full' : ' h-[210px] w-[200px]'} object-cover rounded-lg`} />
      </div>
    </div>
  );
};

export default Item;
