let historyCode = [];

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
        navigation: {},
        node: function () {
            this.push(function (command) {
                if (command.trim() === "") {
                } else {
                    historyCode.push(command);
                    let result;
                    try {
                        result = window.eval(historyCode.join("\n"));
                    } catch (e) {
                        historyCode.pop();
                    } finally {
                        this.echo(String(result));
                    }
                }
            }, {
                prompt: "> "
            })
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
    $("body").terminal(commands(), {
        prompt: prompt(),
        greetings: greetings()
    });
});

