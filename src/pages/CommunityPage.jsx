// src/pages/CommunityPage.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PromptCard from '../components/PromptCard';
import SkeletonCard from '../components/SkeletonCard';
import { getCommunityPrompts, upvotePrompt } from '../services/api';
import socket from '../services/socket';

function CommunityPage() {
  const [prompts, setPrompts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');
  
  const observer = useRef();
  
  const lastPromptElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchPrompts = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await getCommunityPrompts(page);
          setPrompts(prevPrompts => {
            const existingIds = new Set(prevPrompts.map(p => p._id));
            const newPrompts = data.prompts.filter(p => !existingIds.has(p._id));
            return [...prevPrompts, ...newPrompts];
          });
          setHasMore(data.currentPage < data.totalPages);
        } catch (err) {
          setError('Failed to fetch community prompts.');
        } finally {
          setLoading(false);
        }
    };
    if(hasMore) fetchPrompts();
  }, [page]);

  useEffect(() => {
    const handlePromptUpdate = (updatedPrompt) => {
      setPrompts(currentPrompts => 
        currentPrompts.map(p => p._id === updatedPrompt._id ? updatedPrompt : p)
      );
    };
    socket.on('prompt:updated', handlePromptUpdate);

    return () => {
      socket.off('prompt:updated', handlePromptUpdate);
    };
  }, []);

  const handleUpvote = async (promptId) => {
      try {
          await upvotePrompt(promptId);
      } catch (err) {
          console.error("Failed to upvote prompt", err);
          alert("Failed to upvote. Please try again.");
      }
  };

  const vaultContainerStyle = {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      boxSizing: 'border-box'
  };
  
  const heroStyle = {
      textAlign: 'center',
      padding: '60px 20px',
      marginBottom: '50px',
      borderRadius: '20px',
      background: 'linear-gradient(45deg, #6D28D9, #4F46E5)',
      color: 'white',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
  };

  const heroTitleStyle = {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      marginBottom: '15px',
      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
  };

  const heroSubtitleStyle = {
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: '650px',
      margin: '0 auto',
      lineHeight: '1.6'
  };

  const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '30px'
  };

  const endOfListStyle = {
      textAlign: 'center',
      padding: '40px',
      color: '#6B7280',
      fontWeight: '500',
      fontSize: '1.1rem',
      gridColumn: '1 / -1' // Span across all columns
  };

  return (
    <div style={vaultContainerStyle}>
        <div style={heroStyle}>
            <h1 style={heroTitleStyle}>Community Prompts</h1>
            <p style={heroSubtitleStyle}>Discover, share, and get inspired by a collection of prompts from creators around the world.</p>
        </div>
        <div style={gridStyle}>
            {prompts.map((prompt, index) => {
                const isLastElement = prompts.length === index + 1;
                return (
                    <div ref={isLastElement ? lastPromptElementRef : null} key={prompt._id}>
                        <PromptCard 
                            prompt={prompt} 
                            onUpvote={handleUpvote}
                            showUpvoteButton={true}
                        />
                    </div>
                );
            })}
            {loading && <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>}
            {!loading && !hasMore && <p style={endOfListStyle}>You've reached the end!</p>}
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}

export default CommunityPage;
