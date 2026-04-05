import { useState, useEffect } from "react";

// ─── Utility ────────────────────────────────────────────────────────────────
const generateId = () => Math.random().toString(36).slice(2, 9);
const STORAGE_KEY = "react_task_manager_tasks";
const loadTasks = () => { try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : []; } catch { return []; } };
const saveTasks = (t) => localStorage.setItem(STORAGE_KEY, JSON.stringify(t));

// ─── Icons ──────────────────────────────────────────────────────────────────
const CheckIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>);
const EditIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>);
const TrashIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>);
const PlusIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>);
const ListIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>);
const CloseIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);

const PRIORITY = {
  high:   { label: "High",   color: "#ef4444", bg: "#fef2f2", dot: "#ef4444" },
  medium: { label: "Medium", color: "#d97706", bg: "#fffbeb", dot: "#f59e0b" },
  low:    { label: "Low",    color: "#059669", bg: "#ecfdf5", dot: "#10b981" },
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #f5f4f0; color: #1a1a1a; min-height: 100vh; }

  .shell { max-width: 760px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; }

  .header { background: #1a1a1a; padding: 0 28px; display: flex; align-items: center; justify-content: space-between; height: 60px; position: sticky; top: 0; z-index: 100; }
  .brand { font-family: 'Playfair Display', serif; color: #f5f4f0; font-size: 19px; }
  .brand em { color: #bef264; font-style: normal; }
  .nav { display: flex; gap: 4px; }
  .nav-btn { display: flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500; transition: all 0.15s; color: #9ca3af; background: transparent; }
  .nav-btn:hover { color: #f5f4f0; background: #2a2a2a; }
  .nav-btn.on { color: #1a1a1a; background: #bef264; }
  .badge-pill { font-size: 11px; background: rgba(190,242,100,0.18); color: #bef264; border-radius: 999px; padding: 1px 7px; margin-left: 2px; }
  .nav-btn.on .badge-pill { background: rgba(0,0,0,0.12); color: #1a1a1a; }

  .page { padding: 36px 28px; flex: 1; animation: fadeUp 0.22s ease; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  .page-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; margin-bottom: 5px; }
  .page-sub { color: #6b7280; font-size: 14px; margin-bottom: 30px; }

  .card { background: #fff; border-radius: 16px; padding: 26px; box-shadow: 0 1px 4px rgba(0,0,0,0.07), 0 4px 18px rgba(0,0,0,0.04); }

  .field { margin-bottom: 18px; }
  .lbl { display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.6px; text-transform: uppercase; color: #9ca3af; margin-bottom: 6px; }
  .inp, .txa, .sel { width: 100%; padding: 11px 13px; border: 1.5px solid #e5e7eb; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14.5px; color: #1a1a1a; background: #fafaf9; transition: border-color 0.14s, box-shadow 0.14s; outline: none; }
  .inp:focus, .txa:focus, .sel:focus { border-color: #bef264; box-shadow: 0 0 0 3px rgba(190,242,100,0.2); background: #fff; }
  .txa { resize: vertical; min-height: 86px; }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .btn-add { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; background: #1a1a1a; color: #bef264; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 6px; transition: all 0.16s; }
  .btn-add:hover { background: #2d2d2d; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0,0,0,0.16); }

  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }
  .stat { background: #fff; border-radius: 12px; padding: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
  .stat-n { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; }
  .stat-l { font-size: 12px; color: #9ca3af; margin-top: 2px; }

  .filters { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .fil { padding: 7px 15px; border-radius: 999px; border: 1.5px solid #e5e7eb; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #6b7280; cursor: pointer; transition: all 0.14s; display: flex; align-items: center; gap: 6px; }
  .fil:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .fil.on { background: #1a1a1a; color: #bef264; border-color: #1a1a1a; }
  .fil-n { display: inline-flex; align-items: center; justify-content: center; width: 19px; height: 19px; border-radius: 999px; background: rgba(190,242,100,0.2); color: #1a1a1a; font-size: 11px; font-weight: 700; }
  .fil.on .fil-n { background: rgba(190,242,100,0.22); color: #bef264; }

  .tasklist { display: flex; flex-direction: column; gap: 10px; }
  .tcard { background: #fff; border-radius: 13px; padding: 17px 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03); display: flex; align-items: flex-start; gap: 13px; transition: all 0.18s; border-left: 3px solid transparent; }
  .tcard:hover { box-shadow: 0 3px 10px rgba(0,0,0,0.1), 0 6px 22px rgba(0,0,0,0.06); transform: translateY(-1px); }
  .tcard.done { opacity: 0.6; }

  .chk { width: 26px; height: 26px; border-radius: 50%; border: 2px solid #d1d5db; background: transparent; cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.16s; margin-top: 1px; color: transparent; }
  .chk:hover { border-color: #bef264; }
  .chk.on { background: #1a1a1a; border-color: #1a1a1a; color: #bef264; }

  .tbody { flex: 1; min-width: 0; }
  .ttitle { font-size: 15px; font-weight: 600; margin-bottom: 3px; word-break: break-word; }
  .ttitle.done { text-decoration: line-through; color: #9ca3af; }
  .tdesc { font-size: 13px; color: #6b7280; margin-bottom: 9px; line-height: 1.5; word-break: break-word; }
  .tmeta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .pbadge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 999px; font-size: 11.5px; font-weight: 600; }
  .pdot { width: 6px; height: 6px; border-radius: 50%; }
  .duedate { font-size: 12px; color: #9ca3af; font-weight: 500; }
  .duedate.od { color: #ef4444; }

  .tactions { display: flex; gap: 4px; flex-shrink: 0; opacity: 0; transition: opacity 0.14s; }
  .tcard:hover .tactions { opacity: 1; }
  .ibtn { width: 30px; height: 30px; border-radius: 8px; border: 1.5px solid #e5e7eb; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #9ca3af; transition: all 0.13s; }
  .ibtn.e:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
  .ibtn.d:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

  .empty { text-align: center; padding: 56px 20px; }
  .empty-ico { font-size: 40px; margin-bottom: 10px; }
  .empty h3 { font-size: 16px; font-weight: 600; color: #6b7280; margin-bottom: 5px; }
  .empty p { font-size: 13.5px; color: #9ca3af; }

  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.42); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeUp 0.15s ease; }
  .modal { background: #fff; border-radius: 18px; padding: 26px; width: 100%; max-width: 470px; box-shadow: 0 24px 60px rgba(0,0,0,0.22); animation: slideUp 0.18s ease; max-height: 90vh; overflow-y: auto; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  .mhead { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .mtitle { font-family: 'Playfair Display', serif; font-size: 20px; }
  .mclose { width: 30px; height: 30px; border-radius: 7px; border: 1.5px solid #e5e7eb; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #6b7280; transition: all 0.13s; }
  .mclose:hover { border-color: #ef4444; color: #ef4444; }

  .toast { position: fixed; bottom: 22px; left: 50%; transform: translateX(-50%); background: #1a1a1a; color: #bef264; padding: 10px 22px; border-radius: 999px; font-size: 14px; font-weight: 500; z-index: 300; animation: tIn 0.22s ease, tOut 0.22s ease 1.85s forwards; white-space: nowrap; box-shadow: 0 4px 16px rgba(0,0,0,0.25); }
  @keyframes tIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  @keyframes tOut { to { opacity: 0; transform: translateX(-50%) translateY(10px); } }
`;

// ─── Sub-components ──────────────────────────────────────────────────────────
function Toast({ msg }) { return msg ? <div className="toast">{msg}</div> : null; }

function TaskForm({ initial, onSubmit, submitLabel }) {
  const [f, setF] = useState(initial);
  const s = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const handle = () => { if (!f.title.trim()) return false; onSubmit(f); return true; };
  return (
    <>
      <div className="field"><label className="lbl">Task Title *</label><input className="inp" value={f.title} onChange={s("title")} placeholder="What needs to be done?" /></div>
      <div className="field"><label className="lbl">Description</label><textarea className="txa" value={f.description} onChange={s("description")} placeholder="Add more details (optional)…" /></div>
      <div className="row2">
        <div className="field"><label className="lbl">Priority</label>
          <select className="sel" value={f.priority} onChange={s("priority")}>
            <option value="high">🔴 High</option><option value="medium">🟡 Medium</option><option value="low">🟢 Low</option>
          </select>
        </div>
        <div className="field"><label className="lbl">Due Date</label><input className="inp" type="date" value={f.dueDate} onChange={s("dueDate")} /></div>
      </div>
      <button className="btn-add" onClick={() => { if (!handle()) alert("Please enter a task title."); }}>
        <PlusIcon /> {submitLabel}
      </button>
    </>
  );
}

function EditModal({ task, onSave, onClose }) {
  const [f, setF] = useState({ ...task });
  const s = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="mhead"><span className="mtitle">Edit Task</span><button className="mclose" onClick={onClose}><CloseIcon /></button></div>
        <div className="field"><label className="lbl">Task Title *</label><input className="inp" value={f.title} onChange={s("title")} /></div>
        <div className="field"><label className="lbl">Description</label><textarea className="txa" value={f.description} onChange={s("description")} /></div>
        <div className="row2">
          <div className="field"><label className="lbl">Priority</label>
            <select className="sel" value={f.priority} onChange={s("priority")}>
              <option value="high">🔴 High</option><option value="medium">🟡 Medium</option><option value="low">🟢 Low</option>
            </select>
          </div>
          <div className="field"><label className="lbl">Due Date</label><input className="inp" type="date" value={f.dueDate} onChange={s("dueDate")} /></div>
        </div>
        <button className="btn-add" onClick={() => f.title.trim() && onSave(f)}><CheckIcon /> Save Changes</button>
      </div>
    </div>
  );
}

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const p = PRIORITY[task.priority];
  const today = new Date().toISOString().split("T")[0];
  const overdue = task.dueDate && task.dueDate < today && !task.completed;
  return (
    <div className={`tcard ${task.completed ? "done" : ""}`} style={{ borderLeftColor: p.dot }}>
      <button className={`chk ${task.completed ? "on" : ""}`} onClick={() => onToggle(task.id)}>{task.completed && <CheckIcon />}</button>
      <div className="tbody">
        <div className={`ttitle ${task.completed ? "done" : ""}`}>{task.title}</div>
        {task.description && <div className="tdesc">{task.description}</div>}
        <div className="tmeta">
          <span className="pbadge" style={{ background: p.bg, color: p.color }}><span className="pdot" style={{ background: p.dot }} />{p.label}</span>
          {task.dueDate && <span className={`duedate ${overdue ? "od" : ""}`}>{overdue ? "⚠ Overdue · " : "Due "}{task.dueDate}</span>}
        </div>
      </div>
      <div className="tactions">
        <button className="ibtn e" onClick={() => onEdit(task)} title="Edit"><EditIcon /></button>
        <button className="ibtn d" onClick={() => onDelete(task.id)} title="Delete"><TrashIcon /></button>
      </div>
    </div>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────
function CreatePage({ onAdd, showToast }) {
  const blank = { title: "", description: "", priority: "medium", dueDate: "" };
  const [key, setKey] = useState(0);
  const submit = (f) => {
    onAdd({ id: generateId(), completed: false, createdAt: new Date().toISOString(), ...f });
    showToast("✓ Task added!");
    setKey((k) => k + 1);
  };
  return (
    <div className="page">
      <h1 className="page-title">New Task</h1>
      <p className="page-sub">Add something you need to get done.</p>
      <div className="card"><TaskForm key={key} initial={blank} onSubmit={submit} submitLabel="Add Task" /></div>
    </div>
  );
}

function TasksPage({ tasks, onToggle, onEdit, onDelete }) {
  const [filter, setFilter] = useState("all");
  const counts = { all: tasks.length, pending: tasks.filter((t) => !t.completed).length, completed: tasks.filter((t) => t.completed).length };
  const sorted = [...tasks]
    .filter((t) => filter === "all" ? true : filter === "completed" ? t.completed : !t.completed)
    .sort((a, b) => { if (a.completed !== b.completed) return a.completed ? 1 : -1; return new Date(b.createdAt) - new Date(a.createdAt); });

  return (
    <div className="page">
      <h1 className="page-title">All Tasks</h1>
      <p className="page-sub">Track your progress across everything.</p>
      <div className="stats">
        <div className="stat"><div className="stat-n">{counts.all}</div><div className="stat-l">Total</div></div>
        <div className="stat"><div className="stat-n" style={{ color: "#d97706" }}>{counts.pending}</div><div className="stat-l">Pending</div></div>
        <div className="stat"><div className="stat-n" style={{ color: "#059669" }}>{counts.completed}</div><div className="stat-l">Completed</div></div>
      </div>
      <div className="filters">
        {[["all","All"],["pending","Pending"],["completed","Completed"]].map(([v,l]) => (
          <button key={v} className={`fil ${filter===v?"on":""}`} onClick={() => setFilter(v)}>{l}<span className="fil-n">{counts[v]}</span></button>
        ))}
      </div>
      {sorted.length === 0
        ? <div className="empty"><div className="empty-ico">📋</div><h3>{filter==="completed"?"No completed tasks yet":filter==="pending"?"All caught up!":"No tasks yet"}</h3><p>{filter==="all"?"Create your first task to get started.":"Switch filters to see other tasks."}</p></div>
        : <div className="tasklist">{sorted.map((t) => <TaskCard key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />)}</div>
      }
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("create");
  const [tasks, setTasks] = useState(loadTasks);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [tk, setTk] = useState(0);

  useEffect(() => { saveTasks(tasks); }, [tasks]);

  const showToast = (msg) => { setToast(msg); setTk((k) => k + 1); setTimeout(() => setToast(null), 2200); };
  const addTask   = (t) => setTasks((p) => [t, ...p]);
  const toggle    = (id) => setTasks((p) => p.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  const remove    = (id) => { setTasks((p) => p.filter((t) => t.id !== id)); showToast("Task deleted"); };
  const saveEdit  = (u) => { setTasks((p) => p.map((t) => t.id === u.id ? u : t)); setEditing(null); showToast("✓ Task updated!"); };

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <header className="header">
          <div className="brand">Task<em>Flow</em></div>
          <nav className="nav">
            <button className={`nav-btn ${page==="create"?"on":""}`} onClick={() => setPage("create")}><PlusIcon /> Create</button>
            <button className={`nav-btn ${page==="tasks"?"on":""}`} onClick={() => setPage("tasks")}><ListIcon /> My Tasks {tasks.length > 0 && <span className="badge-pill">{tasks.length}</span>}</button>
          </nav>
        </header>
        {page === "create"
          ? <CreatePage key="c" onAdd={addTask} showToast={showToast} />
          : <TasksPage tasks={tasks} onToggle={toggle} onEdit={setEditing} onDelete={remove} />
        }
      </div>
      {editing && <EditModal task={editing} onSave={saveEdit} onClose={() => setEditing(null)} />}
      {toast && <Toast key={tk} msg={toast} />}
    </>
  );
}