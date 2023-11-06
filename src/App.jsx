import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useRef, useState } from "react";
import image1 from "../public/images/image-1.webp";
import image2 from "../public/images/image-2.webp";
import image3 from "../public/images/image-3.webp";
import image4 from "../public/images/image-4.webp";
import image5 from "../public/images/image-5.webp";
import image6 from "../public/images/image-6.webp";
import image7 from "../public/images/image-7.webp";
import image8 from "../public/images/image-8.webp";
import image9 from "../public/images/image-9.webp";
import Item from "./Item";
import Sortable from "./Sortable";


export default function App() {
  const [images, setImages] = useState([
    {
      id: 1,
      img: image1,
    },
    {
      id: 2,
      img: image2,
    },
    {
      id: 3,
      img: image3,
    },
    {
      id: 4,
      img: image4,
    },
    {
      id: 5,
      img: image5,
    },
    {
      id: 6,
      img: image6,
    },
    {
      id: 7,
      img: image7,
    },
    {
      id: 8,
      img: image8,
    },
    {
      id: 9,
      img: image9,
    },
  ]);
  
  const [activeId, setActiveId] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([])

  const selectedfile = (e, id) => {
    if(e.target.checked) {
      setSelectedFiles([...selectedFiles, id])
    }else{
      setSelectedFiles(selectedFiles?.filter(item => item != id))
    }
  }

  const uploadRef = useRef(null)
  
  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      setImages(imgfile => [...images, {id: images.length + 1, img: URL.createObjectURL(e.target.files[0])}])
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );
  const handleDragStart = (e) => {
    setActiveId(e.active.id);
  };

  const onDragEndHandler = (e) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      setImages((items) => {
        const activeIndex = images.findIndex((item) => item.id === active.id);
        const overIndex = images.findIndex((item) => item.id === over.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const deleteFile = () => {
    const newImages = images?.filter(item => !selectedFiles?.includes(item.id))

    setImages(newImages)
    setSelectedFiles([])
  }

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <section className="w-[1220px] border mx-auto mt-20 p-10">
      <div className="w-full h-[50px] border border-gray-400 rounded-lg p-3 flex justify-between">
        <span className="font-bold">
          {selectedFiles?.length > 0 ? (
            <> {selectedFiles?.length} {selectedFiles?.length == 1 ? 'File' : 'Files'} Selected </>
          ) : 'Gallery'}
        </span>

          {selectedFiles?.length > 0 ? (
            <span className="font-semibold text-red-700 cursor-pointer" onClick={deleteFile}>
              Delete {selectedFiles?.length == 1 ? 'File' : 'Files'}
          </span>
          ) : ''}
        
      </div>
      <div className="grid grid-cols-10 gap-5">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEndHandler}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={images} strategy={rectSortingStrategy}>
            {images.map((img, index) => (
              <Sortable key={img.id} data={img} index={index} uid={img.id} selectedfile={selectedfile} selectedFiles={selectedFiles} />
            ))}
          </SortableContext>

          <div onClick={() => uploadRef.current.click()} className="border cursor-pointer border-gray-200 w-[200px] h-[210px] rounded-lg flex flex-col justify-center items-center">
            <span className="text-[25px] font-bold text-gray-500">+</span>
            <span className="text-lg font-semibold text-gray-500">Add Images</span>
          </div>

          <DragOverlay adjustScale>
            {activeId ? (
              <Item
                index={activeId}
                data={images.find((itm) => itm.id === activeId)}
                isDragging
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
     <input ref={uploadRef} style={{ display: "none" }} type="file" onChange={imgFilehandler} />

    </section>
  );
}
