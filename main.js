const app = () => {
  const $container = document.getElementsByTagName('body')[0];
  const $box = document.getElementsByClassName('box')[0];
  const $stats = document.getElementsByClassName('stats')[0];
  const $counter = document.getElementsByClassName('pop-counter')[0];

  const balloonsLimit = 500;
  let balloons = 0;
  let popped = 0;

  const balloonClasses = ['green', 'yellow', 'pink', 'red'];

  const random = (max, round = false) => {
    const random = Math.random() * max;
    return round ? Math.floor(random) : random;
  };

  const handleBoxClick = () => {
    if ($box.classList.contains('clicked')) {
      return;
    }

    $box.classList.add('clicked');
    $stats.classList.add('visible');
    dispatchBalloons(50);
  };

  const popBalloon = $balloon => {
    $balloon.remove();
    popped += 1;
    $counter.innerHTML = popped;
  };

  const randomBalloonProps = () => {
    const type = balloonClasses[random(balloonClasses.length, true)];
    const duration = random(20) + 5 + 's';
    const marginLeft = random(100) + 'vw';
    const marginTop = random(15) + 'vh';

    return { type, duration, marginLeft, marginTop };
  };

  const dispatchBalloons = n => {
    for (let i = 0; i < n; i += 1) {
      if (balloons >= balloonsLimit) {
        break;
      }

      const $balloon = document.createElement('div');
      const props = randomBalloonProps();

      $balloon.classList.add('balloon', props.type);
      $balloon.style.animationDuration = props.duration;
      $balloon.style.left = props.marginLeft;
      $balloon.style.marginTop = props.marginTop;

      $balloon.onclick = () => handleBalloonClick($balloon);

      $container.append($balloon);
      balloons += 1;
    }
  };

  const handleBalloonClick = $balloon => {
    popBalloon($balloon);
    dispatchBalloons(20);
  };

  $box.onclick = handleBoxClick;
};

document.addEventListener('DOMContentLoaded', app);
