// import { useState } from 'react'

// // TaskItem displays a single task with toggle, edit, and delete
// // Props:
// //   task          — task object
// //   onToggle(id)  — mark task complete/incomplete
// //   onDelete(id)  — remove task
// //   onUpdate(id, updatedFields) — save edited task
// function TaskItem({ task, onToggle, onDelete, onUpdate }) {
//   // Controls whether the inline edit form is visible
//   const [isEditing, setIsEditing] = useState(false)

//   // Edit form local state — initialized from current task values
//   const [editTitle, setEditTitle] = useState(task.title)
//   const [editDesc, setEditDesc] = useState(task.description)
//   const [editDate, setEditDate] = useState(task.dueDate)
//   const [editPriority, setEditPriority] = useState(task.priority)

//   // Save edits and close the form
//   function handleSave() {
//     if (!editTitle.trim()) return
//     onUpdate(task.id, {
//       title: editTitle.trim(),
//       description: editDesc.trim(),
//       dueDate: editDate,
//       priority: editPriority,
//     })
//     setIsEditing(false)
//   }

//   // Cancel edit without saving
//   function handleCancel() {
//     // Reset edit fields back to original values
//     setEditTitle(task.title)
//     setEditDesc(task.description)
//     setEditDate(task.dueDate)
//     setEditPriority(task.priority)
//     setIsEditing(false)
//   }

//   // Format date for display: "20 Jun 2026"
//   function formatDate(dateStr) {
//     if (!dateStr) return null
//     const date = new Date(dateStr + 'T00:00:00')
//     return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
//   }

//   // Check if task is overdue (past due date and still pending)
//   function isOverdue() {
//     if (!task.dueDate || task.completed) return false
//     const today = new Date()
//     today.setHours(0, 0, 0, 0)
//     return new Date(task.dueDate) < today
//   }

//   return (
//     <div className={`task-item ${task.completed ? 'completed' : ''}`}>
//       <div className="task-item-top">
//         {/* Checkbox to toggle completion */}
//         <div
//           className="task-checkbox"
//           onClick={() => onToggle(task.id)}
//           title={task.completed ? 'Mark as Pending' : 'Mark as Completed'}
//         >
//           {task.completed ? '✓' : ''}
//         </div>

//         {/* Task details */}
//         <div className="task-content">
//           <div className="task-header">
//             <span className="task-title-text">{task.title}</span>
//             <span className={`priority-tag ${task.priority}`}>
//               {task.priority}
//             </span>
//           </div>

//           {task.description && (
//             <p className="task-desc">{task.description}</p>
//           )}

//           <div className="task-meta">
//             {task.dueDate && (
//               <span className={`task-due ${isOverdue() ? 'overdue' : ''}`}>
//                 📅 {isOverdue() ? '⚠ Overdue · ' : ''}{formatDate(task.dueDate)}
//               </span>
//             )}
//             <span className={`task-status-badge ${task.completed ? 'completed' : 'pending'}`}>
//               {task.completed ? 'Completed' : 'Pending'}
//             </span>
//           </div>
//         </div>

//         {/* Action buttons */}
//         <div className="task-actions">
//           {!isEditing && (
//             <>
//               <button
//                 className="btn btn-sm btn-edit"
//                 onClick={() => setIsEditing(true)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="btn btn-sm btn-delete"
//                 onClick={() => onDelete(task.id)}
//               >
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Inline Edit Form — shown only when isEditing is true */}
//       {isEditing && (
//         <div className="edit-form">
//           <div className="form-group">
//             <label className="form-label">Title</label>
//             <input
//               className="form-input"
//               type="text"
//               value={editTitle}
//               onChange={(e) => setEditTitle(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label">Description</label>
//             <textarea
//               className="form-textarea"
//               value={editDesc}
//               onChange={(e) => setEditDesc(e.target.value)}
//             />
//           </div>

//           <div className="edit-form-row">
//             <div className="form-group">
//               <label className="form-label">Due Date</label>
//               <input
//                 className="form-input"
//                 type="date"
//                 value={editDate}
//                 onChange={(e) => setEditDate(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Priority</label>
//               <div className="priority-group">
//                 {['high', 'medium', 'low'].map((p) => (
//                   <button
//                     key={p}
//                     className={`priority-btn ${editPriority === p ? `active-${p}` : ''}`}
//                     onClick={() => setEditPriority(p)}
//                   >
//                     {p.charAt(0).toUpperCase() + p.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="edit-actions">
//             <button className="btn btn-sm btn-cancel" onClick={handleCancel}>Cancel</button>
//             <button className="btn btn-sm btn-save" onClick={handleSave}>Save Changes</button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default TaskItem

import { useState } from 'react'

