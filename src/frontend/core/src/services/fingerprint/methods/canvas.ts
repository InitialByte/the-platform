/* eslint @typescript-eslint/no-magic-numbers: 0, @typescript-eslint/ban-ts-comment: 0 */
// @ts-nocheck
export const fpCanvas = (): string[] => {
  const result = [];
  // Very simple now, need to make it more complex (geo shapes etc)
  const canvas = document.createElement('canvas');

  canvas.width = 2000;
  canvas.height = 200;
  canvas.style.display = 'inline';

  const ctx = canvas.getContext('2d');
  // eslint-disable-next-line max-len
  const someText = 'By the pricking of my thumbs, Something wicked this way comes. Open, locks, Whoever knocks!, \ud83d\ude09';
  const someNumber = Math.PI * 2;

  ctx.rect(0, 0, 10, 10);
  ctx.rect(2, 2, 6, 6);
  result.push(ctx.isPointInPath(5, 5, 'evenodd') === false);

  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#f60';
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = '#069';
  ctx.font = '10pt this-is-not-real-font';
  ctx.fillText(someText, 2, 15);
  ctx.fillStyle = 'rgba(102, 204, 0, 0.2)';
  ctx.font = '20pt Arial';
  ctx.fillText(someText, 4, 45);

  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = 'rgb(255,0,255)';
  ctx.beginPath();
  ctx.arc(50, 50, 50, 0, someNumber, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgb(0,255,255)';
  ctx.beginPath();
  ctx.arc(100, 50, 50, 0, someNumber, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgb(255,255,0)';
  ctx.beginPath();
  ctx.arc(75, 100, 50, 0, someNumber, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgb(255,0,255)';
  ctx.arc(75, 75, 75, 0, someNumber, true);
  ctx.arc(75, 75, 25, 0, someNumber, true);
  ctx.fill('evenodd');

  if (canvas.toDataURL) {
    result.push(canvas.toDataURL());
  }

  return result;
};
