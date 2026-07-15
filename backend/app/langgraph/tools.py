from app.services.groq_service import extract_interaction_data


def log_interaction_tool(state):

    extracted = extract_interaction_data(
        state["user_input"]
    )

    state["extracted_data"] = extracted

    state["response"] = (
        "Interaction extracted successfully"
    )

    return state


def edit_interaction_tool(state):

    existing_data = state.get(
        "extracted_data",
        {}
    )

    updates = extract_interaction_data(
        state["user_input"]
    )

    for key, value in updates.items():

        # Ignore empty values
        if value in ["", None]:
            continue

        # Ignore empty lists
        if isinstance(value, list) and len(value) == 0:
            continue

        # Merge products, materials and objections
        if key in [
            "products_discussed",
            "materials_requested",
            "objections"
        ]:

            old_value = existing_data.get(
                key,
                ""
            )

            if old_value:

                old_items = [
                    item.strip()
                    for item in old_value.split(",")
                    if item.strip()
                ]

                new_items = [
                    item.strip()
                    for item in str(value).split(",")
                    if item.strip()
                ]

                merged = old_items.copy()

                for item in new_items:
                    if item not in merged:
                        merged.append(item)

                existing_data[key] = ", ".join(
                    merged
                )

            else:
                existing_data[key] = value

        # Append summaries instead of replacing
        elif key == "summary":

            old_summary = existing_data.get(
                "summary",
                ""
            )

            if old_summary:

                if value not in old_summary:
                    existing_data["summary"] = (
                        old_summary
                        + "\n\n"
                        + value
                    )

            else:
                existing_data["summary"] = value

        # Sentiment should overwrite only when explicitly updated
        elif key == "sentiment":
            existing_data["sentiment"] = value

        # Follow-up date should change only if a new date is provided
        elif key == "follow_up_date":

            if value.strip():
                existing_data[
                    "follow_up_date"
                ] = value

        # Interaction type should change only if explicitly provided
        elif key == "interaction_type":

            if value.strip():
                existing_data[
                    "interaction_type"
                ] = value

        # All other fields overwrite normally
        else:
            existing_data[key] = value

    state["extracted_data"] = (
        existing_data
    )

    state["response"] = (
        "Interaction updated successfully"
    )

    return state