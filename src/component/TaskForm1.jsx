import { useState } from "react"
//import { ChevronDown, Calendar, Upload, Send } from "lucide-react"

const TaskTypes = [
  "Physical Task",
  "Semester Task",
  "Web Development Task",
  "Problem Solving Task",
  "Research Task",
  "Reading Task",
]

export default function TaskForm1() {
  const [form, setForm] = useState({
    TaskType: "",
    startDate: "",
    endDate: "",
    reason: "",
  })

  const [showDropdown, setShowDropdown] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setForm({ ...form, document: e.target.files[0] })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) setForm({ ...form, document: file })
  }

  const handleSubmit = () => {
    if (!form.TaskType || !form.startDate || !form.endDate || !form.reason) {
      alert("Please fill all required fields!")
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="bg-emerald-100 dark:bg-emerald-900/40 w-20 h-20 rounded-full flex items-center justify-center">
          <Send className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Task Added Sucessfully!
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Your Task has been added to the system. You can view it in your task list.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ TaskType: "", startDate: "", endDate: "", reason: "" }) }}
          className="mt-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors duration-200"
        >
          Add Another Task
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300">
        Apply for Task
      </h1>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-6 transition-colors duration-300">
        Add a new task 
      </p>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">

        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-1 transition-colors duration-300">
          Task  form
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-6 transition-colors duration-300">
          Fill in the details below
        </p>

        {/* Leave Type Dropdown */}
        <div className="mb-5 relative">
          <label className="text-xs font-semibold text-blue-500 mb-1.5 block">
            Task type <span className="text-red-400">*</span>
          </label>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-colors duration-200
              ${form.TaskType
                ? "text-slate-700 dark:text-slate-300"
                : "text-slate-400 dark:text-slate-500"
              }
              border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700
              hover:border-blue-400 dark:hover:border-blue-400`}
          >
            <span>{form.TaskType || "Select task type"}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Options */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg z-10 overflow-hidden">
              {leaveTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { setForm({ ...form, TaskType: type }); setShowDropdown(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150
                    ${form.TaskType === type
                      ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Start & End Date */}
        <div className="grid grid-cols-2 gap-4 mb-5">

          {/* Start Date */}
          <div>
            <label className="text-xs font-semibold text-blue-500 mb-1.5 block">
              Start a date <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-300 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
              />
              <Calendar className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="text-xs font-semibold text-blue-500 mb-1.5 block">
              End a date <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-300 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
              />
              <Calendar className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Reason */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-blue-500 mb-1.5 block">
            Reason <span className="text-red-400">*</span>
          </label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Provide the reason for your leave..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 resize-none"
          />
        </div>
{/*  
        {/* File Upload *}
        <div className="mb-6">
          <label className="text-xs font-semibold text-blue-500 mb-1.5 block">
            Supporting Document (Optional)
          </label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
            className={`w-full border-2 border-dashed rounded-xl py-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-200
              ${dragOver
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
          >
            <Upload className={`w-6 h-6 transition-colors duration-200 ${dragOver ? "text-blue-500" : "text-blue-500"}`} />
            {form.document ? (
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                ✅ {form.document.name}
              </p>
            ) : (
              <>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  PDF, JPG, PNG up to 5MB
                </p>
              </>
            )}
          </div>
          <input
            id="fileInput"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>  */}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <Send className="w-4 h-4" />
          Submit Your Request
        </button>

      </div>
    </>
  )
}