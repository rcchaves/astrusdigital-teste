<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProdutoCollection;
use App\Models\Produto;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class ProdutoController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Escolhi neste metodo usar collectios pois com elas dicifimos como queremos entregar os dados ao cliente
        return new ProdutoCollection(Produto::orderBy('id', 'DESC')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'nome' => 'required',
            'preco' => 'required|numeric',
            'imagen' => 'required|image', 
            'categoria_id' => 'required|exists:categorias,id'
        ]);
        
        if ($request->hasFile('imagen')) {
            $imagem = $request->file('imagen');
            if ($imagem->isValid()) {
                $imagemNome = time() . '_' . $imagem->getClientOriginalName();
                Storage::disk('public')->put($imagemNome, file_get_contents($request->file('imagen')));

                               
                $produto = Produto::create([
                    'nome' => $request->input('nome'),
                    'preco' => $request->input('preco'),
                    'imagen' => $imagemNome,
                    'categoria_id' => $request->input('categoria_id')
                ]);
        
                return response()->json([
                    'message' => 'Produto criado com sucesso',
                    'data' => $produto
                ], 201);
            } else {
                // A imagem não é válida
                return response()->json([
                    'message' => 'O arquivo de imagem é inválido',
                ], 400);
            }
        } else {
            // A imagem não foi enviada
            return response()->json([
                'message' => 'O arquivo de imagem não foi enviado',
            ], 400);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Produto  $produto
     * @return \Illuminate\Http\Response
     */
            public function show($id)
        {
            $produto = Produto::find($id);

            if (!$produto) {
                return response()->json([
                    'message' => 'Produto não encontrado',
                ], 404);
            }

            return response()->json([
                'message' => 'Produto encontrado',
                'data' => $produto
            ], 200);
        }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Produto  $produto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {     
        $produto = Produto::findOrFail($id);
        
        $source = $request->input('source');

        if ($source === 'button') {
            
            $produto->disponivel = $produto->disponivel === 1 ? 0 : 1;
        } else {
            
            $produto->nome = $request->input('nome');
            $produto->preco = $request->input('preco');
            $produto->categoria_id = $request->input('categoria_id');
            $produto->disponivel = $request->input('disponivel');
           
            if ($request->hasFile('imagen')) {
                $imagem = $request->file('imagen');
                if ($imagem->isValid()) {
                    $imagemNome = time() . '_' . $imagem->getClientOriginalName();
                    Storage::disk('public')->put($imagemNome, file_get_contents($request->file('imagen')));

                    if ($produto->imagen) {
                        Storage::disk('public')->delete($produto->imagen);
                    }

                    $produto->imagen = $imagemNome;
                } else {
                    
                    return response()->json([
                        'message' => 'O arquivo de imagem é inválido',
                    ], 400);
                }
            }
        }
        $produto->save();

        return response()->json([
            'message' => 'Produto atualizado com sucesso',
            'data' => $produto
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Produto  $produto
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $produto = Produto::find($id);

        if (!$produto) {
            return response()->json([
                'message' => 'Produto não encontrado',
            ], 404);
        }

        $pedidos = $produto->pedidos;

        if ($pedidos->count() > 0) {
            return response()->json([
                'message' => 'O produto está vinculado a um ou mais pedidos e não pode ser excluído',
            ], 400);
        }

        $produto->delete();

        return response()->json([
            'message' => 'Produto excluído com sucesso',
        ], 200);
    }
    
}
