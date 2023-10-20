export default function Index({ onChange }) {
  return (
    <input type="number" onChange={(e) => onChange(e.currentTarget.value)} />
  );
}
