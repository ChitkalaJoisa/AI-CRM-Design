import InteractionForm from "../components/InteractionsForm";
import AIChatPanel from "../components/AIChatPanel";

export default function LogInteractionPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
        boxSizing: "border-box",
        background: "#f5f7fb",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#1E293B",
            fontSize: "42px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Log HCP Interaction
        </h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "72%",
            }}
          >
            <InteractionForm />
          </div>

          <div
            style={{
              width: "28%",
            }}
          >
            <AIChatPanel />
          </div>
        </div>
      </div>
    </div>
  );
}