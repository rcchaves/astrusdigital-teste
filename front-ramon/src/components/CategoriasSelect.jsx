
export default function CategoriaSelect({categoriaSelect}) {
  const {id, nome} = categoriaSelect
   
  return (
    <>
     <option value={id}>{nome}</option>;
    </>
  )
}
