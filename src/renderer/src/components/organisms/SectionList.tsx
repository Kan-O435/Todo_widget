import React, { useState } from 'react'

type Props = {
  title: string;
  placeholder: string;
  children: React.ReactNode;
  onAdd: (text: string) => void;
}

export const SectionList = ({ title, placeholder, children, onAdd }: Props) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    onAdd(input)
    setInput('')
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      <h3 className="section-title">{title}</h3>
      {/* リスト表示部分 */}
      <div style={{ marginBottom: '10px' }}>
        {children}
      </div>
      {/* 入力フォーム */}
      <form onSubmit={handleSubmit}>
        <input 
          className="input-base"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  )
}