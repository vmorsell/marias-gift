const app = () => {
  const $container = document.getElementsByTagName('body')[0];
  const $box = document.getElementsByClassName('box')[0];
  const $stats = document.getElementsByClassName('stats')[0];
  const $counter = document.getElementsByClassName('pop-counter')[0];
  const $level = document.getElementsByClassName('level')[0];

  let level = -1;
  let popped = 0;

  const balloonClasses = ['green', 'yellow', 'pink', 'red'];
  const levels = [
    { icon: '🥚', name: 'Ägg', balloons: 10, popped: 0 },
    { icon: '🐣', name: 'Nykläckt', balloons: 20, popped: 10 },
    { icon: '🇳🇴', name: 'Norrman', balloons: 50, popped: 20 },
    { icon: '🦏', name: 'Noshörning', balloons: 100, popped: 50 },
    { icon: '🦄', name: 'Enhörning', balloons: 250, popped: 100 },
    { icon: '♟', name: 'Pjäs', balloons: 1000, popped: 200 },
  ];

  const random = (max, round = false) => {
    const random = Math.random() * max;
    return round ? Math.floor(random) : random;
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

  const nextLevel = () => {
    level += 1;

    const newBalloons =
      level > 0
        ? levels[level].balloons - levels[level - 1].balloons
        : levels[0].balloons;

    dispatchBalloons(newBalloons);
    $level.innerHTML = levels[level].icon + ' ' + levels[level].name;
  };

  const handleBalloonClick = $balloon => {
    popBalloon($balloon);
    dispatchBalloons(1);

    if (popped == levels[level + 1].popped) {
      nextLevel();
    }
  };

  const handleBoxClick = () => {
    if ($box.classList.contains('clicked')) {
      return;
    }

    $box.classList.add('clicked');
    $stats.classList.add('visible');
    nextLevel();
  };

  $box.onclick = handleBoxClick;
};

document.addEventListener('DOMContentLoaded', app);
