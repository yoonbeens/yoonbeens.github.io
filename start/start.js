
const $select = document.querySelectorAll('.select .char')
const $btn = document.querySelector('.btn')

// for(let $s of [...$select]) {
//     $s.addEventListener('click', e => { 
//         $s.style.border = '5px solid black';
//         console.log($s)
//     })
// }
const $support = document.querySelector('.support')
$support.addEventListener('click', function () {
    location.href = './support.html'
})

const $rightBall = document.querySelector('.rightBall')
$rightBall.addEventListener('click', function () {
    location.href = './support.html'
})

const $finish = document.getElementById('finish');

$btn.addEventListener('click', function () {
    // const $finish = document.getElementById('finish');
    $finish.classList.add('show');

    let count = 2;

    let timer = setInterval(function () {
        count--;
        //   $finish.textContent = count;

        if (count === 0) {
            clearInterval(timer)
            // $finish.textContent = 'start';

            location.href = '../main/index.html';
        }



    }, 1000);


})

// function autoPopup(url, width, height) {
//     window.open(url, '_blank', 'width=' + width + ',height=' + height + ',top=180,left=1000');
// }


// autoPopup('./support.html', 700, 700);

// const $selectChar = window.opener.document.getElementById('selectChar');
const $selectChar = document.querySelector('.selectChar');


for (let i = 0; i < $select.length; i++) {
    $select[i].addEventListener('click', e => {
        for (let j = 0; j < $select.length; j++) {
            $select[j].classList.remove('border');
        }

        if (!$select[i].classList.contains('border')) {
            // $select[i].style.border = '5px solid goldenrod';
            $select[i].classList.add('border');
            // $finish.style.backgroundImage = $select[i].style.backgroundImage;


            // $selectChar.classList.add($select[i]);
            // console.log($selectChar.textContent);
            // console.log($select[i])

            if ($select[i].classList.contains('char1')) {
                $finish.style.backgroundImage = "url('./startsrc/지우_애프터.png')";
                $selectChar.style.backgroundImage = "url('./startsrc/지우_애프터.png')";
            } else if ($select[i].classList.contains('char2')) {
                $finish.style.backgroundImage = "url('./startsrc/로이2.png')";
                $selectChar.style.backgroundImage = "url('./startsrc/로이2.png')";
            } else if ($select[i].classList.contains('char3')) {
                $finish.style.backgroundImage = "url('./startsrc/웅이_애프터.png')";
                $selectChar.style.backgroundImage = "url('./startsrc/웅이_애프터.png')";
            } else if ($select[i].classList.contains('char4')) {
                $finish.style.backgroundImage = "url('./startsrc/빛나2.png')";
                $selectChar.style.backgroundImage = "url('./startsrc/빛나2.png')";
            }


            // var classList = document.getElementsByClassName(".select .char")[1]

            // var $classList = $select[i].classList[1];
            // var $div = $selectChar.classList[0]

            // var $classList = $select[i][1].classList;
            // var $div = $selectChar[0];

            // $div.classList.add($classList);



            // if($select[i].classList.contains('border')) {
            //     $selectChar.classList.add($select[i].classList)
            // }

            // $selectChar.innerHTML = "";
            // $selectChar.appendChild($select[i])

            // console.log($div)
        } else if ($select[i].classList.contains('border')) {
            // $select[i].style.border = 'none';
            $select[i].classList.remove('border')

            // if($select[i].classList.contains('charA')) {
            //     $select[i].classList.remove('charA')
            //     $select[i].classList.add('char1')
            // } else if($select[i].classList.contains('charB')) {
            //     $select[i].classList.remove('charB')
            //     $select[i].classList.add('char2') 
            // } else if($select[i].classList.contains('charC')) {
            //     $select[i].classList.remove('charC')
            //     $select[i].classList.add('char3') 
            // } else if($select[i].classList.contains('charD')) {
            //     $select[i].classList.remove('charD')
            //     $select[i].classList.add('char4') 
            // } 


            // var $classList = $select[i].classList[1];
            // var $div = $selectChar.classList[0]

            // var $classList = $select[i][1].classList;
            // var $div = $selectChar[0];

            // $div.classList.remove($classList);
            // $div.classList.remove();
        }

        // console.log($select[i])
    });
}


// function inputChar() {
//     location.replace("http://127.0.0.1:5500/main/index.html")
//     let $inputImg = document.createElement("img");

//     $inputImg.src = "./index.html";

//     document.getElementById("combo").appendChild($inputImg);
//     $inputImg.setAttribute('id', 'selectChar')

//     document.cookie = "img=" + $inputImg.src;
// }