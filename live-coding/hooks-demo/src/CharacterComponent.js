export default function CharacterComponent({data}) {

  return (
    <article>
      <h3>{data.name}</h3>
      <p>Height: {data.height}cm</p>
      <p>Weight: {data.mass}kg</p>
    </article>
  )
}