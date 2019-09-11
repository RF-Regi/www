---
title: 'Send oss en mail'
form:
    action: /kontakt
    name: contact-form
    fields:
        -
            name: name
            label: Navn
            placeholder: Navn
            type: text
            validate:
                required: true
            classes: form-control
        -
            name: email
            label: Epost
            placeholder: 'Epost adresse'
            type: email
            validate:
                required: true
            classes: form-control
        -
            name: phone
            label: Telefon
            placeholder: telefon
            type: text
            validate:
                required: false
            classes: form-control
        -
            name: message
            label: Melding
            placeholder: 'Skriv oss en melding'
            type: textarea
            rows: 6
            validate:
                required: true
            classes: form-control
    buttons:
        -
            type: submit
            value: 'Send Message'
            classes: 'btn btn-primary'
    process:
        -
            email:
                from: '{{ config.plugins.email.from }}'
                to:
                    - '{{ config.plugins.email.to }}'
                subject: '[Contact] {{ form.value.name|e }}'
                body: '{% include ''forms/data.html.twig'' %}'
        -
            save:
                fileprefix: contact-
                dateformat: Ymd-His-u
                extension: txt
                body: '{% include ''forms/data.txt.twig'' %}'
        -
            display: thank-you
---

