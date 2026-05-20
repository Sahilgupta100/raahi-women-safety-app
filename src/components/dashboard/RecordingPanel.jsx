import { useState } from 'react';
import { Mic, Video, Square, Circle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { recordingService } from '../../services/recordingService';
import { useToast } from '../../context/ToastContext';

export default function RecordingPanel() {
  const [audioRecording, setAudioRecording] = useState(false);
  const [videoRecording, setVideoRecording] = useState(false);
  const [loading, setLoading] = useState({ audio: false, video: false });
  const [preview, setPreview] = useState(null);
  const { success, error } = useToast();

  const toggleAudio = async () => {
    setLoading((l) => ({ ...l, audio: true }));
    try {
      if (audioRecording) {
        const result = await recordingService.stopAudio();
        setAudioRecording(false);
        setPreview({ type: 'audio', duration: result.duration });
        success('Audio recording saved');
      } else {
        await recordingService.startAudio();
        setAudioRecording(true);
        setPreview({ type: 'audio', live: true });
        success('Audio recording started');
      }
    } catch (err) {
      error(err.message);
    } finally {
      setLoading((l) => ({ ...l, audio: false }));
    }
  };

  const toggleVideo = async () => {
    setLoading((l) => ({ ...l, video: true }));
    try {
      if (videoRecording) {
        const result = await recordingService.stopVideo();
        setVideoRecording(false);
        setPreview({ type: 'video', duration: result.duration });
        success('Video recording saved');
      } else {
        await recordingService.startVideo();
        setVideoRecording(true);
        setPreview({ type: 'video', live: true });
        success('Video recording started');
      }
    } catch (err) {
      error(err.message);
    } finally {
      setLoading((l) => ({ ...l, video: false }));
    }
  };

  const isAnyRecording = audioRecording || videoRecording;

  return (
    <Card
      id="recording"
      title="Audio & Video Recording"
      subtitle="Capture evidence securely from your device"
      icon={<Mic className="w-5 h-5" />}
      hover
    >
      <div className="space-y-5">
        {isAnyRecording && (
          <div
            className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50"
            role="status"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="text-sm font-medium text-red-700 dark:text-red-300">
              {audioRecording && videoRecording
                ? 'Audio & Video recording active'
                : audioRecording
                  ? 'Audio recording in progress'
                  : 'Video recording in progress'}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant={audioRecording ? 'danger' : 'primary'}
            onClick={toggleAudio}
            loading={loading.audio}
            fullWidth
            leftIcon={audioRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          >
            {audioRecording ? 'Stop Audio' : 'Start Audio'}
          </Button>
          <Button
            variant={videoRecording ? 'danger' : 'secondary'}
            onClick={toggleVideo}
            loading={loading.video}
            fullWidth
            leftIcon={videoRecording ? <Square className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          >
            {videoRecording ? 'Stop Video' : 'Start Video'}
          </Button>
        </div>

        <div className="rounded-xl border border-dashed border-raahi-purple-200 dark:border-zinc-600 overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-zinc-100 to-raahi-purple-50 dark:from-zinc-800 dark:to-zinc-900 flex flex-col items-center justify-center p-6 relative">
            {preview?.live || isAnyRecording ? (
              <>
                <div className="absolute inset-0 map-grid opacity-50" />
                <Circle className="w-12 h-12 text-red-500 animate-pulse-soft mb-3" />
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Live preview</p>
                <p className="text-xs text-zinc-500 mt-1">Recording from Raahi device (mock)</p>
              </>
            ) : preview ? (
              <>
                {preview.type === 'video' ? (
                  <Video className="w-10 h-10 text-raahi-purple-500 mb-2" />
                ) : (
                  <Mic className="w-10 h-10 text-raahi-purple-500 mb-2" />
                )}
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Last {preview.type} — {preview.duration}s
                </p>
                <p className="text-xs text-zinc-500 mt-1">Ready for cloud upload (backend pending)</p>
              </>
            ) : (
              <>
                <Video className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mb-2" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">No active recording</p>
                <p className="text-xs text-zinc-400 mt-1">Start audio or video to see preview</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
