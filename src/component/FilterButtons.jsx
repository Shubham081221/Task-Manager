// FilterButtons shows All / Completed / Pending filter tabs
// Props:
//   filter        — current active filter ('all' | 'completed' | 'pending')
//   onFilterChange(value) — called when a filter button is clicked
//   counts        — { all, completed, pending } task counts for badges
function FilterButtons({ filter, onFilterChange, counts }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ]

  return (
    <div className="filter-bar">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          className={`filter-btn ${filter === value ? 'active' : ''}`}
          onClick={() => onFilterChange(value)}
        >
          {label}
          <span className="filter-count">({counts[value]})</span>
        </button>
      ))}
    </div>
  )
}

export default FilterButtons;