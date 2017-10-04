

/*BEGIN:https://boutique.orange.fr/medias/newshop/internet/js/eligibility.js*/
; (function () {
    var $elm = $('[id$="OngletsTypeEligibilite"]');
    if ($elm.length) {
        $elm.find('input[value="RB_Eligibility_address_test"], input[value="RB_Eligibility_line_test"]').hide();
        function handleEchatVisibility() {
            //si le e-chat de la master est pr�sent, on affiche le lien vers chat
            if ($('.LPMcontainer').length > 0) {
                $('.BoutonEchat').show();
            }
            else {
                $('.BoutonEchat').hide();
            }
        }
        function handleErrorMsg() {
            var itm = $('.msg-error').first()
                    , cln = itm.clone(true);
            itm.remove();
            $('.content-error')
                .append(cln)
                .removeClass('hide');
        }
        function checkErrorPresence() {
            // Test adresse : placer message d'erreur en dehors du test
            if ($('.home.actif').length && $('.msg-error').length && $('.msg-error').hasClass('show')) {
                handleErrorMsg();
            }

            // Test telephone : placer message d'erreur en dehors du test
            if ($('.phone.actif').length && $('.msg-error').length) {
                handleErrorMsg();
            }

            // Test telephone : placer message d'erreur en dehors du test
            if ($('.error.bloc-tel .input-validation-error').length) {
                var itm = $('.error.bloc-tel .input-validation-error + .field-validation-error').first()
                , cln = itm.clone(true);
                $('.content-error')
                    .append(cln)
                    .removeClass('hide')
                    .addClass('blk-error OrangesansBold font-size14 line-height18');
                $('.eligibility .right').removeClass('wait');
            }
        }

        handleEchatVisibility();

        $('body')
            .on('load', function () {
                handleEchatVisibility();
            })
            .on('prmEndRequest', function () {
                checkErrorPresence();
                handleEchatVisibility();
            })
            .on('eupRequestEnd', function () {

                $('[id$="OngletsTypeEligibilite"]').find('input[value="RB_Eligibility_address_test"], input[value="RB_Eligibility_line_test"]').hide();
                checkErrorPresence();
                handleEchatVisibility();
            })
            .on('click', '.test-eligibility .choice-test > div > div', function () {
                if (!$(this).parent().hasClass('actif')) {
                    var blocAfficher = $(this).parent().attr('class');
                    $elm = $('[id$="OngletsTypeEligibilite"]');
                    if (blocAfficher == "home") {
                        $elm.find('input[value="RB_Eligibility_address_test"]').trigger('click');
                    } else if (blocAfficher == "phone") {
                        $elm.find('input[value="RB_Eligibility_line_test"]').trigger('click');
                    }
                }
            })
            .on('click', '.BoutonEchat', function (evt) {
                $('.echatWrapper > .LPMcontainer').click();
                evt.preventDefault();
            })
            .on('click', '.eligibility .button-common-1', function () {
                $('.eligibility .content-test').addClass('wait');
            })
            .on('errorMsgAutoCompletion', function (event, args) {
                if (args) {
                    var errorMessage = args.value;
                    $('[id$="DIV_NoAddresses"]').html(errorMessage);
                    handleErrorMsg();
                }
            })
            .on('click', 'button.ui-dialog-titlebar-close', function () {
                $('.eligibility .content-test').removeClass('wait');
            });
    }

})();

/*END:https://boutique.orange.fr/medias/newshop/internet/js/eligibility.js*/


/*BEGIN:https://boutique.orange.fr/medias/newshop/js/popin/test-eligibilite/GenericPopupCremaillere.js*/

