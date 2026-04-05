// import { useState } from 'react'

// // TaskForm handles adding new tasks
// // Props:
// //   onAddTask(task) — called when form is submitted
// function TaskForm({ onAddTask }) {
//   // Local state for each form field
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [dueDate, setDueDate] = useState('')
//   const [priority, setPriority] = useState('medium')

//   function handleSubmit(e) {
//     e.preventDefault()

//     // Basic validation: title is required
//     if (!title.trim()) return

//     // Build the task object
//     const newTask = {
//       id: Date.now(),           // unique ID using timestamp
//       title: title.trim(),
//       description: description.trim(),
//       dueDate,
//       priority,
//       completed: false,
//       createdAt: new Date().toISOString(),
//     }

//     onAddTask(newTask)

//     // Reset all fields after submission
//     setTitle('')
//     setDescription('')
//     setDueDate('')
//     setPriority('medium')
//   }

//   return (
//     <div className="card">
//       <p className="card-title">➕ Add New Task</p>

//       {/* We use a div + button instead of <form> to avoid accidental page reload */}
//       <div className="task-form">
//         {/* Title */}
//         <div className="form-group">
//           <label className="form-label">Task Title *</label>
//           <input
//             className="form-input"
//             type="text"
//             placeholder="e.g. Complete React Assignment"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         {/* Description */}
//         <div className="form-group">
//           <label className="form-label">Description</label>
//           <textarea
//             className="form-textarea"
//             placeholder="What needs to be done?"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         {/* Due Date + Priority in a row */}
//         <div className="form-row">
//           <div className="form-group">
//             <label className="form-label">Due Date</label>
//             <input
//               className="form-input"
//               type="date"
//               value={dueDate}
//               onChange={(e) => setDueDate(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label">Priority</label>
//             <div className="priority-group">
//               {['high', 'medium', 'low'].map((p) => (
//                 <button
//                   key={p}
//                   className={`priority-btn ${priority === p ? `active-${p}` : ''}`}
//                   onClick={() => setPriority(p)}
//                 >
//                   {p.charAt(0).toUpperCase() + p.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button className="btn btn-primary" onClick={handleSubmit}>
//           + Add Task
//         </button>
//       </div>
//     </div>
//   )
// }

// export default TaskForm

import { useState } from 'react'

// TaskForm — controlled form for adding a new task
// Props:
//   onAddTask(task) — called with the new task object on submit
function TaskForm({ onAddTask }) {
  const [title,       setTitle]       = useState('')
  const [description, setDescription] = useState('')
  const [dueDate,     setDueDate]     = useState('')
  const [priority,    setPriority]    = useState('medium')

  function handleSubmit() {
    if (!title.trim()) return   // title is required

    const newTask = {
      id:          Date.now(),             // simple unique id
      title:       title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      completed:   false,
      createdAt:   new Date().toISOString(),
    }

    onAddTask(newTask)

    // Reset form
    setTitle('')
    setDescription('')
    setDueDate('')
    setPriority('medium')
  }

  // Priority button styles — different accent color per level
  const priorityStyles = {
    high:   { active: 'bg-red-500/10 border-red-500 text-red-400',    idle: '' },
    medium: { active: 'bg-yellow-500/10 border-yellow-500 text-yellow-400', idle: '' },
    low:    { active: 'bg-green-500/10 border-green-500 text-green-400',  idle: '' },
  }

  return (
    <div className="card">
      <p className="card-label">➕ Add New Task</p>

      <div className="flex flex-col gap-3.5">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--color-secondary)] tracking-wide">
            Task Title *
          </label>
          <input
            type="text"
            className="field"
            placeholder="e.g. Complete React Assignment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--color-secondary)] tracking-wide">
            Description
          </label>
          <textarea
            className="field resize-y min-h-[70px]"
            placeholder="What needs to be done?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Due Date + Priority row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Due Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--color-secondary)] tracking-wide">
              Due Date
            </label>
            <input
              type="date"
              className="field"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Priority selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[var(--color-secondary)] tracking-wide">
              Priority
            </label>
            <div className="flex gap-2">
              {['high', 'medium', 'low'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={[
                    'flex-1 py-2 text-xs font-semibold rounded-lg border cursor-pointer transition-all duration-150',
                    priority === p
                      ? priorityStyles[p].active
                      : 'bg-[var(--color-input)] border-[var(--color-border)] text-[var(--color-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)]',
                  ].join(' ')}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-h)] text-white font-semibold text-sm rounded-lg transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-[var(--font-display)] tracking-wide"
        >
          + Add Task
        </button>
      </div>
    </div>
  )
}

export default TaskForm