
// 지현 담당
// 클릭 시 커서 변경 및 사운드 이펙트
const bodyClick = document.body.addEventListener('click', e => {
  if (!e.target.matches('.button-first')) {
    document.body.classList.add('cursor');
    const audio = document.createElement('audio');
    audio.setAttribute('src', './src/hammer_hit_sound.mp3');
    audio.autoplay = true;
    document.body.appendChild(audio);
    setTimeout(() => {
      if (document.body.classList.contains('cursor')) {
        document.body.classList.remove('cursor');
      }
      if (document.body.lastElementChild === audio) {
        document.body.removeChild(document.body.lastElementChild);
      }
    }, 350);
  }
});

let moleCount = 0;
const holes = [false, false, false, false, false, false, false, false, false];

// 시작 카운트다운 3, 2, 1, 시작!
document.querySelector('article.number-wrapper').insertAdjacentHTML('afterbegin', '<p>3</p>');
const $p = document.querySelector('p');

const countDown = setInterval(() => {
  $p.textContent--;
  if ($p.textContent == 0) {
    $p.textContent = '시작!';
    setTimeout(() => {
      document.querySelector('article.number-wrapper').removeChild($p);
      clearInterval(countDown);
    }, 1000);
  }
}, 1000);

// 두더지 생성 및 삭제
setTimeout(() => {
  const createMole = setInterval(() => {
    const $holes = [...document.querySelectorAll('div[class^=hole] .mask')];
    const idx = chooseMolePosition();
    setTimeout(() => {
      const mole = $holes[idx].firstElementChild;
      if (mole.classList.contains('digdaUp')) {
        mole.className = 'digdaDown';
      } else if (mole.classList.contains('doctrioUp')) {
        mole.className = 'doctrioDown';
      }

      holes[idx] = false;
      moleCount--;
      setTimeout(() => {
        $holes[idx].removeChild(mole);
      }, 1000);
    }, 1000);
  }, 500);

  // 윤빈 타이머
  let count = 60;
  const timer = setInterval(function () {
    count--;

    document.querySelector('.timer').textContent = count;

    if (count <= 10) {
      document.querySelector('.timer').style.color = 'red';
    }

    if (count === 0) {
      clearInterval(timer);
      removeEventListener('click', bodyClick);
      clearInterval(createMole);
      document.querySelector('.timer').textContent = 'FIN';

      setTimeout(() => {
        const $finish = document.getElementById('finish');
        $finish.classList.add('show');
        $finish.textContent = '다시하기';
        $finish.addEventListener('click', e => {
          location.reload();
        });
        endGame($score.textContent); // 최종 스코어를 인자로 전달
      }, 1000);
    }
  }, 1000);
}, 4000);

// 두더지가 어디에서 나오는지
function chooseMolePosition() {
  const $holes = [...document.querySelectorAll('div[class^=hole] .mask')];
  let idx;

  while (true) {
    idx = Math.floor(Math.random() * 9);
    if (!holes[idx]) break;
  }

  $holes[idx].appendChild(chooseMoleType());
  holes[idx] = true;
  moleCount++;

  return idx;
}

// 무슨 두더지가 나오는지
function chooseMoleType() {
  const randomNum = Math.floor(Math.random() * 3);
  const mole = document.createElement('img');
  switch (randomNum) { // 두더지 종류 설정
    case 0: {
      mole.setAttribute('src', './src/normal_digda.png');
      break;
    }

    case 1: {
      mole.setAttribute('src', './src/normal_alora_digda.png');
      break;
    }

    case 2: {
      mole.setAttribute('src', './src/normal_doctrio.png');
      break;
    }

    default: {
      mole.setAttribute('src', './src/normal_digda.png');
    }
  }

  if (randomNum <= 1) { // 디그다, 알로라 디그다 사이즈 및 위치 조정
    mole.style.width = '100%'
    mole.classList.add('digdaUp');

  } else if (randomNum === 2) { // 닥트리오 사이즈 및 위치 조정
    mole.style.width = '70%';
    mole.classList.add('doctrioUp');
  }

  return mole;
}

// 점수 매기기, 사진 변경, 사운드 이펙트
const $mole = document.querySelector('article.number-wrapper');
const $score = $mole.querySelector('h1 span');
const $moles = [...$mole.querySelectorAll('div[class^=hole] .mask img')];
$score.textContent = 0;

const $comboNum = document.querySelector('.comboNum');

