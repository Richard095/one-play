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
        yellowCards.push({ name: 'reversa.jpg', color: 'Amarillo', type: 'reversa', value: 0, number: 0, id: 'reversa' },
            { name: 'robados.jpg', color: 'Amarillo', type: 'tomados', value: 2, number: 0, id: 'robados' },
            { name: 'salto.jpg', color: 'Amarillo', type: 'salto', value: 0, number: 0, id: 'salto' });

    }
    function blue() {

        for (let i = 0; i < 10; i++) {
            blueCards.push({ name: 'azul' + i + '.jpg', color: 'Azul', type: 'normal', value: 0, number: i, id: 'azul' + i });
        }
        blueCards.push({ name: 'azul' + 'reversa' + '.jpg', color: 'Azul', type: 'reversa', value: 0, number: 0, id: 'azulreversa' },
            { name: 'azul' + 'robados' + '.jpg', color: 'Azul', type: 'tomados', value: 2, number: 0, id: 'azulrobados' },
            { name: 'azul' + 'salta' + '.jpg', color: 'Azul', type: 'salto', value: 0, number: 0, id: 'azulsalta' });


    }

    function red() {

        for (let i = 0; i < 10; i++) {
            redCards.push({ name: 'rojo' + i + '.jpg', color: 'Rojo', type: 'normal', value: 0, number: i, id: 'rojo' + i });
        }
        redCards.push({ name: 'rojo' + 'reversa' + '.jpg', color: 'Rojo', type: 'reversa', value: 0, number: 0, id: 'rojoreversa' },
            { name: 'rojo' + 'robados' + '.jpg', color: 'Rojo', type: 'tomados', value: 2, number: 0, id: 'rojorobados' },
            { name: 'rojo' + 'salta' + '.jpg', color: 'Rojo', type: 'salto', value: 0, number: 0, id: 'rojosalta' });


    }


    function green() {

        for (let i = 0; i < 10; i++) {
            greenCards.push({ name: 'verde' + i + '.jpg', color: 'Verde', type: 'normal', value: 0, number: i, id: 'verde' + i });
        }
        greenCards.push({ name: 'verde' + 'reversa' + '.jpg', color: 'Verde', type: 'reversa', value: 0, number: 0, id: 'verdereversa' },
            { name: 'verde' + 'robados' + '.jpg', color: 'Verde', type: 'tomados', value: 2, number: 0, id: 'verderobados' },
            { name: 'verde' + 'salto' + '.jpg', color: 'Verde', type: 'salto', value: 0, number: 0, id: 'verdesalto' });


    }

    function comodin() {
        for (let i = 0; i < 4; i++) {
            comodines.push({ name: 'comodin' + (i + 1) + '.jpg', color: 'multiple', type: 'normal', value: 0, number: 0, id: 'comodin' + (i + 1) });
        }
        for (let i = 0; i < 4; i++) {
            comodines.push({ name: 'comodin_' + (i + 1) + '.jpg', color: 'multiple', type: 'tomacuatro', value: 4, number: 0, id: 'comodin_' + (i + 1) });
        }

    }

    function joinCards() {
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
    let turnColor = 'text-primary';
    let turn = false;




    joinCards();
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
            let img = $("<img></img>").attr('src', 'img/' + '/default.jpg'); // else cards[i].name -- player1[i].name
            img.attr('class', 'card');
            img.attr('alt', player1[i].name);
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
            load_first_card();
        } else {
            let img = $("<img></img>").attr('src', 'img/' + card.name); // else cards[i].name
            img.attr('class', 'card humancard ' + card.id);
            img.attr('alt', card.id);
            contentCardInPlay.append(img);
            discards.push(card);

            // console.log("Cartas de descartes : "+discards[0].name);
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
    }
    load_IA();
    load_human();
    load_first_card();





    function startGame() {
        let container = $(".content-human");
        let takeCard = $(".take");

        switch (turn) {
            case false:
                showTurn();
                turn = true;
                setTimeout(function () {
                    startGame();
                }, 2000);
                break;
            case true:
                showTurn();
                takeCard.click(function () {
                    let card = cards.pop();
                    
                    player2.push(card);

                    let img = $("<img></img>").attr('src', 'img/' + card.name); // else cards[i].name
                    img.attr('class', 'card humancard ' + card.id);
                    img.attr('alt', card.id);
                    container.append(img);

                    console.log(cards);
                });

                $(document).on('click', '.humancard', function (e) {
                    var imagename = $(this).attr("alt");
                    for (let i = 0; i < player2.length; i++) {
                        if (imagename == player2[i].id) {
                            let chosen = player2[i];
                            $('.' + imagename).remove();
                            removeElement(player2, player2[i]);
                            discards.push(chosen);
                            console.log(player2);
                            showCardInPlay(discards);
                            turn = false;
                           
                        }
                    }
                    startGame();
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
        console.log(card);
        //Creo elemento
        let img = $("<img></img>").attr('src', 'img/' + card.name); // else cards[i].name
        img.attr('class', 'card humancard ' + card.id);
        img.attr('alt', card.id);
        contentCardInPlay.append(img);

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
        if (card.color == 'multiple') {
            console.log("multiple: Elije un color ");
            chooseColor();
        }

    }



    function showTurn() {
        if (!turn) {
            dissableClickHuman();
            $('.turnoPlayer').text('Jugador 1');

        } else {
            $('.turnoPlayer').text('Jugador 2');
            activeClickHuman();
        }
    }


    function chooseColor() {
        let modal = $('.modal');
        modal.modal('toggle');

    }

    function dissableClickHuman() {
        //$(".humancard").click(function(){ return false});

        let container = $('.content-human').children();
        container.removeClass('humancard');


    }
    function activeClickHuman() {
        let container = $('.content-human').children();
        container.addClass('humancard');
        //$(".humancard").click(function(){ return true});
    }



});