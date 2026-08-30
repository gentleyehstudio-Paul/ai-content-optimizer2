import React, { useEffect, useRef, forwardRef, useCallback } from 'react';
import { initWebGL, createShaderProgram, renderFrame } from '../utils/webglUtils';
import { getShaderSource } from '../shaders/shaderRegistry';
import '../styles/VideoCapture.css';

const VideoCapture = forwardRef(
  ({ mode, isActive, parameters, onFpsUpdate, onError }, ref) => {
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const glRef = useRef(null);
    const programRef = useRef(null);
    const textureRef = useRef(null);
    const frameCountRef = useRef(0);
    const lastTimeRef = useRef(Date.now());
    const animationIdRef = useRef(null);

    // Initialize WebGL and shader programs
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        const gl = initWebGL(canvas);
        glRef.current = gl;

        const { vertexSource, fragmentSource } = getShaderSource(mode);
        const program = createShaderProgram(gl, vertexSource, fragmentSource);
        programRef.current = program;

        // Create texture for video frame
        const texture = gl.createTexture();
        textureRef.current = texture;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        return () => {
          gl.deleteProgram(program);
          gl.deleteTexture(texture);
        };
      } catch (err) {
        onError(`WebGL initialization failed: ${err.message}`);
      }
    }, [onError]);

    // Recompile shader on mode change
    useEffect(() => {
      if (!glRef.current) return;

      try {
        const gl = glRef.current;
        const oldProgram = programRef.current;

        const { vertexSource, fragmentSource } = getShaderSource(mode);
        const newProgram = createShaderProgram(gl, vertexSource, fragmentSource);
        programRef.current = newProgram;

        if (oldProgram) gl.deleteProgram(oldProgram);
      } catch (err) {
        onError(`Shader compilation failed: ${err.message}`);
      }
    }, [mode, onError]);

    // Request camera access
    useEffect(() => {
      const initCamera = async () => {
        try {
          if (!isActive) {
            if (videoRef.current?.srcObject) {
              videoRef.current.srcObject.getTracks().forEach(track => track.stop());
              videoRef.current.srcObject = null;
            }
            return;
          }

          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: 'user'
            },
            audio: false
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          onError(`Camera access denied: ${err.message}`);
        }
      };

      initCamera();

      return () => {
        if (videoRef.current?.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
      };
    }, [isActive, onError]);

    // Main render loop with FPS monitoring
    const renderLoop = useCallback(() => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const gl = glRef.current;
      const program = programRef.current;
      const texture = textureRef.current;

      if (!canvas || !video || !gl || !program || !texture) {
        animationIdRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      // Resize canvas to match video dimensions
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }

        // Update texture with current video frame
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          video
        );

        // Render frame with current parameters
        renderFrame(gl, program, texture, parameters);
      }

      // Update FPS counter
      frameCountRef.current++;
      const now = Date.now();
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
        onFpsUpdate(currentFps);
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationIdRef.current = requestAnimationFrame(renderLoop);
    }, [parameters, onFpsUpdate]);

    // Start render loop when video is ready
    useEffect(() => {
      if (!isActive) {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        return;
      }

      const video = videoRef.current;
      if (!video) return;

      const handleCanPlay = () => {
        if (!animationIdRef.current) {
          animationIdRef.current = requestAnimationFrame(renderLoop);
        }
      };

      video.addEventListener('canplay', handleCanPlay);
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
      };
    }, [isActive, renderLoop]);

    return (
      <div className="video-capture-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="video-element"
        />
        <canvas
          ref={canvasRef}
          className="webgl-canvas"
        />
      </div>
    );
  }
);

VideoCapture.displayName = 'VideoCapture';

export default VideoCapture;
