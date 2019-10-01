function greetings() {
    return ""
}

function prompt() {
    return "[[;green;]>>> ]"
}

function commands() {
    return {
        date: function () {
            const date = new Date();
            this.echo(date.toLocaleString());
        },
        echo: function (value) {
            this.echo(value);
        },
        help: function () {
            this.echo("https://github.com/songwonderful/online-shell");
        },
        history: function () {
            this.echo("");
        },
        ls: function () {
            this.echo("");
        },
        pwd: function () {
            this.echo("");
        },
        uname: function () {
            this.echo("Online terminal. Created by JustSong.")
        }
    }
}

$(document).ready(() => {
    $("#terminal").terminal(commands(), {
        prompt: prompt(),
        greetings: greetings()
    });
});

