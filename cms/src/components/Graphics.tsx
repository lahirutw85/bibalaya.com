import React from 'react';

export const Logo: React.FC = () => {
    return (
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
                src="https://ik.imagekit.io/bibalaya/SVG/Bibalaya.com%20-%20LOGO.svg?updatedAt=1747814898195"
                alt="Bibalaya"
                style={{ height: '40px', width: 'auto' }}
            />
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--theme-elevation-800)' }}>
                CMS
            </span>
        </div>
    );
};

export const Icon: React.FC = () => {
    return (
        <img
            src="https://ik.imagekit.io/bibalaya/SVG/Bibalaya.com%20-%20LOGO.svg?updatedAt=1747814898195"
            alt="Bibalaya Icon"
            style={{ height: '24px', width: 'auto' }}
        />
    );
};
