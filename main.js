const app = () => {
  const $container = document.getElementsByTagName('body')[0];
  const $box = document.getElementsByClassName('box')[0];

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
    dispatchBalloons(50);
  };

  const popBalloon = $balloon => {
    $balloon.remove();
  };

  const randomBalloonProps = () => {
    const type = balloonClasses[random(balloonClasses.length, true)];
    const duration = random(20) + 10 + 's';
    const marginLeft = random(100) + '%';
    const marginTop = random(100) + '%';

    return { type, duration, marginLeft, marginTop };
  };

  const dispatchBalloons = n => {
    for (let i = 0; i < n; i += 1) {
      const $balloon = document.createElement('div');
      const props = randomBalloonProps();

      $balloon.classList.add('balloon', props.type);
      $balloon.style.animationDuration = props.duration;
      $balloon.style.left = props.marginLeft;
      $balloon.style.marginTop = props.marginTop;

      $balloon.onclick = () => handleBalloonClick($balloon);

      $container.append($balloon);
    }
  };

  const handleBalloonClick = $balloon => {
    popBalloon($balloon);
    dispatchBalloons(20);
  };

  $box.onclick = handleBoxClick;
};

document.addEventListener('DOMContentLoaded', app);
