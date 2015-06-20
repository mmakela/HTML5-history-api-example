var pushPopState = {

    run: function(){
        this.bindNavLinks();
        this.pop();
        this.runTimer(1);
    },

    bindNavLinks: function() {
        var self = this,
            url;

        $('#navigation').on('click', 'ul li a', function() {
            url = $(this).attr('href');
            self.load(url);
            window.history.pushState(null, $(this).attr('title'), url);
            return false;
        });
    },

    pop: function() {
        var self = this;

        window.onpopstate = function() {
            self.load(location.pathname);
        };
    },

    load: function(url) {
        $.getJSON(url, function(json) {
            $.each(json, function(k, v) {
                $('#' + k + ' section').fadeOut(200, function() {
                    $(this).replaceWith($(v).hide().fadeIn(200));
                });
            });
        });
    },

    timer: function(n) {
        setTimeout(function() {
            $('#timer').html(n);
            pushPopState.runTimer(n);
        }, 1000);
    },

    runTimer: function(n) {
        pushPopState.timer(parseInt(n, 10) + 1);
    }
};

$(function(){
    pushPopState.run();
});