// TaskItem — single task card with toggle, edit, delete
// Props:
//   task          — task object
//   onToggle(id)  — flip completed status
//   onDelete(id)  — remove task
//   onUpdate(id, fields) — save edits
function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing,    setIsEditing]    = useState(false)
  const [editTitle,    setEditTitle]    = useState(task.title)
  const [editDesc,     setEditDesc]     = useState(task.description)
  const [editDate,     setEditDate]     = useState(task.dueDate)
  const [editPriority, setEditPriority] = useState(task.priority)

  function handleSave() {
    if (!editTitle.trim()) return
    onUpdate(task.id, {
      title:       editTitle.trim(),
      description: editDesc.trim(),
      dueDate:     editDate,
      priority:    editPriority,
    })
    setIsEditing(false)
  }

  function handleCancel() {
    // Reset to original values without saving
    setEditTitle(task.title)
    setEditDesc(task.description)
    setEditDate(task.dueDate)
    setEditPriority(task.priority)
    setIsEditing(false)
  }

  // Format "2026-06-20" → "20 Jun 2026"
  function formatDate(str) {
    if (!str) return null
    return new Date(str + 'T00:00:00').toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  function isOverdue() {
    if (!task.dueDate || task.completed) return false
    const today = new Date(); today.setHours(0, 0, 0, 0)
    return new Date(task.dueDate) < today
  }

  // Tailwind classes per priority
  const priorityClasses = {
    high:   'bg-red-500/10 text-red-400 border border-red-500/30',
    medium: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
    low:    'bg-green-500/10 text-green-400 border border-green-500/30',
  }

  const priorityEditStyles = {
    high:   'bg-red-500/10 border-red-500 text-red-400',
    medium: 'bg-yellow-500/10 border-yellow-500 text-yellow-400',
    low:    'bg-green-500/10 border-green-500 text-green-400',
  }

  return (
    <div
      className={[
        'animate-slide-in bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-4 transition-colors duration-200 hover:border-[var(--color-accent)]',
        task.completed ? 'opacity-60' : '',
      ].join(' ')}
    >
      {/* Top row: checkbox + content + actions */}
      <div className="flex items-start gap-3.5">
        {/* Completion checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          title={task.completed ? 'Mark as Pending' : 'Mark as Completed'}
          className={[
            'w-5 h-5 mt-0.5 flex-shrink-0 rounded-md border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-150 cursor-pointer',
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'bg-[var(--color-input)] border-[var(--color-border)] text-transparent hover:border-[var(--color-accent)]',
          ].join(' ')}
        >
          ✓
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title + priority badge */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={[
                'font-[var(--font-display)] font-semibold text-[0.98rem]',
                task.completed
                  ? 'line-through text-[var(--color-muted)]'
                  : 'text-[var(--color-primary)]',
              ].join(' ')}
            >
              {task.title}
            </span>
            <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${priorityClasses[task.priority]}`}>
              {task.priority}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-[var(--color-secondary)] font-light mb-2">
              {task.description}
            </p>
          )}

          {/* Meta: due date + status */}
          <div className="flex flex-wrap items-center gap-3">
            {task.dueDate && (
              <span className={`text-xs flex items-center gap-1 ${isOverdue() ? 'text-red-400' : 'text-[var(--color-muted)]'}`}>
                📅 {isOverdue() ? '⚠ Overdue · ' : ''}{formatDate(task.dueDate)}
              </span>
            )}
            <span
              className={[
                'text-[0.68rem] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider',
                task.completed
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-yellow-500/10 text-yellow-400',
              ].join(' ')}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>

        {/* Edit / Delete buttons */}
        {!isEditing && (
          <div className="flex gap-2 flex-shrink-0 mt-0.5">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs px-3 py-1.5 rounded-md bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-accent)] hover:border hover:border-[var(--color-accent)] transition-all cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-xs px-3 py-1.5 rounded-md bg-red-500/10 text-red-400 hover:border hover:border-red-400 transition-all cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Inline Edit Form */}
      {isEditing && (
        <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex flex-col gap-3">
          {/* Edit Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--color-secondary)]">Title</label>
            <input
              type="text"
              className="field"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>

          {/* Edit Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--color-secondary)]">Description</label>
            <textarea
              className="field resize-y min-h-[60px]"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
          </div>

          {/* Due Date + Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--color-secondary)]">Due Date</label>
              <input
                type="date"
                className="field"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--color-secondary)]">Priority</label>
              <div className="flex gap-2">
                {['high', 'medium', 'low'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setEditPriority(p)}
                    className={[
                      'flex-1 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer transition-all',
                      editPriority === p
                        ? priorityEditStyles[p]
                        : 'bg-[var(--color-input)] border-[var(--color-border)] text-[var(--color-secondary)]',
                    ].join(' ')}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Save / Cancel */}
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="text-sm px-4 py-1.5 rounded-lg bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm px-4 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:border-green-400 transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem