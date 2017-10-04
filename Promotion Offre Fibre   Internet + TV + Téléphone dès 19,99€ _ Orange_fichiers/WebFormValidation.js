; (function ($, window) {

    window.FormValidator = function (config) {
        $.extend(this, {
            '_fields': {},
            '_methods': ['required', 'required-if', 'required-enum', 'regex', 'length', 'range', 'range-date'],
            '_options': {
                'events': {
                    'blur': true,
                    'click': true,
                    'keyup': true,
                    'submit': true
                }
            }
        });
        // Modification de l'objet d'options de base
        $.extend(this._options, config);
        // Création des écouteurs d'événement
        this._attachEvents();

        return this;
    };

    window.FormValidator.prototype = {
        /**
         * Ajoute un champ à valider à la volée
         *
         * @param {Object} element - Correspond à un objet DOM/jQuery
         */
        addField: function (element) {
            var scope = this
              , form_field;

            if (element.getAttribute('data-val-novalidate-hidden-elt') === 'true') {
                return;
            }

            form_field = new FormField($(element)).attachValidators(scope, scope._methods);
            // Attache les validateurs à l'élément
            scope._fields[element.getAttribute('id')] = form_field;
        },

        /**
		 * Ajoute une méthode de validation
		 * 
		 * @param {String} method - Correspond à un attribut data-
		 */
        addMethod: function (method) {
            this._methods.push(method);

            return this;
        },

        /**
		 * Création des écouteurs d'événement pour le formulaire
		 */
        _attachEvents: function () {
            var scope = this;

            $('body').off('.validation');

            $('body')
                .on('blur.validation', '[data-val="true"].dirty', function () {
				    if (scope._options.events['blur']
						&& scope._fields[this.getAttribute('id')]) {
				        scope._fields[this.getAttribute('id')].valid();
				    }
                })
                .on('change.validation', '[data-val="true"]', function () {
                    if (!$(this).hasClass('dirty')) {
                        $(this).addClass('dirty');
                        if (scope._options.events['change']
                            && scope._fields[this.getAttribute('id')]) {
                            scope._fields[this.getAttribute('id')].valid();
                        }
                    }
                })
				.on('keyup.validation', '[data-val="true"].dirty', function (evt) {
				    if (scope._options.events['keyup']
						&& evt.keyCode !== globalConfig.keyCodes.TAB
						&& scope._fields[this.getAttribute('id')]) {
				        scope._fields[this.getAttribute('id')].valid();
				    }
				})
                .on('click', 'input:checkbox[data-val="true"]', function () {
                    if (scope._options.events['click']
						&& scope._fields[this.getAttribute('id')]) {
                        scope._fields[this.getAttribute('id')].valid();
                    }
                })
				.on('submit.validation', 'form', function (evt) {
				    if (scope._options.events['submit']
                        && !scope.valid()) {
				        evt.preventDefault();
				    }
				});
        },

        /**
		 * Active la gestion d'un événement client
		 * 
		 * @param  {String} event_type - Type d'événement
		 * @param  {Boolean} value     - Activation/désactivation
		 * @return {Object}
		 */
        changeEventStatus: function (event_type, value) {
            this._options.events[event_type] = value;

            return this;
        },

        /**
		 * Supprime une méthode de validation
		 * 
		 * @param  {String} name - Nom de la méthode à supprimer
		 */
        deleteMethod: function (name) {
            if ($.inArray(name, this._methods)) {
                this._methods = this._methods.filter(function (method) {
                    return method !== name;
                });
            }
        },

        /**
		 * Retourne un champ de formulaire donné
		 * 
		 * @return {Object}
		 */
        getField: function (id) {
            return (this._fields[id]) ? this._fields[id] : false;
        },

        /**
		 * Retourne une option
		 * 
		 * @return {Object}
		 */
        getOption: function (option_name) {
            return this._options[option_name] ? this._options[option_name] : null;
        },

        /**
		 * Retourne l'ensemble des options de l'objet
		 * 
		 * @return {Object}
		 */
        getOptions: function () {
            return this._options;
        },

        /**
		 * Format de la classe de validation à appeler
		 * 
		 * @param  {String} method - nom de la méthode
		 * @return {String}        - nom de la classe de validation
		 */
        formatMethodName: function (method) {
            var arr_name = method.split(/-/g)
			  , name = '';

            for (var i = 0; i < arr_name.length; i++) {
                name += arr_name[i].charAt(0).toUpperCase() + arr_name[i].substring(1);
            }

            return name + 'Validator';
        },

        /**
		 * Parcours du formulaire pour attacher les validateurs aux éléments ciblés
		 * 
		 * @param  {Object} $form - Objet de formulaire
		 * @return {Object}
		 */
        parse: function ($form) {
            var scope = this;

            scope._fields = {};

            $form.find('[data-val="true"]:not([data-val-novalidate-hidden-elt="true"])').each(function (i, element) {
                var form_field = new FormField($(element)).attachValidators(scope, scope._methods);
                // Attache les validateurs à l'élément
                scope._fields[element.getAttribute('id')] = form_field;
            });

            return this;
        },

        /**
		* Validation du formulaire
		* 
		* @return {Boolean}
		*/
        valid: function () {
            var is_valid = true;

            //eslint-disable-next-line no-for-in
            for(var f in this._fields){
                var field = this._fields[f];
                if (is_valid) {
                    is_valid = field.valid();
                } else {
                    field.valid();
                }
            }

            return is_valid;
        }
    };

    function FormField($element, is_required) {
        this._$element = $element;
        this._validators = [];
        this._isRequired = is_required;

        return this;
    };

    FormField.prototype = {
        attachValidators: function (parent_scope, methods) {
            var scope = this
              , validators = []
              , is_required = false;

            // Attachement de méthodes de validation au champ, selon les attributs "data-*" spécifiés
            methods.forEach(function (method) {
                var params = {}
                  , class_name = parent_scope.formatMethodName(method);

                if (scope._$element.attr('data-val-{0}'.format(method))) {
                    // Parcours des attributs
                    $.each(scope._$element[0].attributes, function (j, attribute) {
                        if (new RegExp(method + '-').test(attribute.name)) {
                            params[attribute.name.replace(new RegExp('data-val-' + method + '-'), '')] = attribute.value;
                        }
                    });

                    if (window[class_name] !== undefined) {
                        validators.push(new window[class_name](
                            params,
                            scope._$element.attr('data-val-{0}'.format(method))
                        ));
                    }

                    if (method === 'required') {
                        is_required = true;
                    }

                    if (method === 'required-if'
                        && !$('[id$="{0}"]'.format(params.field)).length) {
                        is_required = true;
                    }
                }
            });
            // Ajoute le validateur par défaut
            if (!validators.length) {
                validators.push(new Validator());
            }

            scope._validators = validators;
            scope._isRequired = is_required;

            return this;
        },

        /**
		 * Valide le champ concerné
		 * 
		 * @return {Boolean} Etat de la saisie après validation
		 */
        valid: function () {
            var scope = this
			  , is_valid = true;

            // Dans le cas où un champ n'est pas requis et qu'il est vide, ne pas lancer les autres validateurs
            if (!this._isRequired
                    && $(this._$element).is('input')
                    && this._$element.val() === '') {
                new Validator().valid(scope._$element);
                return is_valid;
            }
            // Lancement des validateurs pour un champ donné
            scope._validators.every(function (validator) {
                return is_valid = validator.valid(scope._$element);
            });

            return is_valid;
        }
    };

    window.Validator = function() {
        $.extend(this, {
            '_selectors': {
                'message': '[data-valmsg-for="{0}"]',
                'tick': '[data-val-for="{0}"]'
            },
            _type: null
        });

        return this;
    };

    window.Validator.prototype = {
        /**
		 * Mise en forme du champ en cas d'erreur
		 * 
		 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
		 * @param  {String} message - Message d'erreur
		 */
        onError: function ($field, message) {
            $('body').trigger('validator-error', [$field, message, this._type]);
            
            // Encadré rouge
            if ($field.is("select")) {
                $field.parent().addClass('input-validation-error');
            }
            else {
                $field.addClass('input-validation-error');
            }
            // Ajout coche invalide pour le champ
            $(this._selectors.tick.format($field.attr('name')))
				.removeClass('hidden valid')
				.addClass('input-validation-error');
            // Ajout message d'erreur
            $(this._selectors.message.format($field.attr('name')))
				.removeClass('field-validation-valid')
				.addClass('field-validation-error')
				.html(message);
        },

        /**
		 * Mise en forme du champ en cas de validité
		 * 
		 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
		 */
        onValid: function ($field) {
            // Suppression encadré rouge
            if ($field.is("select")) {
                $field.parent().removeClass('input-validation-error');
            } else {
                $field.removeClass('input-validation-error');
            }
            // Ajout coche valide pour le champ
            $(this._selectors.tick.format($field.attr('name')))
				.removeClass('hidden input-validation-error')
				.addClass('valid');
            // Suppression des messages d'erreur
            $(this._selectors.message.format($field.attr('name')))
				.removeClass('field-validation-error')
				.addClass('field-validation-valid')
				.text('');
        },

        /**
	     * Validation passive (rien à valider, juste 
	     */
        valid: function ($field) {
            this.onValid($field);

            return true;
        }
    };

    window.RequiredValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "required";
    };

    window.RequiredValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation du champ requis
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.RequiredValidator.prototype.valid = function ($field) {
        var is_valid = true;

        if ($field.is('input[type="checkbox"]')
            && $field[0].checked) {
            this.onValid($field);
        } else if (!$field.is('input[type="checkbox"]')
            && $field.val() !== ''
			&& $field.val() !== null) {
            this.onValid($field);
        } else {
            this.onError($field, this.message);
            is_valid = false;
        }

        return is_valid;
    };

    window.RequiredIfValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "requiredIf";
    };

    window.RequiredIfValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation du champ requis
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.RequiredIfValidator.prototype.valid = function ($field) {
        var is_valid = true
          , $other_field = $('[id$="{0}"]'.format(this.params.field));

        // Si un seul des deux existe et qu'il est rempli, champ valide
        if (!$other_field.length
            && $field.val() !== '') {
            this.onValid($field);
        }
            // Si le champ existe
        else if ($other_field.length) {
            this.onValid($field);
        }
            // Sinon, champ invalide
        else {
            this.onError($field, this.message);
            is_valid = false;
        }

        return is_valid;
    };

    window.RequiredEnumValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "requiredEnum";
    };

    window.RequiredEnumValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation d'une liste de boutons radio
	 * 
	 * @param  {Object} $list   - Objet jQuery correspondant à la liste de boutons radio
	 * @return {Boolean}        - Etat de la validation
	 */
    window.RequiredEnumValidator.prototype.valid = function ($list) {
        var is_valid = true;

        if ($list.find('input:checked').length) {
            this.onValid($list.find('input:eq(0)'));
        } else {
            this.onError($list.find('input:eq(0)'), this.message);
            is_valid = false;
        }

        return is_valid;
    };

    window.RequiredIbanValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "requiredIban";
    };

    window.RequiredIbanValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation du champ requis
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.RequiredIbanValidator.prototype.valid = function ($field) {
        var is_valid = true
            // Suppression des espaces dans la chaine de caractères
          , value_without_space = ($field.val() || '').replace(/[\s]+/g, '')
          , match = /[A-Za-z]{2}\d{2}\d{5}\d{5}[A-Za-z0-9]{11}\d{2}/g.exec(value_without_space);

        // Test expression régulière
        if (match
            && (match.index === 0)
            && (match[0].length === value_without_space.length)) {
            this.onValid($field);
        } else {
            this.onError($field, this.message);
            is_valid = false;
        }

        return is_valid;
    };

    window.RequiredDateValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "requiredDate";
    };

    window.RequiredDateValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation d'un groupe de champs
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant à un ensemble de champs
	 * @return {Boolean}        - Etat de la validation
	 */
    window.RequiredDateValidator.prototype.valid = function ($field) {
        var is_valid = true
          , empty_fields = 0
          , $empty_field = undefined;

        $field.find('select[data-val].dirty').each(function (i, select) {
            if ($(select).val() === '') {
                empty_fields++;
                $empty_field = $(select);
            }
        });

        $('.error-group[data-validation-list="{0}"]'.format($field.attr('data-val-list'))).empty();
        // Si plus d'un champ est en erreur, on affiche une erreur globale
        if (empty_fields > 1) {
            $('.error-group[data-validation-list="{0}"]'.format($field.attr('data-val-list'))).append('<span class="">' + this.message + '</span>');
        } else if ($empty_field !== undefined) {
            $('.error-group[data-validation-list="{0}"]'.format($field.attr('data-val-list'))).append('<span class="">' + $empty_field.attr('data-val-required') + '</span>');
        }

        return is_valid;
    };

    window.RegexValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "regex";
    };

    window.RegexValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation par expression régulière
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.RegexValidator.prototype.valid = function ($field) {
        var is_valid = true
		  , value = $field.val();

        if (this.params.pattern !== undefined) {
            var match = new RegExp(this.params.pattern).exec(value);

            // Test expression régulière
            if (match
				&& (match.index === 0)
				&& (match[0].length === value.length)) {
                this.onValid($field);
            } else {
                this.onError($field, this.message);
                is_valid = false;
            }
        }

        return is_valid;
    };

    window.LengthValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "length";
    };

    window.LengthValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation de la longueur de la valeur saisie
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.LengthValidator.prototype.valid = function ($field) {
        var is_valid = true
		  , value = $field.val();

        if (this.params.min
			&& (this.params.min > value.length)) {
            this.onError($field, this.message);
            is_valid = false;
        }

        if (this.params.max
			&& (this.params.max < value.length)) {
            this.onError($field, this.message);
            is_valid = false;
        }

        if (is_valid === true) {
            this.onValid($field);
        }

        return is_valid;
    };

    window.RangeValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "range";
    };

    window.RangeValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation d'un intervalle
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.RangeValidator.prototype.valid = function ($field) {
        var is_valid = true;

        if (this.params.min
			&& this.params.max) {
            if (($field.val() * 1) >= this.params.min
				&& ($field.val() * 1) <= this.params.max) {
                this.onValid($field);
            } else {
                this.onError($field, this.message);
                is_valid = false;
            }
        }

        return is_valid;
    };

    window.RangeDateValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "rangeDate";
    };

    window.RangeDateValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation d'un intervalle
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.RangeDateValidator.prototype.valid = function ($field) {
        var is_valid = true
		  , date = moment($field.val(), "DD-MM-YYYY")
		  , date_min
		  , date_max;

        if (typeof moment === "undefined") {
            return true;
        }

        if (this.params.min
			&& this.params.max) {
            date_min = moment(this.params.min, "DD-MM-YYYY");
            date_max = moment(this.params.max, "DD-MM-YYYY");

            if (date.isAfter(date_min)
				&& date.isBefore(date_max)) {
                this.onValid($field);
            } else {
                this.onError($field, this.message);
                is_valid = false;
            }
        }

        return is_valid;
    };

    window.CompareValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "compare";
    };

    window.CompareValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation par comparaison de champs
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.CompareValidator.prototype.valid = function ($field) {
        var is_valid = true
          , $field_to_compare = $('[id$="{0}"]'.format(this.params.field));

        if ($field.val() === $field_to_compare.val()) {
            this.onValid($field);
        } else {
            this.onError($field, this.message);
            is_valid = false;
        }

        return is_valid;
    };

    window.RioFixeValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "rioFixe";
    };

    window.RioFixeValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation du champ requis
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.RioFixeValidator.prototype.valid = function ($field) {
        var is_valid = true
          , rio = $field.val()
          , match = /^[A-Z0-9]{2}[^E|P][A-Z0-9]{6}[A-Z0-9\+]{3}$/.exec(rio)
          , $numeroFixe = $('[id$="{0}"]'.format(this.params.field))
          , isFixeMatch = /^0[^6|7]/.exec($numeroFixe.val());

        if (rio.length !== 12 || $numeroFixe.val().length === '' || !isFixeMatch || (isFixeMatch.index !== 0)
            || !match || match.index !== 0 || match[0].length !== $field.val().length) {
            this.onValid($field);
            return is_valid;
        }

        // Test expression régulière
        var operateur = rio.substr(0, 2);
        var typeContrat = rio.substr(2, 1);
        var refClient = rio.substr(3, 6);

        var ordre = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+";
        var res = [0, 0, 0];
        var tmp = operateur.concat(typeContrat, refClient, $numeroFixe.val());
        for (var n = 0; n < 19; n++) {
            var pos = ordre.indexOf(tmp.substr(n, 1));
            res[0] = (res[0] + pos) % 37;
            res[1] = ((2 * res[1]) + pos) % 37;
            res[2] = ((4 * res[2]) + pos) % 37;
        }

        if (res[0] < 0 || res[1] < 0 || res[2] < 0) {
            is_valid = false;
        }

        var cleCalculee = ordre.substr(res[0], 1) + ordre.substr(res[1], 1) + ordre.substr(res[2], 1);
        if (rio.substr(9) != cleCalculee) {
            is_valid = false;
        }

        if (is_valid === true) {
            this.onValid($field);
        }
        else {
            this.onError($field, this.message);
            is_valid = false;
        }

        return is_valid;
    };

    window.CodePostalDomValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "CodePostalDom";
    };

    window.CodePostalDomValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation par expression régulière
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.CodePostalDomValidator.prototype.valid = function ($field) {
        var is_valid = true
		  , value = $field.val();

        if (this.params.regexdom !== undefined) {
            var match = new RegExp(this.params.regexdom).exec(value);

            // Test expression régulière
            if (match
				&& (match.index === 0)
				&& (match[0].length === value.length)) {
                this.onValid($field);
            } else {
                this.onError($field, this.message);
                is_valid = false;
            }
        }

        return is_valid;
    };

    window.ForbiddenCharacterValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
        this._type = "forbiddenCharacter";
    };

    window.ForbiddenCharacterValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation par expression régulière
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.ForbiddenCharacterValidator.prototype.valid = function ($field) {
        var is_valid = true
          , detectedWords = []
		  , value = $field.val()
          , errorMessage = this.message;

        if (this.params.forbiddencharacters !== undefined) {
            var match = new RegExp(this.params.forbiddencharacters).exec(value);

            if (match) {

                $.each(match, function (i, ponctuatedWord) {
                    if ($.inArray(detectedWords, ponctuatedWord) > -1) {
                        return false;
                    }

                    detectedWords.push(ponctuatedWord);
                });

                is_valid = false;
            } 
        }

        if (!is_valid) {
            detectedWords = detectedWords.filter(function (elem, pos, self) {
                return self.indexOf(elem) == pos;
            });

            detectedWords.join(",");

            if ((errorMessage + "").indexOf("{0}") == -1) {
                errorMessage = errorMessage.concat(detectedWords);
            } else {
                errorMessage = errorMessage.replace("{0}", detectedWords);
                errorMessage = errorMessage.replace("l e", "l'e");
            }

            if (errorMessage.indexOf(', ') > -1) {
                errorMessage = errorMessage.replace(/\(s\)/gi, "s");
                errorMessage = errorMessage.replace(/\(nt\)/gi, "nt");
                errorMessage = errorMessage.replace("cet élément", "ces éléments");
            } else {
                errorMessage = errorMessage.replace(/\(s\)/gi, "");
                errorMessage = errorMessage.replace(/\(nt\)/gi, "");
                errorMessage = errorMessage.replace("ces éléments", "cet élément");
            }

            this.errorMessage = errorMessage;
            this.onError($field, errorMessage);
        } else {
            this.errorMessage = null;
            this.onValid($field);
        }

        return is_valid;
    };

    window.ForbiddenWordValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
    };

    window.ForbiddenWordValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation par expression régulière
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.ForbiddenWordValidator.prototype.valid = function ($field) {
        var is_valid = true
          , detectedWords = []
		  , value = $field.val()
          , errorMessage = this.message;

        if (this.params.forbiddenwords !== undefined) {
            var words = this.params.forbiddenwords;

            if (words && words.length > 0) {

                $.each(words, function (i, ponctuatedWord) {
                    if (value.indexOf(ponctuatedWord) == -1 || $.inArray(detectedWords, ponctuatedWord) > -1) {
                        return;
                    }

                    detectedWords.push(ponctuatedWord);
                });

                if(detectedWords.length){
                    is_valid = false;
                }
            } 
        }

        if (!is_valid) {
            detectedWords = detectedWords.filter(function (elem, pos, self) {
                return self.indexOf(elem) == pos;
            });

            detectedWords.join(",");

            if ((errorMessage + "").indexOf("{0}") == -1) {
                errorMessage = errorMessage.concat(detectedWords);
            } else {
                errorMessage = errorMessage.replace("{0}", detectedWords);
                errorMessage = errorMessage.replace("l e", "l'e");
            }

            if (errorMessage.indexOf(', ') > -1) {
                errorMessage = errorMessage.replace(/\(s\)/gi, "s");
                errorMessage = errorMessage.replace(/\(nt\)/gi, "nt");
                errorMessage = errorMessage.replace("cet élément", "ces éléments");
            } else {
                errorMessage = errorMessage.replace(/\(s\)/gi, "");
                errorMessage = errorMessage.replace(/\(nt\)/gi, "");
                errorMessage = errorMessage.replace("ces éléments", "cet élément");
            }

            this.errorMessage = errorMessage;
            this.onError($field, errorMessage);
        } else {
            this.errorMessage = null;
            this.onValid($field);
        }

        return is_valid;
    };

	window.RequiredSiretValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
    };

    window.RequiredSiretValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation du champ requis
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
    window.RequiredSiretValidator.prototype.valid = function ($field) {
           
		if(typeof ($field.val()) == "undefined" || $field.val().length == 0)
		{
			this.onValid($field);
			return true;
		}
		else
		{
			var count = 0;
			var siret = $field.val();
			
			if (siret.length != 14 || isNaN(siret)) 
			{
				this.onError($field, this.message);
				return false;
			}

			var somme = 0;
			var tmp;
			for (var cpt = 0; cpt<siret.length; cpt++) 
			{
				if ((cpt % 2) == 0) 
				{ // Les positions impaires : 1er, 3è, 5è, etc... 
					tmp = siret.charAt(cpt) * 2; // On le multiplie par 2
					if (tmp > 9) 
					{
						tmp -= 9;	// Si le résultat est supérieur à 9, on lui soustrait 9
					}
				}
				else
				{
					tmp = siret.charAt(cpt);
				}
				somme += parseInt(tmp);
			}
			if ((somme % 10) == 0)
			{
				this.onValid($field);
				return true; // Si la somme est un multiple de 10 alors le SIRET est valide 
			}
			else
			{
				this.onError($field, this.message);
				return false;
			}
		}
    };

	
	window.MinimumLengthValidator = function (params, message) {
        Validator.call(this);

        this.params = params || {};
        this.message = message;
    };

    window.MinimumLengthValidator.prototype = Object.create(Validator.prototype);
    /**
	 * Validation par expression régulière
	 * 
	 * @param  {Object} $field  - Objet jQuery correspondant au champ de formulaire
	 * @return {Boolean}        - Etat de la validation
	 */
	window.MinimumLengthValidator.prototype.valid = function ($field) {
		 var is_valid = true
		  , value = $field.val()
          , errorMessage = this.message;
	 
            if (value != null && $.trim(value).length < this.params.minimumlength) {
                this.onError($field, errorMessage);
				is_valid = false;
            } else if (value != null) {
                is_valid = true;
            }
			
			if (is_valid === true) {
				this.onValid($field);
			} else {
				this.onError($field, this.message);
				is_valid = false;
			}

        return is_valid;	 
	  };
})(jQuery, window);