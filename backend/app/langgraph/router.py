def router(state):

    if state["intent"] == "edit":
        return "edit"

    return "log"