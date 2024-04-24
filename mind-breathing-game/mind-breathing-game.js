document.querySelector('.mindful-breathing-start-button').addEventListener('click', startGame);

function startGame() {
  document.querySelector('.mindful-breathing-start-button').style.display = 'none';
  document.querySelector('.mindful-breathing-instructions').style.display = 'none';
  document.querySelector('.mindful-breathing-circle').style.display = 'block';
  var instructionsDiv = createInstructions();
  document.querySelector('.mindful-breathing-container').insertBefore(instructionsDiv, document.querySelector('.mindful-breathing-circle'));
  animateBreathing();
}

function animateBreathing() {
  const circle = document.querySelector('.mindful-breathing-circle');
  const duration = 8000;
  const breathInDuration = duration * 0.6;
  const breathOutDuration = duration * 0.4;
  const maxSize = 450;

  circle.style.width = '200px';
  circle.style.height = '200px';

  setTimeout(() => {
    circle.style.transition = `width ${breathInDuration}ms ease-in-out, height ${breathInDuration}ms ease-in-out`;
    circle.style.width = `${maxSize}px`;
    circle.style.height = `${maxSize}px`;

    setTimeout(() => {
      circle.style.transition = `width ${breathOutDuration}ms ease-in-out, height ${breathOutDuration}ms ease-in-out`;
      circle.style.width = '200px';
      circle.style.height = '200px';

      setTimeout(() => {
        animateBreathing();
      }, breathOutDuration);
    }, breathInDuration);
  }, 500);
}

function createInstructions() {
  var instructionsDiv = document.createElement('div');
  instructionsDiv.id = 'mindful-breathing-instructions';
  instructionsDiv.innerHTML = `
    <h2>Instructions</h2>
    <p>Take a deep, relaxing breath as the circle expands.</p>
    <p>Exhale slowly as the circle contracts.</p>
    <p>Repeat this breathing cycle to calm your mind.</p>
  `;
  return instructionsDiv;
}