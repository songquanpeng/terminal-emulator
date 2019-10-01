let nodejsCodeHistory = [];
let sorryStatement = "[[;#9933ff;]I am sorry, this command has not been implemented yet.] [[;#4dff4d;]Maybe you can pull a request?]";

function greetings() {
    return ""
}

function prompt() {
    return "[[;green;]>>> ]"
}

function commands() {
    return {
        about: function () {
            this.echo("[[;#0000ff;]Online terminal], created by [[;#1aff66;]JustSong].");
        },
        date: function () {
            const date = new Date();
            this.echo(date.toLocaleString());
        },
        echo: function (value) {
            this.echo(value);
        },
        help: function () {
            this.echo("This is an online terminal emulator.");
            this.echo("For more information, visit here:");
            this.echo("\thttps://github.com/songwonderful/online-shell\n");
        },
        history: function () {
            this.echo(sorryStatement);
        },
        ls: function () {
            this.echo(sorryStatement);
        },
        navigation: {},
        node: function () {
            this.push(function (command) {
                if (command.trim() === "") {
                } else {
                    nodejsCodeHistory.push(command);
                    let result;
                    try {
                        result = window.eval(nodejsCodeHistory.join("\n"));
                        this.echo(String(result));
                    } catch (e) {
                        nodejsCodeHistory.pop();
                        this.echo("[[;red;]" + e.message + "]");
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
            this.echo("Linux Ubuntu 4.4.0-18362 GNU/Linux. [[i;#808080;](Just for kidding.)]")
        }
    }
}

$(document).ready(() => {
    $("body").terminal(commands(), {
        prompt: prompt(),
        greetings: greetings()
    });
});

