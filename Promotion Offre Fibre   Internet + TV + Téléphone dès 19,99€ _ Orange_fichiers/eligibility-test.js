;(function () {
    function sendDmpWithJson(data) {
        if (typeof utag !== "undefined"
            && data) {
            utag.link({
                // Variable obligatoire pour « ranger » dans le TMS
                "ns_site": "orange-france", //[value] = orange-france en prod et orange-france-test en recette

                // type de la page sur laquelle est situé le lien ou visuel:
                "track_page": (data.TagPage || "").deleteAccent(),

                // zone dans laquelle se trouve le lien ou visuel:
                "track_zone": (data.TagZone || "").deleteAccent(),

                // nom du lien ou visuel:
                "track_nom": (data.TagName || "").deleteAccent(),

                // variable valorisée lorsque le lien cliqué ne porte pas le libellé de l'offre :
                "track_cible": (data.TagCible || "").deleteAccent(),

                // la plupart du temps valorisé à "clic"
                "track_type_evt": "clic"
            });
        }
    }

    function initAutocompletion() {
        $("#TBX_SaisieAdresseAutocompletion").autocomplete({
            appendTo: '#adresse',
            autoFocus: true,
            minLength: (document.getElementById('HF_MinLength') !== null) ? parseInt(document.getElementById('HF_MinLength').value) : 2,
            delay: (document.getElementById('HF_Delay') !== null) ? parseInt(document.getElementById('HF_Delay').value) : 500,
            select: function (evt, ui) {
                document.getElementById('HF_Adresse').value = ui.item.id;

                sendDmpWithJson({
                    TagPage: "Test Adresse ORAS",
                    TagZone: "Test adresse oras",
                    TagName: "Liste proposition adresse",
                    TagCible: "proposition " + ui.item.ordre
                });
            },
            source: function (request, response) {
                var startTime = new Date().getTime()
                  , elapsedTime = 0
                  , xhr;

                if (document.getElementById('HF_WSenCours').value == "1") {
                    document.getElementById('HF_WSenCours').value = "0";

                    if (xhr) {
                        xhr.abort();
                    }
                }
                // Chargement liste des adresses pour la saisie en cours
                if (document.getElementById('HF_WSenCours').value == "0") {
                    document.getElementById('HF_WSenCours').value = "1";

                    xhr = $.ajax({
                        contentType: "application/json",
                        dataType: 'json',
                        type: "POST",
                        url: "/ajax/Transverse/GetListeAdresses.ashx",
                        success: function (res) {
                            // Redirect to personal_profile.aspx passing it the ID we got back from the web method call
                            if (typeof res === 'string'
                                && res.indexOf("AutoCompletionDesactive") >= 1) {
                                window.location = res;
                            }
                        },
                        data: JSON.stringify({ "Adresse": document.getElementById('TBX_SaisieAdresseAutocompletion').value })
                    })
                    .done(function (data) {
                        var suggestions = [];

                        $('[id$="DIV_NoAddresses"]').addClass('hide');

                        $('#LBL_InfoAdresseAutocompletion')
                            .text('')
                            .addClass('hide');

                        document.getElementById('HF_WSenCours').value = "0";
                        elapsedTime = new Date().getTime() - startTime;
                        if (document.getElementById('TempsExecution') != null) {
                            document.getElementById('TempsExecution').innerHTML = elapsedTime.toString();
                            if (data.adresses.length > 0) {
                                document.getElementById('NombreResultatPossible').innerHTML = data.adresses.length;
                            } else {
                                document.getElementById('NombreResultatPossible').innerHTML = 0;
                            }
                            document.getElementById('lblErreur').innerHTML = data.erreur.toString();
                        }

                        $.each(data.adresses, function (i, address) {
                            if (address.value && address.id) {
                                suggestions.push(address);
                            }
                        });

                        if (data.erreur.id == 1) {
                            $('[id$="DIV_NoAddresses"]').removeClass('hide');
                            $('body').trigger('errorMsgAutoCompletion', [data.erreur]);
                        }

                        response(suggestions);
                    })
                    .fail(function (jqXHR, textStatus) {
                        elapsedTime = new Date().getTime() - startTime;

                        if (document.getElementById('TempsExecution') != null) {
                            document.getElementById('TempsExecution').innerHTML = elapsedTime.toString();
                        }
                    });

                    return xhr;
                }
            },
            change: function (evt, ui) {
                if (!ui.item) {
                    document.getElementById('HF_Adresse').value = '';

                    if (document.getElementById('TBX_SaisieAdresseAutocompletion').value.length > 2) {
                        $('#LBL_InfoAdresseAutocompletion')
                            .text('Veuillez s\351lectionner un \351l\351ment de la liste.')
                            .removeClass('hide');
                    }
                    else {
                        $('#LBL_InfoAdresseAutocompletion')
                            .addClass('hide');
                    }
                }
            }
        });
    }
    
    $(function () {
        var deferred = $.Deferred()
          , interval
          , form_validator = new FormValidator()
            .parse($('[data-val-group]'));

        initAutocompletion();
        $('body')
            .on('showSpinner', function () {
                $('.tab:visible .loading').addClass('js-show')
                    .prevAll().hide();
            })
            .on('hideSpinner', function () {
                $('.tab:visible .loading.js-show').removeClass('js-show')
                    .prevAll().show();
            })
            .on('prmPageLoaded', function () {
                initAutocompletion();
            })
            // Rechargement Update Panel
            .on('prmEndRequest', function () {
                initAutocompletion();
                form_validator.parse($('[data-val-group]'));
            })
            // Rechargement Eto Update Panel
            .on('eupRequestEnd', function () {
                initAutocompletion();
                form_validator.parse($('[data-val-group]'));
            })
            .on('keypress keydown keyup', '.tab .global-input', function (evt) {
                if (evt.keyCode === globalConfig.keyCodes.ENTER) {
                    evt.preventDefault();
                }
            })
            .on('keypress keydown keyup', '.tab .global-input', function (evt) {
                var events_listener = form_validator.getOption('events')
                  , $link = $(this).parents('.tab').find('.BtnOrange01 a')
                  , href
                  , is_simple_postback;

                if (evt.keyCode === globalConfig.keyCodes.ENTER) {
                    if (events_listener['submit']
                        && form_validator.valid()) {
                        $('body').trigger('showSpinner');

                        if ($link.attr('data-postback')) {
                            $link.attr('href', $link.attr('data-postback'));
                        }

                        href = $link.attr('href').replace('javascript:', '');
                        $link
                            .attr('data-postback', $link.attr('href'))
                            .removeAttr('href');
                        is_simple_postback = !/PostBackOptions/g.test(href);

                        executePostBack(href, is_simple_postback);
                    }
                }
            })
            .on('click', '.tab .BtnOrange01 a', function (evt) {
                var events_listener = form_validator.getOption('events')
                  , href
                  , is_simple_postback;

                evt.preventDefault();

                if (events_listener['submit']
                    && form_validator.valid()) {
                    $('body').trigger('showSpinner');

                    if ($(this).attr('data-postback')) {
                        $(this).attr('href', $(this).attr('data-postback'));
                    }

                    href = $(this).attr('href').replace('javascript:', '');
                    $(this)
                        .attr('data-postback', $(this).attr('href'))
                        .removeAttr('href');
                    is_simple_postback = !/PostBackOptions/g.test(href);

                    executePostBack(href, is_simple_postback);
                }
            })
            .on('click touchend', '.tab-container li', function (evt) {
                $(this)
                    .parent()
                        .find('.current').removeClass('current').end()
                    .end()
                    .addClass('current');
            })
            .on('click', 'li.line', function () {
                $(".input-line-test input").trigger("click");
            })
            .on('click', 'li.address', function () {
                $(".input-address-test input").trigger("click");
            });

        if ($('.eligibility-test-body .content input:radio:checked').length) {
            $('label[for="{0}"]'.format($('.eligibility-test-body .content input:radio:checked').attr('id'))).parent().addClass('current');
        }

        if ($('.eligibility-test-body .content .aspNetDisabled > input:radio').length) {
            $('label[for="{0}"]'.format($('.eligibility-test-body .content .aspNetDisabled input').val())).parents('li').remove();
        }

        deferred.then(function () {
            $("#TBX_SaisieAdresseAutocompletion").autocomplete("search");
        });

        if ($('[id$="HF_AppelAuto"]').length
            && ($('[id$="HF_AppelAuto"]').val() * 1) === 1) {
            interval = setInterval(function () {
                if ($("#TBX_SaisieAdresseAutocompletion").hasClass('ui-autocomplete-input')) {
                    deferred.resolve();
                    clearInterval(interval);
                }
            }, 20);
        }
    });
})(jQuery);