



    var container1 = document.getElementById('container1');
    var list1 = document.getElementById('list1');
    var buttons1 = document.getElementById('buttons1').getElementsByTagName('span');
    var prev1 = document.getElementById('prev1');
    var next1 = document.getElementById('next1');
    var index1 = 4;
    var len1 = 3;
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
        var left = parseInt(list1.style.left) + offset;

        var go = function() {
            if ((speed > 0 && parseInt(list1.style.left) < left) || (speed < 0 && parseInt(list1.style.left) > left)) {
                list1.style.left = parseInt(list1.style.left) + speed + 'px';
                setTimeout(go, inteval);
            } else {
                list1.style.left = left + 'px';
                if (left > -700) {
                    list1.style.left = -700 * len1 + 'px';
                }
                if (left < (-700 * len1)) {
                    list1.style.left = '-700px';
                }
                animated = false;
            }
        }
        go();
    }

    function showButton() {
        for (var i = 0; i < buttons1.length; i++) {
            if (buttons1[i].className == 'on') {
                buttons1[i].className = '';
                break;
            }
        }
        buttons1[index1 - 1].className = 'on';
    }

    function play() {
        timer = setTimeout(function() {
            next1.onclick();
            play();
        }, interval);
    }

    function stop() {
        clearTimeout(timer);
    }

    next1.onclick = function() {
        if (animated) {
            return;
        }
        if (index1 == 6) {
            index1 = 4;
        } else {
            index1 += 1;
        }
        animate(-700);
        showButton();
    }
    prev1.onclick = function() {
        if (animated) {
            return;
        }
        if (index1 == 4) {
            index1 = 6;
        } else {
            index1 -= 1;
        }
        animate(700);
        showButton();
    }

    for (var i = 0; i < buttons1.length; i++) {
        buttons1[i].onclick = function() {
            if (animated) {
                return;
            }
            if (this.className == 'on1') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index1'));
            var offset = -700 * (myIndex - index1);

            animate(offset);
            index1 = myIndex;
            showButton();
        }
    }

    container1.onmouseover = stop;
    container1.onmouseout = play;

    play();

