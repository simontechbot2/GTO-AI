document.addEventListener(
  "DOMContentLoaded",
  () => {

    setupSettings();
    setupUpload();
    renderHistory();

    const newChat =
      document.getElementById("newChat");

    newChat.onclick = () => {

      currentConversation =
        createConversation();

      addConversation(
        currentConversation
      );

      renderMessages();
    };

    const form =
      document.getElementById("chatForm");

    const input =
      document.getElementById("messageInput");

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        sendMessage(input.value);

        input.value = "";
        input.style.height = "auto";
      }
    );

    input.addEventListener(
      "input",
      () => {

        input.style.height = "auto";

        input.style.height =
          Math.min(
            input.scrollHeight,
            180
          ) + "px";
      }
    );

    input.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" &&
          !event.shiftKey
        ) {

          event.preventDefault();

          form.requestSubmit();
        }
      }
    );

    document
      .querySelectorAll(
        ".suggestions button"
      )
      .forEach(button => {

        button.onclick = () => {

          input.value =
            button.dataset.prompt;

          form.requestSubmit();
        };
      });

    document
      .getElementById("modelButton")
      .onclick = () => {

        document
          .getElementById("modelMenu")
          .classList.toggle(
            "hidden"
          );
      };

    document
      .querySelectorAll(
        "[data-model]"
      )
      .forEach(button => {

        button.onclick = () => {

          setModel(
            button.dataset.model
          );

          document
            .getElementById(
              "modelMenu"
            )
            .classList.add(
              "hidden"
            );
        };
      });

    document
      .getElementById("openSidebar")
      .onclick = () => {

        document
          .getElementById("sidebar")
          .classList.add("open");
      };

    document
      .getElementById("closeSidebar")
      .onclick = () => {

        document
          .getElementById("sidebar")
          .classList.remove("open");
      };

    window.loadConversation =
      id => {

        currentConversation =
          conversations.find(
            conversation =>
              conversation.id === id
          );

        renderMessages();
      };

    setModel(selectedModel);

    currentConversation =
      conversations.length
        ? conversations[
            conversations.length - 1
          ]
        : createConversation();

    if (!conversations.length) {
      addConversation(
        currentConversation
      );
    }

    renderMessages();
  }
);
