def detect_intent(state):

    text = state["user_input"].lower().strip()

    edit_keywords = [
        "change",
        "update",
        "edit",
        "modify",
        "replace",
        "actually",
        "sorry",
        "correction",
        "instead",
        "interaction was",
        "interaction type",
        "follow up",
        "product discussed",
        "products discussed",
        "materials shared",
        "shared",
        "materials requested",
        "objection",
        "object"
        "sentiment",
        "feel",
        "felt",
        "It should have been",
        "It is"
    ]

    # If we already have an interaction and the user
    # sends a short follow-up message, treat it as edit.
    if (
        state.get("extracted_data")
        and len(text.split()) <= 10
    ):
        state["intent"] = "edit"

    elif any(
        keyword in text
        for keyword in edit_keywords
    ):
        state["intent"] = "edit"

    else:
        state["intent"] = "log"

    print(
        "Detected Intent:",
        state["intent"]
    )

    return state