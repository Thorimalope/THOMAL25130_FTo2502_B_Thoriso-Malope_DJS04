export default function SeachBar({value, onChange}) {
    return (
        <input
            type="text"
            placeholder="Search podcasts..."
            value={value}
            onChange={function (e) {
                onChange(e.target.value);
            }}
        />
    )
}