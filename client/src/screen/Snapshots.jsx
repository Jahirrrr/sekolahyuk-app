/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */



import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllImages } from '../actions/snapshots';

const Snapshots = () => {
  const query = new URLSearchParams(useLocation().search);
  const testId = query.get('testId');
  const studentId = query.get('studentId');
  const [imgSrc, setImgSrc] = useState([]);
  useEffect(() => {
    async function getImg() {
      const images = await getAllImages(testId, studentId);
      setImgSrc(images);
    }
    getImg();
  }, []);

  return (
    <div style={{ margin: '5px', textAlign: 'center' }}>
      {imgSrc && imgSrc.map((i, j) => <img src={i} key={j} />)}
    </div>
  );
};
export default Snapshots;
