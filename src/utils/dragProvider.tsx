// DragContext.js
import React, {createContext, useState, useContext} from 'react';

const DragContext = createContext();

export const useDrag = () => useContext(DragContext);

export const DragProvider = ({children}) => {
  const [dragItem, setDragItem] = useState(null);

  const startDrag = item => setDragItem(item);
  const endDrag = () => setDragItem(null);

  return (
    <DragContext.Provider value={{dragItem, startDrag, endDrag}}>
      {children}
    </DragContext.Provider>
  );
};