;(function ($) {
    String.prototype.pregReplace = function (array_pattern, array_pattern_replace) {
        var new_string = this.toString();

        for (var i = 0; i < array_pattern.length; i++) {
            var reg_exp = RegExp(array_pattern[i], "gi");
            var val_to_replace = array_pattern_replace[i];
            new_string = new_string.replace(reg_exp, val_to_replace);
        }

        return new_string;
    };

    String.prototype.deleteAccent = function () {
        var string = this.toString(),
            pattern_accent = new Array("'", "é", "è", "ê", "ë", "ç", "à", "â", "ä", "î", "ï", "ù", "ô", "ó", "ö"),
            pattern_replace_accent = new Array(" ", "e", "e", "e", "e", "c", "a", "a", "a", "i", "i", "u", "o", "o", "o");

        var new_string = string.pregReplace(pattern_accent, pattern_replace_accent);

        return new_string;
    };

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

    function GetUrlPage() {
        var CheminComplet = document.location.href;

        CheminComplet = CheminComplet.substring(CheminComplet.lastIndexOf("/") + 1);

        while (CheminComplet.indexOf("?") > 0) {
            CheminComplet = CheminComplet.substring(0, CheminComplet.lastIndexOf("?"));
        }

        return CheminComplet;
    }

    function WizardForm(options) {
        this.ajax_config = {
            contentType: "application/json",
            dataType: 'json',
            type: "POST"
        };
        this.popin = options;

        this.associated_json = {};

        if (Modernizr.mq('only screen and (min-device-width : 320px) and (max-device-width : 480px)')) {
            this.is_mobile_device = true;
        } else {
            this.is_mobile_device = false;
        }
    }

    $.extend(WizardForm.prototype, {
        /*
         * Création popin / Redirection
         *
         * promise {Object}
         */
        create: function (promise) {
            var scope = this;

            promise.then(function (data) {
                var $form;

                if (data === null) {
                    return;
                }

                if (data.Formulaire) {
                    scope.associated_json = data;

                    // Cas d'un affichage de formulaire
                    $form = $('#' + data.Formulaire.Alias);

                    $form.find('.content > div').each(function (i, child) {
                        if ($(child).find('input:not(input[type="submit"])').length) {
                            if ($(child).find('input').nextAll('.error').length) {
                                $(child).find('input').nextAll('.error').text('');
                            } else {
                                $(child).find('input').after('<p class="error"></p>');
                            }
                        }
                    });

                    if (scope.is_mobile_device) {
                        $('body')
                            .on('click touchend', 'input[type="submit"]', function (evt) {
                                evt.preventDefault();

                                scope.submit($(this).parents('.content'), data.Formulaire.Alias);
                            });

                        // Affichage du formulaire
                        $form.addClass('js-show');
                        // Envoi utag view
                        if (data.UtagView
                            && typeof utag !== "undefined") {
                            utag.view(data.UtagView);
                        }
                        // Envoi utag click
                        var events = data.Formulaire.Evenements || [];
                        events.forEach(function(event){
                            if (event.Alias === 'open') {
                                sendDmpWithJson(event);
                            }
                        });

                        scope.populateFields($form.find('.content'));
                    } else {
                        $form.dialog({
                            'dialogClass': 'wizard-popin-container',
                            'modal': true,
                            'resizable': false,
                            'title': data.Formulaire.Titre,
                            'width': $('[data-popin-width]').attr('data-popin-width'),

                            'close': function () {
                                // Envoi utag click
                                var events = data.Formulaire.Evenements || [];
                                events.forEach(function(event){
                                    if (event.Alias === 'close') {
                                        sendDmpWithJson(event);
                                    }
                                });

                                $(this).off('.popin');
                            },
                            'open': function () {
                        		var field_id;

                        		var $blocTestEligibilite = $('#PNL_ContenuTestAdresseOras');

                        		if ($blocTestEligibilite && $blocTestEligibilite.length) {
                        		    $blocTestEligibilite.removeClass('wait');
                        		}

                                $(this)
                                    .on('click.popin', 'input[type="submit"]', function (evt) {
                                        evt.preventDefault();

                                        scope.submit($(this).parents('.content'), data.Formulaire.Alias);
                                    });

                                if (scope.associated_json.Formulaire.Champs.length === 2) {
                            		field_id = scope.associated_json.Formulaire.Champs[0].Id;

                                	$(this)
                                		.on('keypress keydown keyup', '#' + field_id, function (evt) {
                            				if (evt.keyCode === globalConfig.keyCodes.ENTER) {
							                    evt.preventDefault();

							                    scope.submit($(this).parents('.content'), data.Formulaire.Alias);
							                }
                                		});
                                }

                                //mise à jour du footer
                                $(this).find('footer > p > span').html(data.Formulaire.Footer);

                                // Envoi utag view
                                if (data.UtagView
                                    && typeof utag !== "undefined") {
                                    utag.view(data.UtagView);
                                }
                                // Envoi utag click
                                var events = data.Formulaire.Evenements || [];
                                events.forEach(function (event) {
                                    if (event.Alias === 'open') {
                                        sendDmpWithJson(event);
                                    }
                                });

                                scope.populateFields($(this).find('.content'));
                            }
                        });
                        // Modifie la position de la popin
                        if ($('[data-attach-to]').length && $($('[data-attach-to]').attr('data-attach-to')).length) {
                            $form.dialog("option", "position", { my: "center top", at: "center top", of: $('[data-attach-to]').attr('data-attach-to') });
                        }
                    }
                }

                // Redirection
                if (data.Params) {
                    var params = []
                      , params_url
                      , url_base = document.location.href.split("?")[0].replace("#", "");

                    for(var key in data.Params) {
                        var param = data.Params[key];
                        params.push(key + '=' +param);
                    }

                    params_url = "?" + params.join('&');
                    document.location.href = url_base + params_url;
                    // Affichage du spinner
                    $('body').trigger('showSpinner');
                }
            });
        },
        /*
         * Appel ajax pour l'étape suivante
         */
        goToNextStep: function () {
            return $.ajax($.extend(this.ajax_config, {
                data: JSON.stringify(this.associated_json.Formulaire),
                url: $('main').attr('data-webmethod-url')
            }));
        },
        /*
         * Appel ajax pour la première popin
         *
         * popin_alias {String}
         */
        init: function (popin_alias) {
            var provenance = 'oras';

            if (/AutoCompletionDesactive/g.test(window.location.search)) {
                provenance = 'adresse degrade';
            }

            return $.ajax($.extend(this.ajax_config, {
                data: JSON.stringify({ "AliasPopin": popin_alias, 'Provenance': provenance }),
                url: "/ajax/Transverse/GetFirstPopin.ashx"
            }));
        },
        /*
         * Ajoute les valeurs pour un formulaire
         *
         * $popin {Object}
         * popin_alias {String}
         */
        populateFields: function ($form, popin_alias) {
            this.associated_json.Formulaire.Champs.some(function (field) {
                var $field = $form.find('#' + field.Id);

                switch (field.Type) {
                    case 'Combobox':
                        var fragment = document.createDocumentFragment();

                        field.Choix.forEach(function (choice) {
                            var option = document.createElement('option');

                            option.setAttribute("value", choice.Value);
                            option.appendChild(document.createTextNode(choice.Text));
                            fragment.appendChild(option);
                        });

                        $field
                            .empty()
                            .append(fragment);
                        break;

                    case 'Textbox':
                        $field.val(field.Value);
                        break;

                    case 'Checkbox':
                        $field.prop('checked', field.Value);
                        break;
                }
            });
        },
        /*
         * Soumission du formulaire de popin
         *
         * $form {Object}
         * popin_alias {String}
         */
        submit: function ($form, popin_alias) {
            var is_valid = true
              , promise;

            this.associated_json.Formulaire.Champs.some(function (field) {
                var $field = $form.find('#' + field.Id);

                switch (field.Type) {
                    case 'Combobox':
                    case 'Textbox':
                        $field.next('.error').text('');

                        if ($.trim($field.val()) === ''
                            && field.Required
                            && is_valid) {
                            is_valid = false;
                            $field.next('.error').text(field.MessageErreur);
                        }

                        field.Value = $field.val();
                        break;

                    case 'Checkbox':
                        field.Value = $field.is(':checked');
                        break;
                }
            });

            if (!is_valid) {
                return;
            }

            promise = this.goToNextStep();
            // Cas d'une popin
            if (!this.is_mobile_device) {
                var $popin = $('#' + popin_alias + ".ui-dialog-content");
                if ($popin.length === 0)
                {
                    $popin = $('#' + popin_alias);
                }
                $popin.dialog('close');
            } else {
                $('#' + popin_alias).removeClass('js-show');
            }
                        
            this.create(promise);
        }
    });

    function triggerForm() {
        var wizard_form = new WizardForm()
          , promise;

        if ($('[id$="HF_PopinAlias"]').length === 0
            || $('[id$="HF_PopinAlias"]').val() === '') {
            return;
        }

        promise = wizard_form.init($('[id$="HF_PopinAlias"]').val());
        wizard_form.create(promise);

        if ($('[data-empty-alias]').length
            && $('[data-empty-alias]').attr('data-empty-alias') === 'true') {
            $('[id$="HF_PopinAlias"]').val('');
        }
        
        // Au cas où un spinner est affiché, on le masque
        $('body').trigger('hideSpinner');
    }

    $(function () {
        $('body')
            .on('prmEndRequest', function (evt, obj) {
                triggerForm();
            })
            .on('eupRequestEnd', function (evt, obj) {
                triggerForm();
            })
            .on('click', '[data-launch-wpopin]', function (evt) {
                evt.preventDefault();

                triggerForm();
            });

        if (Modernizr.mq('only screen and (min-device-width : 320px) and (max-device-width : 736px)')) {
            triggerForm();
        }
    });
})(jQuery);
/*END:https://boutique.orange.fr/medias/newshop/js/popin/test-eligibilite/GenericPopupCremaillere.js*/
