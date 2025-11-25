import React from 'react'

type Props = {
  title: string;
  content: string;
  onUpdateContent: (text: string) => void;
  onClose: () => void;
}

export const DetailView = ({ title, content, onUpdateContent, onClose }: Props) => {
  return (
    <div className="detail-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', color: '#3b82f6' }}>{title}</h2>
        <button className="btn-icon" onClick={onClose} style={{ fontSize: '14px' }}>戻る</button>
      </div>
      
      <textarea
        className="detail-textarea"
        value={content}
        onChange={(e) => onUpdateContent(e.target.value)}
        placeholder="ここに詳細を自由に書いてください..."
      />
    </div>
  )
}