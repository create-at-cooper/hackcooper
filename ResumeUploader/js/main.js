/*
 * jQuery File Upload Plugin JS Example 8.9.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global $, window */

$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        add: function(e, data) {
             var uploadErrors = [];
             var acceptFileTypes = /(\.|\/)(pdf)$/i;
             if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
                 uploadErrors.push('Not an accepted file type');
                 console.log("wrong file type");
             }
             if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 5000000) {
                 uploadErrors.push('File is too big');
             }
             if(uploadErrors.length > 0) {
                 alert(uploadErrors.join("\n"));
             } else {
                 data.submit();
             }
            },
        xhrFields: {withCredentials: false},
        url: 'https://jac.cooper.edu/HCResumes/index.php'
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    if (window.location.hostname === 'https://jac.cooper.edu/HCResumes/index.php') {
        // Demo settings:
        $('#fileupload').fileupload('option', {
            add: function(e, data) {
             var uploadErrors = [];
             var acceptFileTypes = /(\.|\/)(pdf)$/i;
             if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
                 uploadErrors.push('Not an accepted file type');
                 console.log("wrong file type");
             }
             if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 5000000) {
                 uploadErrors.push('File is too big');
             }
             if(uploadErrors.length > 0) {
                 alert(uploadErrors.join("\n"));
             } else {
                 data.submit();
             }
            },

            url: 'https://jac.cooper.edu/HCResumes/index.php',
            // Enable image resizing, except for Android and Opera,
            // which actually support image resizing, but fail to
            // send Blob objects via XHR requests:
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(pdf)$/i
        });
        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                url: 'https://jac.cooper.edu/HCResumes/index.php',
                type: 'HEAD'
            }).fail(function () {
                $('<div class="alert alert-danger"/>')
                    .text('Upload server currently unavailable - ' +
                            new Date())
                    .appendTo('#fileupload');
            });
        }
    } else {
        // Load existing files:
        $('#fileupload').addClass('fileupload-processing');
        $.ajax({
            // Uncomment the following to send cross-domain cookies:
            xhrFields: {withCredentials: false},
            url: $('#fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $('#fileupload')[0]
        }).always(function () {
            $(this).removeClass('fileupload-processing');
        }).done(function (result) {
            $(this).fileupload('option', 'done')
                .call(this, $.Event('done'), {result: result});
        });
    }

});
