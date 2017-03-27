window.renderStatistics = function(ctx, names, times) {
    //статистика игры после прохождения 
    //тень
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    //белая подложка
    ctx.fillStyle = 'white';
    ctx.strokeRect(100, 10, 420, 270);
    ctx.fillRect(100, 10, 420, 270);
    //текст
    ctx.fillStyle = '#000';
    ctx.font = '14px PT Mono';
    ctx.fillText('Ура вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);
    //расчет максимального времени прохождения
    var max = 0;
    var maxIndex = 0;

    for (var i = 0; i < times.length; i++) {
        var time = times[i];
        if (time > max) {
            max = time;
            maxIndex = i;
        }
    }
    //расчет и отрисовка гистограммы//
    var histogramHeight = 150;              // px;
    var step = histogramHeight / max; // px;
    var barWight = 40; // px; 
    var indent = 50 + barWight;    // px;
    var initialX = 120; // px;
    var initialY = 240;  // px;

    ctx.textBaseline = 'middle'; // положение надписи по центру
    for (var i = 0; i < times.length; i++) {
        ctx.fillStyle = '#000';
        ctx.font = '14px PT Mono';
        ctx.fillText(Math.floor(times[i]), initialX + indent * i, initialY - (times[i] * step) - 10); //время
        ctx.fillText(names[i], initialX + indent * i, initialY + 10); //Имя
        //отрисовка 
        (names[i] === "Вы") ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = 'rgba(0, 24, 255, ' + (Math.random() * (0.9 - 0.1) + 0.1) + ')';
        ctx.fillRect(initialX + indent * i, initialY, barWight, -(times[i] * step));
    }
};

