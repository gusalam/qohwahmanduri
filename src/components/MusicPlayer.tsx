import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';
import backgroundMusic from '@/assets/background-music.mp3';
import artworkImage from '@/assets/product-qohwah-manduri.jpg';

const STORAGE_KEY = 'qohwah-music-paused';

// Media Session Metadata
const MEDIA_METADATA = {
  title: 'Kopi Qohwah Manduri',
  artist: 'Qohwah Manduri Official',
  album: 'Kopi Rempah Tradisional',
};

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTapToPlay, setShowTapToPlay] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Setup Media Session API
  const setupMediaSession = useCallback(() => {
    if ('mediaSession' in navigator) {
      // Set metadata with artwork
      navigator.mediaSession.metadata = new MediaMetadata({
        title: MEDIA_METADATA.title,
        artist: MEDIA_METADATA.artist,
        album: MEDIA_METADATA.album,
        artwork: [
          { src: artworkImage, sizes: '96x96', type: 'image/jpeg' },
          { src: artworkImage, sizes: '128x128', type: 'image/jpeg' },
          { src: artworkImage, sizes: '192x192', type: 'image/jpeg' },
          { src: artworkImage, sizes: '256x256', type: 'image/jpeg' },
          { src: artworkImage, sizes: '384x384', type: 'image/jpeg' },
          { src: artworkImage, sizes: '512x512', type: 'image/jpeg' },
        ],
      });

      // Set action handlers
      navigator.mediaSession.setActionHandler('play', () => {
        const audio = audioRef.current;
        if (audio) {
          audio.play().then(() => {
            setIsPlaying(true);
            navigator.mediaSession.playbackState = 'playing';
          });
        }
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        const audio = audioRef.current;
        if (audio) {
          audio.pause();
          setIsPlaying(false);
          navigator.mediaSession.playbackState = 'paused';
        }
      });

      navigator.mediaSession.setActionHandler('stop', () => {
        const audio = audioRef.current;
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          setIsPlaying(false);
          navigator.mediaSession.playbackState = 'none';
        }
      });
    }
  }, []);

  // Update playback state
  const updatePlaybackState = useCallback((playing: boolean) => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check if user previously paused
    const wasPaused = localStorage.getItem(STORAGE_KEY) === 'true';
    
    // Set initial volume (ambient/low)
    audio.volume = 0.15;
    audio.loop = true;

    // Setup media session
    setupMediaSession();

    // Try autoplay
    const tryAutoplay = async () => {
      if (wasPaused) {
        setShowTapToPlay(true);
        return;
      }

      try {
        await audio.play();
        setIsPlaying(true);
        setHasInteracted(true);
        updatePlaybackState(true);
      } catch (error) {
        // Autoplay blocked, show tap to play
        setShowTapToPlay(true);
      }
    };

    tryAutoplay();

    // Listen for user interaction to enable audio
    const handleInteraction = () => {
      if (!hasInteracted && !wasPaused) {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
          setShowTapToPlay(false);
          updatePlaybackState(true);
        }).catch(() => {});
      }
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted, setupMediaSession, updatePlaybackState]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem(STORAGE_KEY, 'true');
      updatePlaybackState(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
        setShowTapToPlay(false);
        localStorage.setItem(STORAGE_KEY, 'false');
        updatePlaybackState(true);
      }).catch(() => {
        setShowTapToPlay(true);
      });
    }
  };

  const handleTapToPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().then(() => {
      setIsPlaying(true);
      setHasInteracted(true);
      setShowTapToPlay(false);
      localStorage.setItem(STORAGE_KEY, 'false');
      updatePlaybackState(true);
    }).catch(() => {});
  };

  return (
    <>
      <audio ref={audioRef} src={backgroundMusic} preload="auto" />
      
      {/* Fixed Music Player */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence mode="wait">
          {showTapToPlay && !hasInteracted ? (
            <motion.button
              key="tap-to-play"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleTapToPlay}
              className="flex items-center gap-2 px-4 py-3 rounded-full font-sans text-sm font-medium transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(30 15% 12%) 0%, hsl(30 20% 8%) 100%)',
                color: 'hsl(36 60% 60%)',
                boxShadow: '0 0 20px rgba(180, 140, 80, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)',
                border: '1px solid hsl(36 40% 25%)',
              }}
            >
              <Volume2 className="w-4 h-4" />
              Tap to Play Music
            </motion.button>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-60"
                style={{
                  background: isPlaying 
                    ? 'radial-gradient(circle, hsl(36 60% 50% / 0.4) 0%, transparent 70%)' 
                    : 'radial-gradient(circle, hsl(36 60% 50% / 0.2) 0%, transparent 70%)',
                  transform: 'scale(1.5)',
                }}
              />
              
              {/* Main Player Button */}
              <motion.button
                onClick={togglePlay}
                className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, hsl(30 15% 15%) 0%, hsl(30 20% 8%) 100%)',
                  boxShadow: isPlaying 
                    ? '0 0 30px rgba(180, 140, 80, 0.5), 0 4px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                    : '0 0 15px rgba(180, 140, 80, 0.2), 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  border: '2px solid hsl(36 40% 30%)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Rotating Artwork */}
                <motion.div
                  className="absolute inset-1 rounded-full overflow-hidden"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    duration: 8,
                    repeat: isPlaying ? Infinity : 0,
                    ease: 'linear',
                  }}
                >
                  <img 
                    src={artworkImage} 
                    alt="Qohwah Manduri"
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay for better contrast */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.4) 100%)',
                    }}
                  />
                </motion.div>
                
                {/* Rotating Gold Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '2px solid transparent',
                    borderTopColor: 'hsl(36 60% 55%)',
                    borderRightColor: 'hsl(36 50% 45%)',
                  }}
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    duration: 3,
                    repeat: isPlaying ? Infinity : 0,
                    ease: 'linear',
                  }}
                />
                
                {/* Play/Pause Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" style={{ color: 'hsl(36 60% 70%)' }} />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" style={{ color: 'hsl(36 60% 70%)' }} />
                  )}
                </motion.div>
              </motion.button>
              
              {/* Status Indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{
                  background: isPlaying ? 'hsl(120 60% 50%)' : 'hsl(0 60% 50%)',
                  boxShadow: isPlaying 
                    ? '0 0 8px hsl(120 60% 50%)' 
                    : '0 0 8px hsl(0 60% 50%)',
                }}
                animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
