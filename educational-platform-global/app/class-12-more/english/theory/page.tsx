import TheoryPage from "../../[subject]/theory/page";

export default function Page() {
  return <TheoryPage params={Promise.resolve({ subject: "english" })} />;
}
