// import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './index.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
    
//     <h1 className="text-3xl font-bold text-red-500 bg-yellow-200 p-4">
//   Tailwind Test
// </h1>
//   )
// }

// export default App

// import { useState, useEffect } from 'react'
// import TaskForm from './components/TaskForm'
// import TaskList from './components/TaskList'
// import FilterButtons from './components/FilterButtons'

// function App() {
//   // ─── State ────────────────────────────────────────────────────────────────

//   // Main tasks array — single source of truth
//   const [tasks, setTasks] = useState([])

//   // Active filter: 'all' | 'completed' | 'pending'
//   const [filter, setFilter] = useState('all')

//   // Search query string
//   const [search, setSearch] = useState('')

//   // ─── localStorage: Load on mount ──────────────────────────────────────────

//   // On first render, load any previously saved tasks from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem('kct_tasks')
//     if (stored) {
//       setTasks(JSON.parse(stored))
//     }
//   }, []) // empty deps = runs once on mount

//   // ─── localStorage: Save on every change ───────────────────────────────────

//   // Whenever tasks changes, persist it to localStorage
//   useEffect(() => {
//     localStorage.setItem('kct_tasks', JSON.stringify(tasks))
//   }, [tasks]) // runs every time tasks updates

//   // ─── CRUD Handlers ────────────────────────────────────────────────────────

//   // ADD: prepend new task to the beginning of the list
//   function handleAddTask(newTask) {
//     setTasks((prev) => [newTask, ...prev])
//   }

//   // TOGGLE: flip the completed status of one task by id
//   function handleToggleTask(id) {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     )
//   }

//   // DELETE: remove task by id
//   function handleDeleteTask(id) {
//     setTasks((prev) => prev.filter((task) => task.id !== id))
//   }

//   // UPDATE: merge new field values into matching task
//   function handleUpdateTask(id, updatedFields) {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === id ? { ...task, ...updatedFields } : task
//       )
//     )
//   }

//   // ─── Derived / Filtered Data ──────────────────────────────────────────────

//   // First apply filter, then apply search
//   const filteredTasks = tasks
//     .filter((task) => {
//       if (filter === 'completed') return task.completed
//       if (filter === 'pending') return !task.completed
//       return true // 'all'
//     })
//     .filter((task) => {
//       if (!search.trim()) return true
//       const q = search.toLowerCase()
//       return (
//         task.title.toLowerCase().includes(q) ||
//         task.description.toLowerCase().includes(q)
//       )
//     })

//   // Count badges for each filter tab
//   const counts = {
//     all: tasks.length,
//     completed: tasks.filter((t) => t.completed).length,
//     pending: tasks.filter((t) => !t.completed).length,
//   }

//   // ─── Render ───────────────────────────────────────────────────────────────

//   return (
//     <div className="app-wrapper">
//       {/* Header */}
//       <header className="app-header">
//         <div className="header-top">
//           <h1 className="app-title">Task Manager</h1>
//           <span className="task-count-badge">{tasks.length} tasks</span>
//         </div>
//         <p className="app-subtitle">Stay organized, stay productive.</p>
//       </header>

//       {/* Stats Bar */}
//       <div className="stats-bar">
//         <div className="stat-item">
//           <div className="stat-number total">{counts.all}</div>
//           <div className="stat-label">Total</div>
//         </div>
//         <div className="stat-item">
//           <div className="stat-number done">{counts.completed}</div>
//           <div className="stat-label">Done</div>
//         </div>
//         <div className="stat-item">
//           <div className="stat-number pending">{counts.pending}</div>
//           <div className="stat-label">Pending</div>
//         </div>
//       </div>

//       {/* Add Task Form */}
//       <TaskForm onAddTask={handleAddTask} />

//       {/* Search + Filter Section */}
//       <div className="card">
//         <p className="card-title">🔍 Search & Filter</p>

//         {/* Search Input */}
//         <div className="search-wrap">
//           <span className="search-icon">⌕</span>
//           <input
//             className="search-input"
//             type="text"
//             placeholder="Search tasks by title or description..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Filter Buttons */}
//         <FilterButtons
//           filter={filter}
//           onFilterChange={setFilter}
//           counts={counts}
//         />
//       </div>

//       {/* Task List */}
//       <TaskList
//         tasks={filteredTasks}
//         onToggle={handleToggleTask}
//         onDelete={handleDeleteTask}
//         onUpdate={handleUpdateTask}
//         filter={filter}
//       />
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from 'react'
import TaskForm from './component/TaskForm'
import TaskList from './component/TaskList'
import FilterButtons from './component/FilterButtons'

function App() {
  // ─── State ────────────────────────────────────────────────────────────────
  const [tasks,  setTasks]  = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // ─── Load from localStorage on first render ───────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem('kct_tasks')
    if (stored) setTasks(JSON.parse(stored))
  }, [])

  // ─── Save to localStorage whenever tasks change ───────────────────────────
  useEffect(() => {
    localStorage.setItem('kct_tasks', JSON.stringify(tasks))
  }, [tasks])

  // ─── CRUD handlers ────────────────────────────────────────────────────────

  function handleAddTask(newTask) {
    setTasks((prev) => [newTask, ...prev])
  }

  function handleToggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }

  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function handleUpdateTask(id, fields) {
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, ...fields } : t)
    )
  }

  // ─── Derived: filter + search ─────────────────────────────────────────────
  const filteredTasks = tasks
    .filter((t) => {
      if (filter === 'completed') return t.completed
      if (filter === 'pending')   return !t.completed
      return true
    })
    .filter((t) => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    })

  const counts = {
    all:       tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending:   tasks.filter((t) => !t.completed).length,
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-[800px] mx-auto px-5 py-10 pb-20">

      {/* ── Header ── */}
      <header className="mb-10">
        <div className="flex items-center justify-between mb-1.5">
          <h1 className="gradient-title font-[var(--font-display)] text-4xl font-extrabold tracking-tight">
            Task Manager
          </h1>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] border border-[var(--color-accent)] text-[var(--color-accent)]">
            {tasks.length} tasks
          </span>
        </div>
        <p className="text-sm text-[var(--color-secondary)] font-light">
          Stay organized, stay productive.
        </p>
      </header>

      {/* ── Stats Bar ── */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Total',   value: counts.all,       color: 'text-[var(--color-accent)]' },
          { label: 'Done',    value: counts.completed,  color: 'text-green-400'             },
          { label: 'Pending', value: counts.pending,    color: 'text-yellow-400'            },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center py-4 mb-0!">
            <div className={`font-[var(--font-display)] text-3xl font-extrabold leading-none mb-1 ${color}`}>
              {value}
            </div>
            <div className="text-[0.7rem] font-semibold uppercase tracking-widest text-[var(--color-muted)]">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Add Task Form ── */}
      <TaskForm onAddTask={handleAddTask} />

      {/* ── Search + Filter ── */}
      <div className="card">
        <p className="card-label">🔍 Search & Filter</p>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-sm pointer-events-none">
            ⌕
          </span>
          <input
            type="text"
            className="field pl-9"
            placeholder="Search tasks by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <FilterButtons
          filter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />
      </div>

      {/* ── Task List ── */}
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onUpdate={handleUpdateTask}
        filter={filter}
      />
    </div>
  )
}

export default App