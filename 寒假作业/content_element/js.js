
  var container2 = document.getElementById('container2');
    var list2 = document.getElementById('list2');
    var buttons2 = document.getElementById('buttons2').getElementsByTagName('span');
    var prev2 = document.getElementById('prev2');
    var next2 = document.getElementById('next2');
    var index2 = 7;
    var len2 = 3;
    var animated = false;
    var interval = 3000;
    var timer;


    function animate(offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300;
        var inteval = 10;
        var speed = offset / (time / inteval);
        var left = parseInt(list2.style.left) + offset;

        var go = function() {
            if ((speed > 0 && parseInt(list2.style.left) < left) || (speed < 0 && parseInt(list2.style.left) > left)) {
                list2.style.left = parseInt(list2.style.left) + speed + 'px';
                setTimeout(go, inteval);
            } else {
                list2.style.left = left + 'px';
                if (left > -280) {
                    list2.style.left = -280 * len2 + 'px';
                }
                if (left < (-280 * len2)) {
                    list2.style.left = '-280px';
                }
                animated = false;
            }
        }
        go();
    }

    function showButton() {
        for (var i = 0; i < buttons2.length; i++) {
            if (buttons2[i].className == 'on') {
                buttons2[i].className = '';
                break;
            }
        }
        buttons2[index2 - 1].className = 'on';
    }

    function play() {
        timer = setTimeout(function() {
            next2.onclick();
            play();
        }, interval);
    }

    function stop() {
        clearTimeout(timer);
    }

    next2.onclick = function() {
        if (animated) {
            return;
        }
        if (index2 == 9) {
            index2= 7;
        } else {
            index2 += 1;
        }
        animate(-280);
        showButton();
    }
    prev2.onclick = function() {
        if (animated) {
            return;
        }
        if (index2 == 7) {
            index2 = 9;
        } else {
            index2 -= 1;
        }
        animate(280);
        showButton();
    }

    for (var i = 0; i < buttons2.length; i++) {
        buttons2[i].onclick = function() {
            if (animated) {
                return;
            }
            if (this.className == 'on2') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index2'));
            var offset = -280 * (myIndex - index2);

            animate(offset);
            index2 = myIndex;
            showButton();
        }
    }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();