const moleClick = $mole.addEventListener('click', e => {
  if (e.target.matches('.mask img')) {
    if (e.target.getAttribute('src') === './src/normal_digda.png') {
      e.target.setAttribute('src', './src/sad_digda.png');
      e.target.className = 'sadDigda';
      $score.textContent++;
      $comboNum.textContent++;
    }

    if (e.target.getAttribute('src') === './src/normal_alora_digda.png') {
      e.target.setAttribute('src', './src/sad_alora_digda.png');
      e.target.className = 'sadDigda';
      for (let i = 1; i <= 3; i++) {
        $score.textContent++;
      }
      $comboNum.textContent++;
    }

    if (e.target.getAttribute('src') === './src/normal_doctrio.png') {
      e.target.setAttribute('src', './src/sad_doctrio.png');
      e.target.className = 'sadDoctrio';
      for (let i = 1; i <= 5; i++) {
        $score.textContent++;
      }
      $comboNum.textContent++;
    }

    const audio = document.createElement('audio');
    audio.setAttribute('src', './src/mole_hit_sound.mp3');
    audio.autoplay = true;
    $mole.appendChild(audio);
    setTimeout(() => {
      if ($mole.lastElementChild === audio) {
        $mole.removeChild($mole.lastElementChild);
      }
    }, 1000);
  } else {
    $comboNum.textContent = 0;
  }

});


// 필살기 버튼 효과
if (document.body.animate) {
  document
    .querySelectorAll(".button")
    .forEach((button) => button.addEventListener("click", pop));
}

function pop(e) {
  for (let i = 0; i < 30; i++) {
    createParticle(e.clientX, e.clientY, e.target.dataset.type);
  }
}

function createParticle(x, y, type) {
  const particle = document.createElement("particle");
  document.body.appendChild(particle);

  const size = Math.floor(Math.random() * 20 + 5);

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  const destinationX = x + (Math.random() - 0.5) * 2 * 75;
  const destinationY = y + (Math.random() - 0.5) * 2 * 75;

  switch (type) {
    case "square":
      particle.style.background = `hsl(${Math.random() * 90 + 270}, 70%, 60%)`;
      particle.style.border = "1px solid white";
      break;
    case "circle":
      particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
      particle.style.borderRadius = "50%";
      break;
    default:
      particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
  }

  const animation = particle.animate(
    [
      {
        // Set the origin position of the particle
        // We offset the particle with half its size to center it around the mouse
        transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
        opacity: 1,
      },
      {
        // We define the final coordinates as the second keyframe
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0,
      },
    ],
    {
      duration: 500 + Math.random() * 1000,
      easing: "cubic-bezier(0, .9, .57, 1)",
      delay: Math.random() * 200,
    }
  );

  animation.onfinish = () => {
    particle.removeParticle;
  };
}

function removeParticle(e) {
  e.srcElement.effect.target.remove();
}

const $cute = document.querySelector('.cute');
const $main = document.querySelector('.border-radius');
const $wrapper = document.querySelector('.wrapper');

// 필살기
// let feverCount = 0;
// $feverButton.addEventListener('click', function () {
//   if (feverCount === 0) {
//   $wrapper.classList.add('dark-screen');
//   $main.classList.add('dark-screen');
//   $cute.style.display = 'block';

//   const electricEffect = document.createElement('video');
//   electricEffect.setAttribute('src', './src/fever_electricity_effect.mp4');
//   electricEffect.autoplay = true;
//   $wrapper.insertBefore(electricEffect, $cute);

//   feverCount++;
//   $mole.click();
//   setTimeout(function () {
//     $wrapper.classList.remove('dark-screen');
//     $wrapper.removeChild(electricEffect);
//     $main.classList.remove('dark-screen');
//     $cute.style.display = 'none';

//     $feverButton.style.background = 'gray';
//   }, 2000);
//   }
// });

// 게임이 끝난 후에 실행되는 함수
function endGame(score) {
  const name = prompt("이름을 입력하세요.");
  if (name === '' || name == null) {
    return;
  }

  // 쿠키에서 값들 가져오기
  let cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  let scoresArr = [];
  cookies.forEach((cookie) => {
    const [name, score] = cookie.split("=");
    if (isNaN(parseInt(score))) {
      expireCookie(name, score);
    } else {
      scoresArr.push({ name, score: parseInt(score) });
    }
  });

  // 새로운 점수 추가
  scoresArr.push({ name, score: parseInt(score) });

  // 점수로 내림차순 정렬
  scoresArr.sort((a, b) => b.score - a.score);

  // 쿠키에 다시 저장
  document.cookie = "";
  for (let i = 0; i < scoresArr.length; i++) {
    setCookie(scoresArr[i].name, scoresArr[i].score, 365 * 24 * 60 * 60);
  }

  // 순위 출력
  let ranking = "~ 순위 ~\n";
  for (let i = 0; i < scoresArr.length; i++) {
    ranking += `${i + 1}. ${scoresArr[i].name} : ${scoresArr[i].score}\n`;
  }
  alert(ranking);
}

function getCookie(name) {
  // 쿠키 값 가져오기
  let value = "; " + document.cookie;
  // 쿠키 값 분리하기
  let parts = value.split("; " + name + "=");
  // 쿠키 값이 존재하면 반환하기
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
  // 날짜 객체 생성하기
  let date = new Date();
  // 만료일 계산하기
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  let expires = "expires=" + date.toUTCString();
  // 쿠키 값 저장하기
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function expireCookie(name, value) {
  // 날짜 객체 생성하기
  let date = new Date();
  // 만료일 계산하기
  date.setTime(date.getTime());
  let expires = "expires=" + date.toUTCString();
  // 쿠키 값 저장하기
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
