'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const [playerName, setPlayerName] = useState('')
  const [playerId, setPlayerId] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedName = localStorage.getItem('futzada-player-name')
    const savedId = localStorage.getItem('futzada-player-id')

    if (savedName) setPlayerName(savedName)
    if (savedId) setPlayerId(savedId)
  }, [])

  const handleSave = () => {
    if (playerName.trim()) {
      localStorage.setItem('futzada-player-name', playerName.trim())
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: 32 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar
      </Link>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: 32 }}>
        👤 Seu Perfil
      </h1>

      <div style={{ marginBottom: 32 }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: 8, color: 'var(--color-muted)' }}>
          Nome do Jogador
        </label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Digite seu nome..."
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            fontSize: '1rem',
            fontFamily: 'var(--font-sans)',
          }}
        />
      </div>

      <div style={{ marginBottom: 32 }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: 8, color: 'var(--color-muted)' }}>
          ID do Jogador (gerado automaticamente)
        </label>
        <div style={{
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface-2)',
          color: 'var(--color-muted-2)',
          fontSize: '0.85rem',
          fontFamily: 'monospace',
          wordBreak: 'break-all',
        }}>
          {playerId}
        </div>
      </div>

      <button
        onClick={handleSave}
        style={{
          width: '100%',
          padding: '10px 20px',
          borderRadius: 'var(--radius-sm)',
          background: 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)',
          border: 'none',
          color: '#0a0a0b',
          fontSize: '1rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {saved ? '✅ Salvo!' : 'Salvar Perfil'}
      </button>

      {/* Info */}
      <div style={{
        marginTop: 40,
        padding: '16px',
        borderRadius: 'var(--radius)',
        background: 'rgba(16,185,129,0.06)',
        border: '1px solid rgba(16,185,129,0.2)',
        fontSize: '0.85rem',
        color: 'var(--color-text)',
      }}>
        <p style={{ marginBottom: 8 }}>
          <strong>💡 Dica:</strong> Seu nome aparecerá no ranking global. Todos os seus scores serão associados ao seu ID.
        </p>
        <p>
          Os dados são salvos localmente no seu navegador. Se limpar cache, você perderá o histórico.
        </p>
      </div>
    </div>
  )
}
