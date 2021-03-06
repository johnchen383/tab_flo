/*
 * api calls
/*
 *   types are : General, knock-knock, programming
 *
 *
 */
function callAPI(type) {
  if (type) {
    return axios.get(
      `https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/type/${type}`
    );
  } else {
    return axios.get(
      `https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes`
    );
  }
}

/**
 * Get .html elements
 */
const form = document.getElementById("myForm");
const input = document.getElementById("commandName");
const injectable = document.getElementById("injectable");
const helpText = document.getElementById("help");
const secondaryText = document.getElementById("secondary");
const gif = document.getElementById("texting-gif");
var arrayOfCommands = [];
var indexOfCommand = 0;
const allCommands = [
  "add",
  "open",
  "list",
  "add-all",
  "r",
  "re",
  "remove",
  "help",
  "reset",
  "delete",
  "close",
  "random-joke",
  "prog-joke",
  "knock-knock",
];
const midPrompts = ["r", "re", "add"];
const midPromptVals = [
  "reset | remove | random-joke",
  "reset | remove",
  "add | add-all",
];

if (input !== null) {
  input.onkeydown = (e) => {
    const command = input.value.split("> ", 2)[1].split(" ")[0];
    addInjectableText("type 'help' for list of commands!");
    toggleSecondaryVisibility(false);
    if (command === "hel" && e.key === "p") {
      input.style.color = "turquoise";
    }
    if (command === "lis" && e.key === "t") {
      input.style.color = "orange";
    }
    if (command === "rese" && e.key === "t") {
      input.style.color = "red";
    }
    if (e.key === " ") {
      colourField(command);
    } else if (e.key === "Backspace") {
      if (input.value.length >= 3) {
      } else {
        e.preventDefault();
        resetInputField();
      }
    } else if (e.key === "Enter") {
      arrayOfCommands.push(input.value.split("> ", 2)[1]);
      console.log("enter", arrayOfCommands);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (arrayOfCommands.length > 0) {
        let indexToGet = arrayOfCommands.length - indexOfCommand - 1;
        input.value = "> " + arrayOfCommands[indexToGet];
        colourField(arrayOfCommands[indexToGet]);
        if (indexOfCommand < arrayOfCommands.length - 1) {
          indexOfCommand += 1;
        }
      }
    } else if (e.key === "ArrowDown") {
      if (indexOfCommand >= 1) {
        indexOfCommand -= 1;

        let indexToGet = arrayOfCommands.length - indexOfCommand - 1;
        if (arrayOfCommands[indexToGet] != undefined) {
          input.value = "> " + arrayOfCommands[indexToGet];
          colourField(arrayOfCommands[indexToGet]);
        }
      } else {
        input.value = "> ";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      let changedCommand = allCommands.find((commandName) => {
        //check prefixes
        if (commandName.split(command)[0] == "") {
          return true;
        } else {
          return false;
        }
      });
      if (changedCommand !== undefined) {
        input.value = "> " + changedCommand;
        // command = changedCommand;
        colourField(changedCommand);

        for (i = 0; i < 3; i++) {
          if (midPrompts[i] == command) {
            addInjectableText(midPromptVals[i]);
          }
        }
      }
    }
  };
}

toggleHelpVisibility(false);
toggleSecondaryVisibility(false);
resetInputField();

if (injectable != null) {
  injectable.style.display = "none";
}

function addInjectableText(text) {
  injectable.innerText = text;
  injectable.style.display = "block";
}

function addSecondaryText(text) {
  secondaryText.innerText = text;
  secondaryText.style.display = "block";
}

/**
 * Get the url of the current tab
 * @returns tab url
 */
async function getCurrentTab() {
  //returns a promise
  let queryOptions = { active: true, currentWindow: true };
  return new Promise((resolve, reject) =>
    chrome.tabs.query(queryOptions, (tab) => {
      resolve(tab[0].url);
    })
  );
}

/**
 * Gets tabs of the active window
 * @returns all tabs
 */
async function getWindowTabs() {
  //returns a promise
  let queryOptions = { currentWindow: true };
  return new Promise((resolve, reject) =>
    chrome.tabs.query(queryOptions, (tab) => {
      resolve(tab);
    })
  );
}

/**
 * Colour the input field
 */
function colourField(command) {
  switch (command.split(" ")[0]) {
    case "add":
      input.style.color = "LimeGreen";
      break;
    case "open":
      input.style.color = "gold";
      break;
    case "remove":
      input.style.color = "LimeGreen";
      break;
    case "help":
      input.style.color = "turquoise";
      break;
    case "add-all":
      input.style.color = "LimeGreen";
      break;
    case "list":
      input.style.color = "orange";
      break;
    case "reset":
      input.style.color = "red";
      break;
    case "delete":
      input.style.color = "red";
      break;
    case "close":
      input.style.color = "gold";
      break;
    default:
      input.style.coloir = "white";
  }
}

/**
 * Reset the input field
 */
function resetInputField() {
  if (input != null) {
    // console.log(input.value, input.value.length);
    input.value = "> ";
    input.style.color = "white";
    input.focus();
  }
}

/**
 * Toggle visibility of help text
 * @param {boolean} isVisible
 */
function toggleHelpVisibility(isVisible) {
  if (helpText != null) {
    if (!isVisible) {
      helpText.style.display = "none";
    } else {
      helpText.style.display = "block";
    }
  }
}

/**
 * toggle visibility of GIF indicator
 * @param {boolean} isVisible
 */
function toggleGIFvisibility(isVisible) {
  if (gif != null) {
    if (!isVisible) {
      gif.style.display = "none";
    } else {
      gif.style.display = "block";
    }
  }
}

/**
 * Toggle visibility of secondary text
 * @param {boolean} isVisible
 */
function toggleSecondaryVisibility(isVisible) {
  if (secondaryText != null) {
    if (!isVisible) {
      secondaryText.style.display = "none";
    } else {
      secondaryText.style.display = "block";
    }
  }
}

/**
 * Add form handler
 */
if (form != null) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const toBeInserted = input.value.split("> ", 2)[1];
    let [command, workspace] = toBeInserted.split(" ");
    injectable.style.display = "none";
    switch (command) {
      /**
       * Open all tabs from a particular workspace
       */
      case "open":
        if (workspace === undefined || workspace === "") {
          addInjectableText("Please enter the name of workspace!");
        } else {
          chrome.storage.sync.get([workspace], function (result) {
            let allwebsites = result[workspace];

            if (allwebsites === undefined) {
              addInjectableText(
                "workspace '" + workspace + "' does not exist."
              );
              return;
            }
            allwebsites.map((website) =>
              website.includes("chrome://") ? null : window.open(website)
            );
          });
        }
        resetInputField();
        toggleHelpVisibility(false);
        break;
      /**
       * Adds all tabs of active window to a particular workspace
       */
      case "add-all": //for now to make them different - could change them later if wanted
        if (workspace === undefined || workspace === "") {
          addInjectableText("Please enter the name of workspace!");
        } else {
          getWindowTabs().then((tabs) => {
            let arrayOfWebsites = [];

            for (let i = 0; i < tabs.length; i++) {
              arrayOfWebsites[i] = tabs[i].url;
            }

            chrome.storage.sync.get([workspace], function (result) {
              if (result[workspace] !== undefined) {
                arrayOfWebsites.push(...result[workspace]);
              }

              chrome.storage.sync.set({ [workspace]: arrayOfWebsites });
            });
          });
        }
        resetInputField();
        toggleHelpVisibility(false);
        break;

      /**
       * Adds active tab to a particular workspace
       */
      case "add":
        if (workspace === undefined || workspace === "") {
          addInjectableText("Please enter the name of workspace!");
        } else {
          getCurrentTab().then((tab) => {
            chrome.storage.sync.get([workspace], function (result) {
              let arrayOfWebsites = [tab];
              if (result[workspace] !== undefined) {
                arrayOfWebsites.push(...result[workspace]);
              }

              chrome.storage.sync.set({ [workspace]: arrayOfWebsites });
            });
          });
        }

        resetInputField();
        toggleHelpVisibility(false);
        break;
      /**
       * Removes active tab from a particular workspace
       */
      case "remove":
        if (workspace === undefined || workspace === "") {
          addInjectableText("Please enter the name of workspace!");
        } else {
          getCurrentTab().then((tab) => {
            chrome.storage.sync.get([workspace], function (result) {
              let arrayOfWebsites = [];
              let tabInWorkspace = result[workspace].find(
                (resultTab) => tab === resultTab
              );
              if (
                result[workspace] !== undefined &&
                tabInWorkspace !== undefined
              ) {
                arrayOfWebsites = result[workspace].filter(
                  (resultTabs) => resultTabs !== tabInWorkspace
                );
              }

              chrome.storage.sync.set({ [workspace]: arrayOfWebsites });
            });
          });
        }
        resetInputField();
        toggleHelpVisibility(false);
        break;
      /**
       * Close all tabs which match a particular workspace
       */
      case "close":
        if (workspace === undefined || workspace === "") {
          addInjectableText("Please enter the name of workspace!");
        } else {
          chrome.storage.sync.get([workspace], function (result) {
            let allwebsites = result[workspace];

            if (allwebsites === undefined) {
              addInjectableText(
                "workspace '" + workspace + "' does not exist."
              );
              return;
            } else {
              getWindowTabs().then((tabs) => {
                let tabInfo = {};
                tabs.map((tab) => {
                  tabInfo[tab.url] = tab.id;
                });
                for (const [key, value] of Object.entries(tabInfo)) {
                  allwebsites.map((website) => {
                    if (website === key) {
                      chrome.tabs.remove(value);
                    }
                  });
                }
              });
            }
          });
        }

        resetInputField();
        toggleHelpVisibility(false);
        break;
      /**
       * Closes all tabs and resets with a new tab
       */
      case "reset":
        getWindowTabs().then((tabs) => {
          let arrayOfTabIDs = [];

          tabs.map((tab) => {
            arrayOfTabIDs.push(tab.id);
          });
          window.open("https://www.google.com/");
          arrayOfTabIDs.map((tabID) => chrome.tabs.remove(tabID));
        });

        break;
      /**
       * Deletes a particular workspace
       */
      case "delete":
        if (workspace === undefined || workspace === "") {
          addInjectableText("Please enter the name of workspace!");
        } else {
          chrome.storage.sync.get([workspace], function (result) {
            let allwebsites = result[workspace];

            if (allwebsites === undefined) {
              addInjectableText(
                "workspace '" + workspace + "' does not exist."
              );
              return;
            }
            chrome.storage.sync.remove([workspace], function (result) {
              console.log("result", result);
            });
          });
        }

        resetInputField();
        toggleHelpVisibility(false);
        break;
      /**
       * Lists all the workspaces that can be used
       */
      case "list":
        if (workspace === undefined || workspace === "") {
          chrome.storage.sync.get(null, function (items) {
            var allKeys = Object.entries(items);

            if (allKeys.length == 0) {
              //no workspaces to list
              addInjectableText("No workspaces stored.");
              addSecondaryText(
                "To add to a workspace, use add or add-all commands"
              );
              return;
            }

            var str = "";
            allKeys.map((key) => {
              var s = "- " + key[0] + "\t (stored: " + key[1].length + ")\n";
              str += s;
            });
            addInjectableText("Workspaces:");
            addSecondaryText(str);
          });
        } else {
          chrome.storage.sync.get([workspace], function (result) {
            let allwebsites = result[workspace];

            if (allwebsites === undefined) {
              addInjectableText(
                "workspace '" + workspace + "' does not exist."
              );
              return;
            }

            if (allwebsites.length == 0) {
              //no websites to list
              addInjectableText("No websites stored in workspace " + workspace);
              addSecondaryText(
                "To add to a workspace, use add or add-all commands"
              );
              return;
            }

            var str = "";
            allwebsites.map((site) => {
              var s = "- " + site + "\n";
              str += s;
            });
            addInjectableText("Sites in workspace: " + workspace);
            addSecondaryText(str);
          });
        }

        resetInputField();
        toggleHelpVisibility(false);
        break;
      /**
       * Shows all the commands that can be used
       */
      case "help":
        toggleHelpVisibility(true);
        resetInputField();
        break;

      case "prog-joke":
        toggleGIFvisibility(true);
        toggleHelpVisibility(false);
        callAPI("programming")
          .then((res) => {
            const joke = res.data[0];
            addInjectableText(joke.setup);
            addSecondaryText(joke.punchline);
            resetInputField();
            toggleGIFvisibility(false);
          })
          .catch((err) => {
            addInjectableText("Sorry! Something went wrong! Try Again");
            resetInputField();
            toggleGIFvisibility(false);
          });
        break;

      case "knock-knock":
        toggleGIFvisibility(true);
        toggleHelpVisibility(false);
        callAPI("knock-knock")
          .then((res) => {
            const joke = res.data[0];
            // console.log(joke);
            addInjectableText(joke.setup);
            addSecondaryText(joke.punchline);
            resetInputField();
            toggleGIFvisibility(false);
          })
          .catch((err) => {
            addInjectableText("Sorry! Something went wrong! Try Again");
            resetInputField();
            toggleGIFvisibility(false);
          });
        break;
      case "random-joke":
        toggleGIFvisibility(true);
        toggleHelpVisibility(false);
        callAPI("general")
          .then((res) => {
            const joke = res.data[0];
            // console.log(joke);
            addInjectableText(joke.setup);
            addSecondaryText(joke.punchline);
            resetInputField();
            toggleGIFvisibility(false);
          })
          .catch((err) => {
            addInjectableText("Sorry! Something went wrong! Try Again");
            resetInputField();
            toggleGIFvisibility(false);
          });
        break;
      case "joke":
        addInjectableText(
          "Want a joke? We've got plenty! Type one of the commands below."
        );
        addSecondaryText("random-joke | prog-joke | knock-knock");
        resetInputField();
        toggleHelpVisibility(false);
        break;
      default:
        addInjectableText(
          "Command '" + command + "' is not a registered command."
        );
        addSecondaryText("Type 'help' to see what commands are available");
        resetInputField();
        toggleHelpVisibility(false);
    }
  });
}
