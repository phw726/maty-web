'use client';

import { useState } from 'react';

export const useSajuAI = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const askSaju = async (prompt: string) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResult(data.result ?? '');
    } catch (e) {
      setError('AI 응답을 받아오지 못했습니다.');
      console.error('[useSajuAI]', e);
    } finally {
      setLoading(false);
    }
  };

  return { askSaju, result, loading, error };
};
