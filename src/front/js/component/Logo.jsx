import React from 'react';
import { TrendingUp } from 'lucide-react';


export const Logo = () => {
  return (
    <div className="d-flex align-items-center justify-content-center p-3 rounded-3 shadow-sm">
      <TrendingUp className="me-2" style={{ color: '#39FF14' }} size={32} />
      <h1 className="mb-0 fw-bold">
        <span className="" style={{ color: '#39FF14' }}>Andi</span>
        <span className="text-secondary">gu</span>
      </h1>
    </div>
  );
}