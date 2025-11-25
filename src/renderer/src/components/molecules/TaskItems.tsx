import React from 'react'

const DeleteButton = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => (
  <button className="btn-icon" onClick={onClick} style={{ marginLeft: 'auto' }}>×</button>
)

export const GoalItem = ({ text, onDelete }: { text: string; onDelete: () => void }) => (
  <div className="list-item">
    <span style={{ fontWeight: 'bold', color: '#fbbf24' }}>★</span>
    <span>{text}</span>
    <DeleteButton onClick={onDelete} />
  </div>
)

export const MustDoItem = ({ 
  text, 
  isDone, 
  onToggle, 
  onDelete 
}: { 
  text: string; 
  isDone: boolean; 
  onToggle: () => void; 
  onDelete: () => void 
}) => (
  <div className="list-item">
    <input type="checkbox" checked={isDone} onChange={onToggle} style={{ cursor: 'pointer' }} />
    <span style={{ textDecoration: isDone ? 'line-through' : 'none', opacity: isDone ? 0.5 : 1 }}>
      {text}
    </span>
    <DeleteButton onClick={onDelete} />
  </div>
)

export const WantDoItem = ({ 
  text, 
  onClick, 
  onDelete 
}: { 
  text: string; 
  onClick: () => void; 
  onDelete: (e: React.MouseEvent) => void 
}) => (
  <div className="list-item" onClick={onClick} style={{ cursor: 'pointer' }}>
    <span style={{ color: '#3b82f6' }}>▶</span>
    <span style={{ flex: 1 }}>{text}</span>
    {/* 削除ボタンを押した時に詳細ページが開かないように stopPropagation する */}
    <DeleteButton onClick={(e) => { e.stopPropagation(); onDelete(e); }} />
  </div>
)