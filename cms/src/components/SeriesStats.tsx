'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Card = ({ label, value, type }: { label: string, value: string | number, type?: 'default' | 'purple' | 'gold' }) => {
    return (
        <div className="glass" style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <span style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--muted)',
                zIndex: 2
            }}>
                {label}
            </span>
            <span style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#fff',
                zIndex: 2
            }}>
                {value}
            </span>

            {/* Decorative Glows */}
            {type === 'purple' && <div style={{
                position: 'absolute', right: '-20px', top: '-20px',
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'var(--primary)', filter: 'blur(30px)', opacity: 0.2
            }} />}
            {type === 'gold' && <div style={{
                position: 'absolute', right: '-20px', top: '-20px',
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'var(--gold)', filter: 'blur(30px)', opacity: 0.15
            }} />}
        </div>
    )
}

export const SeriesStats: React.FC = () => {
    const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Total
                const totalReq = await fetch('/api/series?limit=0')
                const totalRes = await totalReq.json()

                // Fetch Drafts (if enabled)
                const draftReq = await fetch('/api/series?where[_status][equals]=draft&limit=0')
                const draftRes = await draftReq.json()

                // Fetch Published
                const pubReq = await fetch('/api/series?where[_status][equals]=published&limit=0')
                const pubRes = await pubReq.json()

                setStats({
                    total: totalRes.totalDocs || 0,
                    published: pubRes.totalDocs || 0,
                    drafts: draftRes.totalDocs || 0
                })
            } catch (e) {
                console.error("Failed to fetch stats", e)
            }
        }

        fetchStats()
    }, [])

    return (
        <div style={{ marginBottom: '40px' }}>
            {/* Header / Actions */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Series Overview</h2>
                    <p style={{ color: 'var(--muted)' }}>Manage your content pipeline</p>
                </div>

                <Link href="/admin/collections/series/create" className="btn btn--style-primary">
                    <span style={{ marginRight: '8px' }}>+</span> Create New Series
                </Link>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px'
            }}>
                <Card label="Total Series" value={stats.total} type="purple" />
                <Card label="Published" value={stats.published} />
                <Card label="Drafts" value={stats.drafts} type="gold" />
            </div>
        </div>
    )
}
