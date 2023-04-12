import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import WordCloud from 'wordcloud';
import './WC.scss';

const Wc = () => {
  useEffect(()=>{
    WordCloud(
      document.querySelector('.WC canvas'),
      // this.refs['my-canvas'],
      {
        list: [
          ['foo', 12], 
          ['bar', 6],
          ['bar', 6],
          ['bar', 6],
          ['bar', 6],
          ['bar', 6],
          ['bar', 6],
          ['bar', 6],
          ['bar', 6],
          ['bar', 6],
          ['bar', 5],
          ['bar', 1],
        ],
        weightFactor: 5,
        fontFamily: 'Times, serif',
        color: function (word, weight) {
          return (weight === 12) ? '#f02222' : '#c09292';
        },
        // rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: '#ffe0e0'
      });
  }, [])
  
  return  (
    <div className="WC flex justify-center " >
      <canvas ></canvas>
    </div>
  )
};

Wc.propTypes = {};

Wc.defaultProps = {};

export default Wc;
