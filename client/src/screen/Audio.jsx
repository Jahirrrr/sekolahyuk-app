/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllAudioRec } from '../actions/audio';

const Audio = () => {
  const query = new URLSearchParams(useLocation().search);
  const testId = query.get('testId');
  const studentId = query.get('studentId');
  const [audio, setAudio] = useState([]);
  useEffect(() => {
    async function getAudioRec() {
      const audioRec = await getAllAudioRec(testId, studentId);
      setAudio(audioRec);
    }
    getAudioRec();
  }, []);

  return (
    <div style={{ margin: '5px', textAlign: 'center' }}>
      {audio &&
        audio.map((i, j) => (
          <div>
            <audio controls="controls" src={i} type="audio/webm" key={j} />
          </div>
        ))}
    </div>
  );
};
export default Audio;
