import { useEffect, useRef, useState, useCallback } from 'react';

const useSnake = (width, height) => {
  const scalingFactor = width / 30;
  const scaledWidth = width / scalingFactor;
  const scaledHeight = height / scalingFactor;
  const getRandomFood = useCallback(() => ({ x: Math.floor(Math.random() * scaledWidth), y: Math.floor(Math.random() * scaledHeight) }), [scaledWidth, scaledHeight]);
  const element = useRef({});
  const [snake, setSnake] = useState([{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }]);
  const [direction, setDirection] = useState('right');
  const [food, setFood] = useState(getRandomFood());
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('initial');
  
  // draw
  useEffect(() => {
    const ctx = element.current.getContext('2d');
    ctx.clearRect(0, 0, element.current.width, element.current.height);
    ctx.fillStyle = '#000000';
    for (const item of snake) {
      const minifyingCoefficient = 1;
      ctx.fillRect(item.x * scalingFactor + minifyingCoefficient, item.y * scalingFactor + minifyingCoefficient, scalingFactor - 2 * minifyingCoefficient, scalingFactor - 2 * minifyingCoefficient);
      ctx.stroke();
    }
    ctx.fillStyle = '#0088bb';
    ctx.fillRect(food.x * scalingFactor, food.y * scalingFactor, scalingFactor, scalingFactor);
    ctx.stroke();
  }, [snake, food, scalingFactor]);

  // move
  useEffect(() => {
    const timeout = setTimeout(() => {
      const [head, ...tail] = snake;
      const { x, y } = head;
      if(tail.some(square => square.x === x && square.y === y)) {
        setStatus('end');
      }
      let newHead = { x: 0, y: 0 };
      switch (direction) {
      case 'right':
        newHead = { x: (x + 1) % scaledWidth, y: y };
        break;
      case 'up':
        newHead = { x: x, y: y === 0 ? scaledHeight - 1 : y - 1 };
        break;
      case 'left':
        newHead = { x: x === 0 ? scaledWidth - 1 : x - 1, y: y };
        break;
      case 'down':
        newHead = { x: x, y: (y + 1) % scaledHeight };
        break;
      default:
        break;
      }
      if(newHead.x === food.x && newHead.y === food.y) {
        const newSnake = [newHead, ...snake];
        setSnake(newSnake);
        setFood(getRandomFood());
        setScore(score + 1);
      }else {
        const newSnake = [newHead, ...snake.slice(0, snake.length - 1)];
        setSnake(newSnake);
      }
    }, 300);
    if(status === 'end') {
      clearTimeout(timeout);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [direction, snake, score, food.x, food.y, getRandomFood, scaledHeight, scaledWidth, status]);

  // keylistener
  useEffect(() => {
    const changeDirection = (e) => {
      switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        setDirection('right');
        break;
      case 'ArrowUp':
        e.preventDefault();
        setDirection('up');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setDirection('left');
        break;
      case 'ArrowDown':
        e.preventDefault();
        setDirection('down');
        break;
      default:
        break;
      }
    };
    window.addEventListener('keydown', changeDirection);
    return () => {
      window.removeEventListener('keydown', changeDirection);
    };
  }, []);
  
  return { element, score, status };
};

export default useSnake;