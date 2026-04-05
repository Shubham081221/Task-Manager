// import TaskItem from './TaskItem'

// // TaskList renders the list of filtered tasks (or an empty state)
// // Props:
// //   tasks          — array of tasks to display
// //   onToggle(id)   — passed down to TaskItem
// //   onDelete(id)   — passed down to TaskItem
// //   onUpdate(id, updatedFields) — passed down to TaskItem
// //   filter         — current active filter (used in empty state message)
// function TaskList({ tasks, onToggle, onDelete, onUpdate, filter }) {
//   // Empty state messages based on current filter
//   const emptyMessages = {
//     all: { icon: '📋', text: 'No tasks yet', sub: 'Add your first task using the form above.' },
//     completed: { icon: '🎉', text: 'Nothing completed yet', sub: 'Complete some tasks to see them here.' },
//     pending: { icon: '✅', text: 'All caught up!', sub: 'No pending tasks — great job.' },
//   }

//   if (tasks.length === 0) {
//     const { icon, text, sub } = emptyMessages[filter] || emptyMessages.all
//     return (
//       <div className="empty-state">
//         <div className="empty-icon">{icon}</div>
//         <p className="empty-text">{text}</p>
//         <p className="empty-sub">{sub}</p>
//       </div>
//     )
//   }

//   return (
//     <div className="task-list">
//       {tasks.map((task) => (
//         <TaskItem
//           key={task.id}
//           task={task}
//           onToggle={onToggle}
//           onDelete={onDelete}
//           onUpdate={onUpdate}
//         />
//       ))}
//     </div>
//   )
// }

// export default TaskList

import TaskItem from './TaskItem'

// TaskList — renders filtered task list or empty state
// Props:
//   tasks    — filtered array of task objects
//   onToggle, onDelete, onUpdate — passed down to each TaskItem
//   filter   — for context-specific empty messages
function TaskList({ tasks, onToggle, onDelete, onUpdate, filter }) {
  const emptyMessages = {
    all:       { icon: '📋', title: 'No tasks yet',      sub: 'Add your first task using the form above.' },
    completed: { icon: '🎉', title: 'Nothing completed', sub: 'Complete some tasks to see them here.'     },
    pending:   { icon: '✅', title: 'All caught up!',    sub: 'No pending tasks — great work.'            },
  }

  if (tasks.length === 0) {
    const { icon, title, sub } = emptyMessages[filter] || emptyMessages.all
    return (
      <div className="text-center py-16 px-5">
        <div className="text-4xl mb-3 opacity-40">{icon}</div>
        <p className="font-[var(--font-display)] font-semibold text-[var(--color-secondary)] mb-1">{title}</p>
        <p className="text-sm text-[var(--color-muted)]">{sub}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

export default TaskList