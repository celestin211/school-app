$(function () {
    let action = $('#message_update_favoris').data('action');
    //Activer la fonctionnalité sélectionner ou dé-sélectionner tout
    $(".checkbox-toggle").click(function () {
        var clicks = $(this).data('clicks');
        if (clicks) {
            //Uncheck all checkboxes
            $(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
            $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
        } else {
            //Check all checkboxes
            $(".mailbox-messages input[type='checkbox']").iCheck("check");
            $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
        }
        $(this).data("clicks", !clicks);
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


        //L'id du message à enlever des favoris
        let id = "#".concat(idMessage);
        //Retirer le message de l'affichage
        $(id).remove();

        //Faire une requête ajax, pour ajouter ou retirer un message des favoris
        $.ajax({
            url: action,
            data: {"idMessage": idMessage},
            method: "POST",
        });


    });

});