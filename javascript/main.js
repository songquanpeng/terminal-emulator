function greetings() {
    return ""
}

function prompt() {
    return "[[;green;]>>> ]"
}

function commands() {
    return {
        help: function () {
            this.echo("Help documents.");
        },
        echo: function (value) {
            this.echo(value);
        },
        ls: function () {
            this.echo("");
        },
        pwd: function () {
            this.echo("");
        },
        uname: function () {
            this.echo("Online terminal, created by JustSong.")
        }
    }
}

$(document).ready(() => {
    $("#terminal").terminal(commands(), {
        prompt: prompt(),
        greetings: greetings()
    });
});

