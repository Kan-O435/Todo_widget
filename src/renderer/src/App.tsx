import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { GoalItem, MustDoItem, WantDoItem } from './components/molecules/TaskItems'
import { SectionList } from './components/organisms/SectionList'
import { DetailView } from './components/organisms/DetailView'

type MustDo = { id: number; text: string; done: boolean }
type Goal = { id: number; text: string }
type WantDo = { id: number; text: string; detail: string } // detailを追加

function App() {
  const [mustDos, setMustDos] = useLocalStorage<MustDo[]>('app-must', [])
  const [wantDos, setWantDos] = useLocalStorage<WantDo[]>('app-wants', [])
  const [goals, setGoals] = useLocalStorage<Goal[]>('app-goals', [])

  const [selectedWantDoId, setSelectedWantDoId] = useState<number | null>(null)

  const addGoal = (text: string) => setGoals([...goals, { id: Date.now(), text }])
  const deleteGoal = (id: number) => setGoals(goals.filter(g => g.id !== id))

  const addMust = (text: string) => setMustDos([...mustDos, { id: Date.now(), text, done: false }])
  const toggleMust = (id: number) => {
    setMustDos(mustDos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }
  const deleteMust = (id: number) => setMustDos(mustDos.filter(t => t.id !== id))

  const addWant = (text: string) => setWantDos([...wantDos, { id: Date.now(), text, detail: '' }])
  const deleteWant = (id: number) => {
    setWantDos(wantDos.filter(t => t.id !== id))
    if (selectedWantDoId === id) setSelectedWantDoId(null) // 開いているやつを消したら閉じる
  }
  const updateWantDetail = (text: string) => {
    if (!selectedWantDoId) return
    setWantDos(wantDos.map(t => t.id === selectedWantDoId ? { ...t, detail: text } : t))
  }

  const currentWantDo = wantDos.find(w => w.id === selectedWantDoId)

  return (
    <div className="widget-layout">
      {/* ヘッダー */}
      <div className="app-header">
        <span style={{ fontWeight: 'bold' }}>ToDo</span>
        <button className="btn-icon" onClick={() => window.close()} style={{ WebkitAppRegion: 'no-drag' } as any}>●</button>
      </div>

      {/* メインコンテンツ */}
      <div className="scroll-content">

        {/* 1. やるべきこと欄 (Checkboxあり) */}
        <SectionList title="やるべきこと" placeholder="タスクを追加..." onAdd={addMust}>
          {mustDos.map(m => (
            <MustDoItem 
              key={m.id} 
              text={m.text} 
              isDone={m.done} 
              onToggle={() => toggleMust(m.id)}
              onDelete={() => deleteMust(m.id)} 
            />
          ))}
        </SectionList>

        {/* 2. やりたいこと欄 (クリックでNotion風詳細へ) */}
        <SectionList title="やりたいこと" placeholder="アイデアを追加..." onAdd={addWant}>
          {wantDos.map(w => (
            <WantDoItem 
              key={w.id} 
              text={w.text} 
              onClick={() => setSelectedWantDoId(w.id)} // ここをクリックで詳細OPEN
              onDelete={(e) => deleteWant(w.id)} 
            />
          ))}
        </SectionList>

        {/* 3. 目標欄 (Create & Deleteのみ) */}
        <SectionList title="目標" placeholder="目標を追加..." onAdd={addGoal}>
          {goals.map(g => (
            <GoalItem key={g.id} text={g.text} onDelete={() => deleteGoal(g.id)} />
          ))}
        </SectionList>

      </div>

      {/* 詳細ページ（条件付きレンダリング） */}
      {currentWantDo && (
        <DetailView 
          title={currentWantDo.text}
          content={currentWantDo.detail}
          onUpdateContent={updateWantDetail}
          onClose={() => setSelectedWantDoId(null)}
        />
      )}
    </div>
  )
}

export default App