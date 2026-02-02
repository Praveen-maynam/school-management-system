export const TableActions = ({
  onView,
  onEdit,
  onDelete
}: {
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}) => (
  <div className="flex gap-2">
    <button onClick={onView} className="text-blue-600">View</button>
    <button onClick={onEdit} className="text-yellow-600">Edit</button>
    <button onClick={onDelete} className="text-red-600">Delete</button>
  </div>
)
