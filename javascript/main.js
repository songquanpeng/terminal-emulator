let nodejsCodeHistory = [];
let sorryStatement = "[[;#9933ff;]I am sorry, this command has not been implemented yet.] [[;#4dff4d;]Maybe you can pull a request?]";

function init() {
    if (localStorage.getItem("isFirstTimeStart") === null) {
        localStorage.setItem("isFirstTimeStart", "false");
        localStorage.setItem("prompt", "default");
        localStorage.setItem("username", "username");
        localStorage.setItem("hostname", "hostname");
    }
}

function greetings() {
    return ""
}

function prompt() {
    let username = localStorage.getItem("username");
    let hostname = localStorage.getItem("hostname");
    let promptText = "[[b;green;]" + username + "@" + hostname + "]:[[b;blue;]/home/" + username + "]$ ";
    let promptOption = localStorage.getItem("prompt");
    switch (promptOption) {
        case "default":
            break;
        case "windows":
            promptText = "[[b;green;]C:\\Users\\" + username + "]> ";
            break;
        case "python":
            promptText = "[[b;green;]>>> ]";
            break;
        default:
            promptText = "[[b;green;]" + promptOption + "";
            break;
    }
    return promptText;
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
            this.echo("Notice that you can press Ctrl+D to exit nodejs interpreter.");
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
        reload: function () {
            location.reload();
        },
        set: function (para) {
            let key = para.split(" ")[0];
            let value = para.split(" ").slice(1).join(" ");
            switch (key) {
                case "username":
                    localStorage.setItem("username", value);
                    break;
                case "hostname":
                    localStorage.setItem("hostname", value);
                    break;
                case "prompt":
                    localStorage.setItem("prompt", value);
                    this.echo("[[;green;]Reload the page to apply your setting.]");
                    break;
                case "":
                    this.echo("[[;red;]Invalid format!]");
                    break;
                default:
                    this.echo('[[;red;]No such key: "' + key + '"!]');
                    break;
            }
        },
        uname: function () {
            this.echo("Linux Ubuntu 4.4.0-18362 GNU/Linux. [[i;#808080;](Just for kidding.)]")
        }
    }
}

$(document).ready(() => {
    init();
    $("body").terminal(commands(), {
        prompt: prompt(),
        greetings: greetings()
    });
});

