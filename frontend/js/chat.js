let currentConversation = null;

function getConversation() {

  if (!currentConversation) {

    currentConversation =
      createConversation();

    addConversation(
      currentConversation
    );
  }

  return currentConversation;
}

function renderMessages() {

  const container =
    document.getElementById("messages");

  const welcome =
    document.getElementById("welcome");

  container.innerHTML = "";

  const conversation =
    getConversation();

  welcome.style.display =
    conversation.messages.length
      ? "none"
      : "block";

  conversation.messages.forEach(message => {

    const row =
      document.createElement("div");

    row.className =
      `message ${message.role}`;

    const avatar =
      document.createElement("div");

    avatar.className = "avatar";

    avatar.textContent =
      message.role === "user"
        ? "U"
        : "G";

    const content =
      document.createElement("div");

    content.className =
      "message-content";

    content.textContent =
      message.content;

    row.appendChild(avatar);
    row.appendChild(content);

    container.appendChild(row);
  });

  const chatArea =
    document.getElementById("chatArea");

  chatArea.scrollTop =
    chatArea.scrollHeight;
}

async function sendMessage(text) {

  text = text.trim();

  if (!text) return;

  const conversation =
    getConversation();

  conversation.messages.push({
    role: "user",
    content: text
  });

  if (
    conversation.title === "New chat"
  ) {
    conversation.title =
      text.slice(0, 50);
  }

  saveConversations();
  renderHistory();
  renderMessages();

  const typing =
    document.createElement("div");

  typing.className =
    "message assistant";

  typing.innerHTML = `
    <div class="avatar">G</div>
    <div class="message-content typing">
      Thinking…
    </div>
  `;

  document
    .getElementById("messages")
    .appendChild(typing);

  try {

    const response =
      await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          model: selectedModel,
          messages:
            conversation.messages
        })
      });

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
        "AI request failed"
      );
    }

    conversation.messages.push({
      role: "assistant",
      content: data.reply
    });

    saveConversations();

    renderMessages();

  } catch (error) {

    conversation.messages.push({
      role: "assistant",
      content:
        `Error: ${error.message}`
    });

    saveConversations();
    renderMessages();
  }
      }
