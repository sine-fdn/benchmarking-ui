export default function Party({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  async function handleSubmission(formData: FormData) {
    "use server";

    const { id, party } = await params;

    console.log(
      "Session ID",
      id,
      "Party:",
      party,
      "Value:",
      formData.get("value")
    );
  }

  return (
    <div>
      <form action={handleSubmission}>
        <label htmlFor="value">Please enter your value for:</label>
        <input type="number" id="value" name="value" />
        <button type="submit">Submit</button>
      </form>
      <p>More information: [DESCRIPTION]</p>
    </div>
  );
}
