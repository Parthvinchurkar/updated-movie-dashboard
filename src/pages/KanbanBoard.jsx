import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { useMovies } from "../context/MovieContext";

const columns = ["Upcoming", "Running", "Ended"];

export default function KanbanBoard() {
  const { movies, updateMovieStatus } = useMovies();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    updateMovieStatus(
      Number(result.draggableId),
      result.destination.droppableId
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        {columns.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(p) => (
              <div
                ref={p.innerRef}
                {...p.droppableProps}
                className="w-1/3 bg-dark-700 p-3 rounded"
              >
                <h3 className="mb-2">{status}</h3>

                {movies
                  .filter((m) => m.status === status)
                  .map((m, i) => (
                    <Draggable
                      key={m.id}
                      draggableId={String(m.id)}
                      index={i}
                    >
                      {(p) => (
                        <div
                          ref={p.innerRef}
                          {...p.draggableProps}
                          {...p.dragHandleProps}
                          className="mb-2 bg-dark-600 p-2 rounded"
                        >
                          {m.title}
                        </div>
                      )}
                    </Draggable>
                  ))}

                {p.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}