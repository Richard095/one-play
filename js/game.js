$(document).ready(function () {

    //Adding cards to array
    let yellowCards = new Array();
    let blueCards = new Array();
    let redCards = new Array();
    let greenCards = new Array();
    let comodines = new Array();



    function yellow() {

        for (let i = 0; i < 10; i++) {
            yellowCards.push({ name: i + '.jpg', color: 'Amarillo', type: 'normal', value: 0, number: i, id: i });
        }
        yellowCards.push({ name: 'reversa.jpg', color: 'Amarillo', type: 'reversa', value: 0, number: null, id: 'reversa' },
            { name: 'robados.jpg', color: 'Amarillo', type: 'tomados', value: 2, number: null, id: 'robados' },
            { name: 'salto.jpg', color: 'Amarillo', type: 'salto', value: 0, number: null, id: 'salto' });

    }
    function blue() {

        for (let i = 0; i < 10; i++) {
            blueCards.push({ name: 'azul' + i + '.jpg', color: 'Azul', type: 'normal', value: 0, number: i, id: 'azul' + i });
        }
        blueCards.push({ name: 'azul' + 'reversa' + '.jpg', color: 'Azul', type: 'reversa', value: 0, number: null, id: 'azulreversa' },
            { name: 'azul' + 'robados' + '.jpg', color: 'Azul', type: 'tomados', value: 2, number: null, id: 'azulrobados' },
            { name: 'azul' + 'salta' + '.jpg', color: 'Azul', type: 'salto', value: 0, number: null, id: 'azulsalta' });


    }

    function red() {

        for (let i = 0; i < 10; i++) {
            redCards.push({ name: 'rojo' + i + '.jpg', color: 'Rojo', type: 'normal', value: 0, number: i, id: 'rojo' + i });
        }
        redCards.push({ name: 'rojo' + 'reversa' + '.jpg', color: 'Rojo', type: 'reversa', value: 0, number: null, id: 'rojoreversa' },
            { name: 'rojo' + 'robados' + '.jpg', color: 'Rojo', type: 'tomados', value: 2, number: null, id: 'rojorobados' },
            { name: 'rojo' + 'salta' + '.jpg', color: 'Rojo', type: 'salto', value: 0, number: null, id: 'rojosalta' });


    }


    function green() {

        for (let i = 0; i < 10; i++) {
            greenCards.push({ name: 'verde' + i + '.jpg', color: 'Verde', type: 'normal', value: 0, number: i, id: 'verde' + i });
        }
        greenCards.push({ name: 'verde' + 'reversa' + '.jpg', color: 'Verde', type: 'reversa', value: 0, number: null, id: 'verdereversa' },
            { name: 'verde' + 'robados' + '.jpg', color: 'Verde', type: 'tomados', value: 2, number: null, id: 'verderobados' },
            { name: 'verde' + 'salto' + '.jpg', color: 'Verde', type: 'salto', value: 0, number: null, id: 'verdesalto' });


    }

    function comodin() {
        for (let i = 0; i < 2; i++) {
            comodines.push({ name: 'comodin' + (i + 1) + '.jpg', color: 'multiple', type: 'normal', value: 0, number: null, id: 'comodin' + (i + 1) });
        }
        for (let i = 0; i < 2; i++) {
            comodines.push({ name: 'comodin_' + (i + 1) + '.jpg', color: 'multiple', type: 'tomacuatro', value: 4, number: null, id: 'comodin_' + (i + 1) });
        }

    }

    function Cards() {
        for (let i = 0; i < yellowCards.length; i++) { cards.push(yellowCards[i]); }
        for (let i = 0; i < blueCards.length; i++) { cards.push(blueCards[i]); }
        for (let i = 0; i < redCards.length; i++) { cards.push(redCards[i]); }
        for (let i = 0; i < greenCards.length; i++) { cards.push(greenCards[i]); }
        for (let i = 0; i < comodines.length; i++) { cards.push(comodines[i]); }
    }

    yellow();
    blue();
    red();
    green();
    comodin();






    //Main code ---------------------------------------------------------------


    let cards = new Array();
    let player1 = new Array();
    let player2 = new Array();
    let discards = new Array();
    let removeClass = 'btn-light';
    let turn = false; // = Jugador 1
    let color;
    let randomColor;
    let uno = false;



    Cards(); //Junta toda las cartas
    shuffle(cards);
    shuffle(cards);



    //Repartir cartas a  cada Judor
    function prepareCards() {
        for (let i = 0; i < cards.length; i++) {
            if (player1.length < 7) {
                let card = cards.pop();
                player1.push(card);
            }
        }
        for (let i = 0; i < cards.length; i++) {
            if (player2.length < 7) {
                let card = cards.pop();
                player2.push(card);
            }
        }
    }
    prepareCards();



    //Pintamos tablero
    function load_IA() {
        let container = $(".content-ia");
        for (let i = 0; i < player1.length; i++) {
            //let img = $("<img></img>").attr('src', 'img/' + '/default.jpg');// else cards[i].name -- player1[i].name
            let img = $("<img></img>").attr('src', 'img/' + player1[i].name);
            img.attr('class', 'card ' + player1[i].id);
            img.attr('alt', player1[i].id);
            container.append(img);
        }
    }

    function load_human() {
        let container = $(".content-human");
        for (let i = 0; i < player2.length; i++) {
            let img = $("<img></img>").attr('src', 'img/' + player2[i].name); // else cards[i].name
            img.attr('class', 'card humancard ' + player2[i].id);
            img.attr('alt', player2[i].id);

            container.append(img);
        }
    }

    //Extraer primer carta par iniciar el juego  
    function load_first_card() {
        let contentCardInPlay = $(".playing");
        $(".playing ").children().remove();
        let card = cards.pop();
        if (card.color == 'multiple') {
            cards.unshift(card.name);
            load_first_card(); //Ejecuto de nuevo la funcion
        } else {
            let img = $("<img></img>").attr('src', 'img/' + card.name); // else cards[i].name
            img.attr('class', 'card humancard ' + card.id);
            img.attr('alt', card.id);
            contentCardInPlay.append(img);
            discards.push(card);

            if (card.color == 'Amarillo') {
                $('#btnCardInPlay').removeClass(removeClass);
                $('#btnCardInPlay').addClass('btn-warning');
                removeClass = 'btn-warning';
            }
            if (card.color == 'Verde') {
                $('#btnCardInPlay').removeClass(removeClass);
                $('#btnCardInPlay').addClass('btn-success');
                removeClass = 'btn-success';
            }
            if (card.color == 'Rojo') {
                $('#btnCardInPlay').removeClass(removeClass);
                $('#btnCardInPlay').addClass('btn-danger');
                removeClass = 'btn-danger';
            }
            if (card.color == 'Azul') {
                $('#btnCardInPlay').removeClass(removeClass);
                $('#btnCardInPlay').addClass('btn-primary');
                removeClass = 'btn-primary';
            }

        }
        turn = true;
    }
    load_IA();
    load_human();
    load_first_card();




    //INICIA EL JUEGO
    let count = 0;
    function startGame() {

        switch (turn) {
            case false:  //Turno del Jugador1

                showTurn();
                let optionsPlayer1 = options(player1);
                let comodinCards = comodinOptions(player1);
                let childContent = $('.content-ia').children();
                let containerIA = $('.content-ia');


                if (optionsPlayer1.length > 0) {
                    let CardChosen = optionsPlayer1[Math.floor(Math.random() * optionsPlayer1.length)];
                    setTimeout(function () {
                        let imageid; //Verificando elemento a eliminar del DOM
                        for (let i = 0; i < childContent.length; i++) {
                            let elem = childContent[i];
                            let imagename = $(elem).attr("alt");
                            if (CardChosen.id == imagename) {
                                imageid = imagename;
                            }
                        }
                        for (let j = 0; j < player1.length; j++) {
                            if (imageid == player1[j].id) {
                                $('.' + imageid).remove();
                            }
                        }
                        removeElement(player1, CardChosen); //elimina elemento en especifico Jugador 1
                        discards.push(CardChosen);
                        showCardInPlay(discards);
                        penalizationTwoCards(CardChosen);   //Dar penalizacion en caso de haber
                        if (player2.length == 0) { alert('Gano! Player 1!'); }
                        if ((CardChosen.type == 'reversa') || (CardChosen.type == 'salto')) {
                            turn = false;
                            startGame();
                        } else {
                            turn = true;
                            startGame();//LLmada recursiva
                        }

                    }, 2000);

                } else {

                    if (comodinCards.length > 0) {
                        //----------------------------------------
                        let CardChosen = comodinCards[Math.floor(Math.random() * comodinCards.length)];
                        setTimeout(function () {
                            let imageid; //Verificando elemento a eliminar del DOM
                            for (let i = 0; i < childContent.length; i++) {
                                let elem = childContent[i];
                                let imagename = $(elem).attr("alt");
                                if (CardChosen.id == imagename) {
                                    imageid = imagename;
                                }
                            }
                            for (let j = 0; j < player1.length; j++) {
                                if (imageid == player1[j].id) {
                                    $('.' + imageid).remove();
                                }
                            }
                            removeElement(player1, CardChosen); //elimina elemento en especifico Jugador 1
                            if (CardChosen.color == 'multiple') {
                                let colors = new Array(['Amarillo', 'Rojo', 'Verde', 'Azul']);
                                randomColor = colors[Math.floor(Math.random() * colors.length)];
                            }

                            CardChosen.color = randomColor;
                            discards.push(CardChosen);
                            showCardInPlay(discards);
                            penalizationTwoCards(CardChosen);   //Dar penalizacion en caso de haber
                            if (player1.length == 0) { alert('Gano! Player 1!'); }
                            if ((CardChosen.type == 'reversa') || (CardChosen.type == 'salto')) {
                                turn = false;
                                startGame();
                            } else {
                                turn = true;
                                startGame();//LLmada recursiva
                            }




                        }, 2000);
                        //----------------------------------------


                    } else {

                        setTimeout(function () {
                            count = count + 1;
                            if (count < 2) {
                                let card = cards.pop();
                                player1.push(card);
                                let img = $("<img></img>").attr('src', 'img/' + '/default.jpg');// else cards[i].name -- player1[i].name
                                //let img = $("<img></img>").attr('src', 'img/' + card.name);
                                img.attr('class', 'card ' + card.id);
                                img.attr('alt', card.id);
                                containerIA.append(img);
                                turn = false;
                                startGame();
                            } else {
                                turn = true;
                                count = 0; //In
                                startGame();

                            }
                        }, 2000);

                    }

                }
                break;


            case true: //Turno jugador 2
                showTurn();
                $(document).on('click', '.humancard', function (e) {
                    let optionArray = options(player2);
                    let comodinCards = comodinOptions(player2);

                    let imagename = $(this).attr("alt");



                    if (optionArray.length > 0) {

                        for (let j = 0; j < optionArray.length; j++) {
                            console.log(optionArray[j].name);

                            if (optionArray[j].name == (imagename + '.jpg')) {  //Verifico si la img clickeada es igual a uno de las opc
                                for (let i = 0; i < player2.length; i++) {
                                    if (imagename == player2[i].id) {
                                        let chosen = player2[i];
                                        $('.' + imagename).remove();
                                        removeElement(player2, player2[i]);
                                        discards.push(chosen);
                                        showCardInPlay(discards);
                                        penalizationTwoCards(chosen);
                                        // one();
                                        if (player2.length == 0) { alert('Gano! Player 2'); }
                                        if ((chosen.type == 'reversa') || (chosen.type == 'salto')) {
                                            turn = true;
                                            startGame();
                                        } else {
                                            turn = false;
                                            startGame();
                                        }
                                    }
                                }
                            } else {
                                console.log('No lanzar');
                            }
                        }


                    } else {
                        console.log('VERIFICANDO!! ');
                        if (comodinCards.length > 0) {

                            //POSIBILIDAD DE LANZAR 

                            for (let j = 0; j < comodinCards.length; j++) {
                                if (comodinCards[j].name == (imagename + '.jpg')) {
                                    for (let i = 0; i < player2.length; i++) {
                                        if (imagename == player2[i].id) {
                                            let chosen = player2[i];
                                            $('.' + imagename).remove();
                                            removeElement(player2, player2[i]);


                                            if (chosen.color == 'multiple') {
                                                chooseColor();
                                            }
                                            $('.modal').on('hidden.bs.modal', function () {

                                                chosen.color = color;
                                                discards.push(chosen);
                                                showCardInPlay(discards);
                                                penalizationTwoCards(chosen);
                                                //one();
                                                if (player2.length == 0) { alert('Gano! Player 2'); }
                                                if ((chosen.type == 'reversa') || (chosen.type == 'salto')) {
                                                    turn = true;
                                                    startGame();
                                                } else {
                                                    turn = false;
                                                    startGame();
                                                }
                                            });

                                        }
                                    }
                                }
                            }
                        } else {
                            console.log('No lanzar');
                        }



                    }



                });
                break;
        }
    }

    startGame();

    // Funtion for get cards random athought of array 
    function shuffle(array) {
        let i, j, temp;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    //Remove specific element in array
    function removeElement(array, elem) {
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
    }


    //Mostrar carta jugada 
    function showCardInPlay(array) {
        let contentCardInPlay = $(".playing");
        $(".playing ").children().remove();
        let card = array.slice(-1)[0];
        //console.log(card);
        //Creo elemento

        if (card.color == 'Amarillo') {
            $('#btnCardInPlay').removeClass(removeClass);
            $('#btnCardInPlay').addClass('btn-warning');
            removeClass = 'btn-warning';
        }
        if (card.color == 'Verde') {
            $('#btnCardInPlay').removeClass(removeClass);
            $('#btnCardInPlay').addClass('btn-success');
            removeClass = 'btn-success';
        }
        if (card.color == 'Rojo') {
            $('#btnCardInPlay').removeClass(removeClass);
            $('#btnCardInPlay').addClass('btn-danger');
            removeClass = 'btn-danger';
        }
        if (card.color == 'Azul') {
            $('#btnCardInPlay').removeClass(removeClass);
            $('#btnCardInPlay').addClass('btn-primary');
            removeClass = 'btn-primary';
        }



        let img = $("<img></img>").attr('src', 'img/' + card.name); // else cards[i].name
        img.attr('class', 'card humancard ' + card.id);
        img.attr('alt', card.id);
        contentCardInPlay.append(img);
    }



    //Muestra turno siguiente
    function showTurn() {
        if (!turn) {
            dissableClickHuman();
            $('.turnoPlayer').text('Turno de Jugador 1');

        } else {
            $('.turnoPlayer').text('Turno de Jugador 2');
            activeClickHuman();
        }
    }

    function chooseColor() {
        let modal = $('.modal');
        modal.modal('toggle');
        modal.modal({ backdrop: 'static', keyboard: false })

    }


    function dissableClickHuman() {
        let container = $('.content-human').children();
        container.removeClass('humancard');
    }
    function activeClickHuman() {
        let container = $('.content-human').children();
        container.addClass('humancard');
    }





    //Tomamos 
    function takeCard() {
        let container = $(".content-human");
        let takeCard = $(".take"); 7

        takeCard.click(function () {

            //ANtes de tomar la carta verifico si tengo opciones
            let options = new Array();
            let lastCardDiscarted = discards.slice(-1)[0]; //Tomo la ultima carta de descartes
            for (let i = 0; i < player2.length; i++) {
                //1ra
                if ((player2[i].color == lastCardDiscarted.color) || (player2[i].number == lastCardDiscarted.number && (player2[i].color != 'multiple'))) {
                    if ((player2[i].number == null) && (lastCardDiscarted.number == null)) {
                        //No hacer nada..
                    } else {
                        let option = player2[i];
                        options.push(option);
                    }
                }
                //2da
                if ((player2[i].type == 'reversa') && (lastCardDiscarted.type == 'reversa') ||
                    (player2[i].type == 'salto') && (lastCardDiscarted.type == 'salto')) {
                    console.log('En efecto........');
                    let option = player2[i];
                    options.push(option);
                }

                //3ra
                if ((player2[i].color == lastCardDiscarted.color) && (cardsSomePlayer[i].type == 'tomados' && lastCardDiscarted.type == 'reversa')
                    || (player2[i].color == lastCardDiscarted.color) && (player2[i].type == 'tomados' && lastCardDiscarted.type == 'salto')
                    || (player2[i].color == lastCardDiscarted.color) && (player2[i].type == 'salto' && lastCardDiscarted.type == 'tomados')
                    || (player2[i].color == lastCardDiscarted.color) && (player2[i].type == 'salto' && lastCardDiscarted.type == 'reversa')
                    || (player2[i].color == lastCardDiscarted.color) && (player2[i].type == 'reversa' && lastCardDiscarted.type == 'salto')) {
                        let option = player2[i];
                        options.push(option);
                }



            }

            
            if (options.length > 0) {
                alert("Hay opciones para lanzar");
            } else {


                //Tomo carta si no hay opciones
                let card = cards.pop();
                player2.push(card);
                let img = $("<img></img>").attr('src', 'img/' + card.name); // else cards[i].name
                img.attr('class', 'card humancard ' + card.id);
                img.attr('alt', card.id);
                container.append(img);

                //  Checando opciones ->>>>

                let actualOptions = new Array();
                let lastCardDis = discards.slice(-1)[0];

                for (let i = 0; i < player2.length; i++) {
                    //1ra
                    if ((player2[i].color == lastCardDis.color) || (player2[i].number == lastCardDis.number && (player2[i].color != 'multiple'))) {
                        if ((player2[i].number == null) && (lastCardDis.number == null)) {
                            //No hacer nada..
                        } else {
                            let optionP2 = player2[i];
                            actualOptions.push(optionP2);
                        }
                    }
                    //2da
                    if ((player2[i].type == 'reversa') && (lastCardDiscarted.type == 'reversa') ||
                        (player2[i].type == 'salto') && (lastCardDiscarted.type == 'salto')) {
                        console.log('En efecto........');
                        let optionP2 = player2[i];
                        actualOptions.push(optionP2);
                    }
                    //3da
                    if ((player2[i].color == lastCardDiscarted.color) && (cardsSomePlayer[i].type == 'tomados' && lastCardDiscarted.type == 'reversa')
                        || (player2[i].color == lastCardDiscarted.color) && (player2[i].type == 'tomados' && lastCardDiscarted.type == 'salto')
                        || (player2[i].color == lastCardDiscarted.color) && (player2[i].type == 'salto' && lastCardDiscarted.type == 'tomados')
                        || (player2[i].color == lastCardDiscarted.color) && (player2[i].type == 'salto' && lastCardDiscarted.type == 'reversa')
                        || (player2[i].color == lastCardDiscarted.color) && (player2[i].type == 'reversa' && lastCardDiscarted.type == 'salto')) {
                        let optionP2 = player2[i];
                        actualOptions.push(optionP2);
                    }

                }

                if (actualOptions.length > 0) {
                    turn = true;
                    startGame();
                } else {
                    turn = false;
                    startGame();
                }
                console.log(cards.length);
                if (cards.length == 0) { //[1,5,6,7,9,9]
                    let containerMazo = $('.decks').children();
                    containerMazo.remove();
                }

            }
            options = [];
        });

    }
    takeCard();



    //Checa la cantidad de opciones para lanzar
    function options(cardsSomePlayer) {
        let options = new Array();
        let lastCardDiscarted = discards.slice(-1)[0];
        console.log(lastCardDiscarted );

        for (let i = 0; i < cardsSomePlayer.length; i++) {

            //1ra condicion
            if ((cardsSomePlayer[i].color == lastCardDiscarted.color) ||
                (cardsSomePlayer[i].number == lastCardDiscarted.number && (cardsSomePlayer[i].color != 'multiple'))) {
                if ((cardsSomePlayer[i].number == null) && (lastCardDiscarted.number == null)) {
                    //NO hacer nada
                } else {
                    //--------------------
                    let option = cardsSomePlayer[i];
                    options.push(option);
                }

            }

            //2da Condicion
            if ((cardsSomePlayer[i].type == 'reversa') && (lastCardDiscarted.type == 'reversa') ||
                (cardsSomePlayer[i].type == 'salto') && (lastCardDiscarted.type == 'salto')) {
                console.log('En efecto........');
                let option = cardsSomePlayer[i];
                options.push(option);
            }
            //3ra
            if ((cardsSomePlayer[i].color == lastCardDiscarted.color) && (cardsSomePlayer[i].type == 'tomados' && lastCardDiscarted.type == 'reversa')
                || (cardsSomePlayer[i].color == lastCardDiscarted.color) && (cardsSomePlayer[i].type == 'tomados' && lastCardDiscarted.type == 'salto')
                || (cardsSomePlayer[i].color == lastCardDiscarted.color) && (cardsSomePlayer[i].type == 'salto' && lastCardDiscarted.type == 'tomados')
                || (cardsSomePlayer[i].color == lastCardDiscarted.color) && (cardsSomePlayer[i].type == 'salto' && lastCardDiscarted.type == 'reversa')
                || (cardsSomePlayer[i].color == lastCardDiscarted.color) && (cardsSomePlayer[i].type == 'reversa' && lastCardDiscarted.type == 'salto')) {
                let option = cardsSomePlayer[i];
                options.push(option);
            }

            //MISMO COLOR REVERSA TOMADOS
            //MISMO COLOR REVERSA salto if player2.color == color.descartes && jugadordos.reversa && descartes.salto 
            //do  Algo...  

        }


        return options;
    }


    //Penalizacione para carta tomados
    function penalizationTwoCards(cardChoese) {
        if (turn) { //Si Jugador 2

            let container = $('.content-ia');
            if ((cardChoese.type == 'tomados') && (cardChoese.value == 2)) {
                setTimeout(function () {
                    for (let i = 0; i < 2; i++) {
                        let card = cards.pop();
                        player1.push(card);
                        //let img = $("<img></img>").attr('src', 'img/' + '/default.jpg');// else cards[i].name -- player1[i].name
                        let img = $("<img></img>").attr('src', 'img/' + card.name);
                        img.attr('class', 'card ' + card.id);
                        img.attr('alt', card.id);
                        container.append(img);
                        turn = true;
                        startGame();
                    }
                }, 1000);

            }

            if ((cardChoese.type == 'tomacuatro') && (cardChoese.value == 4)) {
                setTimeout(function () {
                    for (let i = 0; i < 4; i++) {
                        let card = cards.pop();
                        player1.push(card);
                        //let img = $("<img></img>").attr('src', 'img/' + '/default.jpg');// else cards[i].name -- player1[i].name
                        let img = $("<img></img>").attr('src', 'img/' + card.name);
                        img.attr('class', 'card ' + card.id);
                        img.attr('alt', card.id);
                        container.append(img);
                        turn = false;
                        startGame();
                    }
                }, 1000);

            }


        } else { //Si Jugador 1

            let container_human = $('.content-human');
            if ((cardChoese.type == 'tomados') && (cardChoese.value == 2)) {
                setTimeout(function () {

                    for (let i = 0; i < 2; i++) {
                        let card = cards.pop();
                        player2.push(card);
                        let img = $("<img></img>").attr('src', 'img/' + card.name); // else cards[i].name
                        img.attr('class', 'card humancard ' + card.id);
                        img.attr('alt', card.id);
                        container_human.append(img);
                        turn = false;
                        startGame();
                    }

                }, 1000);
            }

            if ((cardChoese.type == 'tomacuatro') && (cardChoese.value == 4)) {
                setTimeout(function () {

                    for (let i = 0; i < 4; i++) {
                        let card = cards.pop();
                        player2.push(card);
                        let img = $("<img></img>").attr('src', 'img/' + card.name); // else cards[i].name
                        img.attr('class', 'card humancard ' + card.id);
                        img.attr('alt', card.id);
                        container_human.append(img);
                        turn = true;
                        startGame();
                    }

                }, 1000);
            }

        }

    }


    //opciones especiales de algun jugador
    function comodinOptions(somePlayer) {
        let comodionOpc = new Array();
        for (let i = 0; i < somePlayer.length; i++) {
            if (somePlayer[i].color == 'multiple') {
                let card = somePlayer[i];
                comodionOpc.push(card);
            }
        }
        return comodionOpc;
    }


    function one() {
        let container = $('.content-human');
        let warn = false;
        setTimeout(function () {
            if (player2.length == 1) {
                warn = uno;
                console.log("Jugador 2 dijo : " + warn);
            } else {
                for (let i = 0; i < 2; i++) {
                    let card = cards.pop();
                    player2.push(card);
                    let img = $("<img></img>").attr('src', 'img/' + card.name); // else cards[i].name
                    img.attr('class', 'card humancard ' + card.id);
                    img.attr('alt', card.id);
                    container.append(img);
                    turn = true;
                    startGame();
                }

            }
        }, 3000);

        uno = false;
    }
    $(document).on('click', '#one', function (e) {
        uno = true;
    });

    $(document).on('click', '#redButton', function (e) {
        color = 'Rojo';
    });
    $(document).on('click', '#greenButton', function (e) {
        color = 'Verde';
    });

    $(document).on('click', '#blueButton', function (e) {
        color = 'Azul';

    });
    $(document).on('click', '#yelollowButton', function (e) {
        color = 'Amarillo';
    });
});