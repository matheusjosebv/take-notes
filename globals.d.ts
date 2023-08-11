declare module "*.scss";

declare module "react-beautiful-dnd" {
  import { DraggableProps, DroppableProps, DragDropContextProps } from "react-beautiful-dnd";

  export const Draggable: React.FC<DraggableProps>;
  export const Droppable: React.FC<DroppableProps>;
  export const DragDropContext: React.FC<DragDropContextProps>;

  export function someUtilityFunction(): void;
}
