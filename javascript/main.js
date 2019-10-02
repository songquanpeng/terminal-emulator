import {fileSystem} from "./fs.js";

let nodejsCodeHistory = [];
let sorryStatement = "[[;#9933ff;]I am sorry, this command has not been implemented yet.] [[;#4dff4d;]Maybe you can pull a request?]";

function isDir(path) {
    let current = fileSystem;
    path.split('/').forEach(function (item) {
        if (item !== "") {
            current = current[item];
        }
    });
    return typeof current === "object";
}

let currentWorkingDir = localStorage.getItem("currentWorkingDir");
if (currentWorkingDir === null) {
    currentWorkingDir = "/";
    localStorage.setItem("currentWorkingDir", currentWorkingDir);
}
let fakePathPrefix;

function init() {
    if (localStorage.getItem("isFirstTimeStart") === null) {
        localStorage.setItem("isFirstTimeStart", "false");
        localStorage.setItem("prompt", "default");
        localStorage.setItem("username", "username");
        localStorage.setItem("hostname", "hostname");
    }
    let prompt = localStorage.getItem("prompt");
    let username = localStorage.getItem("username");
    if (prompt !== "windows") {
        fakePathPrefix = "/home/" + username;
    } else {
        fakePathPrefix = "C:/Users/" + username;
    }
}

function reload() {
    localStorage.setItem("currentWorkingDir", currentWorkingDir);
    location.reload();
}

function greetings() {
    return ""
}

function prompt() {
    let username = localStorage.getItem("username");
    let hostname = localStorage.getItem("hostname");
    let promptText = "[[b;green;]" + username + "@" + hostname + "]:[[b;blue;]/home/" + username + currentWorkingDir + "]$ ";
    let promptOption = localStorage.getItem("prompt");
    fakePathPrefix = "/home/" + username;
    switch (promptOption) {
        case "default":
            break;
        case "windows":
            fakePathPrefix = "C:/Users/" + username;
            promptText = "[[b;green;]" + fakePathPrefix + currentWorkingDir + "]> ";
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
        cat: function (value) {
            let current = fileSystem;
            let fileArray = [];
            currentWorkingDir.split('/').forEach(function (item) {
                if (item !== "") {
                    current = current[item];
                }
            });
            for (let key in current) {
                if (current[key] !== undefined) {
                    if (typeof current[key] === "string") {
                        fileArray.push(key);
                    }
                }
            }
            if (fileArray.includes(value)) {
                this.echo(current[value]);
            } else {
                this.echo("No such file: " + value);
            }
        },
        cd: function (value) {
            let pathTransferArray = [];
            let dirArray = [];
            if (value === "~") {
                currentWorkingDir = "/";
                this.set_prompt(prompt());
            } else if (value === "..") {
                if (currentWorkingDir === "/") {
                    this.echo("Access denied!");
                } else {
                    pathTransferArray = currentWorkingDir;
                    pathTransferArray = pathTransferArray.split("/");
                    pathTransferArray.pop();
                    pathTransferArray.pop();
                    currentWorkingDir = (pathTransferArray.join("/") + "/");
                    this.set_prompt(prompt());
                }
            } else {
                let current = fileSystem;
                currentWorkingDir.split('/').forEach(function (item) {
                    if (item !== "") {
                        current = current[item];
                    }
                });
                for (let key in current) {
                    if (current[key] !== undefined) {
                        if (typeof current[key] === "object") {
                            dirArray.push(key);
                        }
                    }
                }
                if (dirArray.includes(value)) {
                    currentWorkingDir += (value + "/");
                    this.set_prompt(prompt());
                } else {
                    this.echo("No such dir: " + value);
                }
            }
        },
        date: function () {
            const date = new Date();
            this.echo(date.toLocaleString());
        },
        echo: function (value) {
            this.echo("[[;#ff00ff;]" + value + "]");
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
            this.echo("[[b;#ff00ff;]Name\t\tType]");
            let current = fileSystem;
            currentWorkingDir.split('/').forEach(function (item) {
                if (item !== "") {
                    current = current[item];
                }
            });
            for (let key in current) {
                if (current[key] !== undefined) {
                    if (typeof current[key] === "object") {
                        this.echo(key + "\t\tDir");
                    } else {
                        this.echo(key + "\t\tFile");
                    }
                }
            }
        },
        nav: {
            delete: function (value) {
                this.echo(sorryStatement);
            },
            help: function () {
                this.echo("[[b;#6600ff;]delete]\tDelete target website.");
                this.echo("[[b;#6600ff;]list]\tList saved websites.");
                this.echo("[[b;#6600ff;]open]\tOpen a website by some information that user provided.");
                this.echo("[[b;#6600ff;]save]\tSave the website extracted from the link user provided. ");
            },
            list: function () {
                let savedDomains = JSON.parse(localStorage.getItem("domains"));
                const that = this;
                if (savedDomains !== null) {
                    savedDomains.forEach(function (item) {
                        that.echo(item);
                    });
                }
            },
            open: function (keyword) {
                this.echo(sorryStatement);
            },
            save: function (link) {
                let matchResult = link.toString().match(/https?:\/\/[a-zA-Z0-9\.]*\.[a-zA-Z]*(:[0-9]*)?/);
                if (matchResult === null) {
                    this.echo("[[;red;]Not a valid link!]");
                    return;
                }
                let domain = matchResult[0];
                let savedDomains = [];
                if (localStorage.getItem("domains") !== null) {
                    savedDomains = JSON.parse(localStorage.getItem("domains"));
                }
                if (!savedDomains.includes(domain)) {
                    savedDomains.push(domain);
                    localStorage.setItem("domains", JSON.stringify(savedDomains));
                    this.echo("[[;#00ff00;]Domain " + domain + " saved.]");
                } else {
                    this.echo("[[;#ffff00;]This domain already exists!]");
                }
            }
        },
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
        mkdir: function () {
            this.echo(sorryStatement);
        },
        mv: function () {
            this.echo(sorryStatement);
        },
        pwd: function () {
            this.echo("Current working directory: [[;#ff00ff;]" + fakePathPrefix + currentWorkingDir + "]");
        },
        reload: function () { // Before reloading, remember to save context.
            reload();
        },
        rm: function () {
            this.echo(sorryStatement);
        },
        set: function (para) {
            let key = para.split(" ")[0];
            let value = para.split(" ").slice(1).join(" ");
            switch (key) {
                case "username":
                    localStorage.setItem("username", value);
                    this.set_prompt(prompt());
                    break;
                case "hostname":
                    localStorage.setItem("hostname", value);
                    this.set_prompt(prompt());
                    break;
                case "prompt":
                    localStorage.setItem("prompt", value);
                    this.set_prompt(prompt());
                    break;
                case "":
                    this.echo("[[;red;]Invalid format!]");
                    break;
                default:
                    this.echo('[[;red;]No such key: "' + key + '"!]');
                    break;
            }
        },
        touch: function () {
            this.echo(sorryStatement);
        },
        uname: function () {
            this.echo("Linux Ubuntu 4.4.0-18362 GNU/Linux. [[i;#808080;](Just for kidding.)]")
        },
        whoami: function () {
            this.echo(localStorage.getItem("username"));
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

