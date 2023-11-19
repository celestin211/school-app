$(function () {
        let pieces = $('#pieces-jointes-id').data('pieces');
        let action = $('#message-update-favoris').data('action');
        pieces.map(function (id,) {

            $(id).click(function () {
                window.location = $(this).find("a").eq(0).attr("href");
                return false;
            });

            $(id).hover(function () {
                $(this).css({'cursor': 'pointer'});
            });

        });

        //Cliquer sur l'étoile pour ajouter un message aux favoris
        $(".mailbox-star").click(function (e) {
            e.preventDefault();
            //detect type
            var $this = $(this).find("a > i");
            var glyph = $this.hasClass("glyphicon");
            var fa = $this.hasClass("fa");

            var idMessage = $this.attr('id');

            //Switch states
            if (glyph) {
                $this.toggleClass("glyphicon-star");
                $this.toggleClass("glyphicon-star-empty");
            }

            if (fa) {
                $this.toggleClass("fa-star");
                $this.toggleClass("fa-star-o");
            }

            //Faire une requête ajax, pour ajouter ou retirer un message des favoris
            $.ajax({
                url: action,
                data: {"idMessage": idMessage},
                method: "POST",
            });

        });
    });
